use axum::routing::get;
use lores_p2panda_client::PandaClient;
use std::collections::HashMap;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::{broadcast, Mutex};
use utoipa::OpenApi;
use utoipa_axum::router::OpenApiRouter;
use utoipa_swagger_ui::SwaggerUi;

use crate::static_server::frontend_handler;

mod public_api;
mod realtime;
mod static_server;

const PANDA_GRPC_ADDR_DEFAULT: &str = "http://127.0.0.1:50051";
const APP_NAMESPACE: &str = "static-sites:v1";

#[derive(Clone)]
pub struct AppState {
    pub panda: Arc<Mutex<PandaClient>>,
    pub channels: Arc<Mutex<HashMap<[u8; 32], broadcast::Sender<Vec<u8>>>>>,
    pub app_namespace: String,
}

#[tokio::main]
async fn main() {
    #[derive(OpenApi)]
    #[openapi()]
    struct ApiDoc;

    let panda_grpc_addr =
        std::env::var("PANDA_GRPC_ADDR").unwrap_or_else(|_| PANDA_GRPC_ADDR_DEFAULT.to_string());

    let panda = PandaClient::connect_lazy(panda_grpc_addr)
        .expect("failed to connect to panda gRPC endpoint");
    let panda = Arc::new(Mutex::new(panda));

    let state = AppState {
        panda,
        channels: Arc::new(Mutex::new(HashMap::new())),
        app_namespace: APP_NAMESPACE.to_string(),
    };

    let (api_router, api) = OpenApiRouter::with_openapi(ApiDoc::openapi())
        .nest("/api", public_api::router())
        .split_for_parts();

    // Write openapi.json to disk
    let openapi_json = api
        .to_pretty_json()
        .expect("failed to serialize OpenAPI spec");
    std::fs::write("openapi.json", &openapi_json).expect("failed to write openapi.json");

    let app = api_router
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", api.clone()))
        .route("/ws/{region_id}", get(realtime::handler))
        .fallback_service(get(frontend_handler))
        .layer(axum::Extension(state));

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("backend listening on http://{addr}");

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind backend listener");

    axum::serve(listener, app)
        .await
        .expect("backend server error");
}
