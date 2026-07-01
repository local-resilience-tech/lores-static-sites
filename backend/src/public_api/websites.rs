use axum::{http::StatusCode, response::IntoResponse, Extension, Json};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use crate::AppState;

#[derive(Clone, Serialize, ToSchema)]
pub struct Website {
    pub name: String,
    pub description: String,
}

#[derive(Deserialize, ToSchema)]
pub struct CreateWebsiteData {
    pub name: String,
    pub description: String,
}

pub fn router() -> OpenApiRouter {
    OpenApiRouter::new()
        .routes(routes!(websites_index))
        .routes(routes!(create_website))
}

#[utoipa::path(
    get,
    path = "/",
    responses(
        (status = 200, body = Vec<Website>),
    )
)]
pub async fn websites_index(Extension(state): Extension<AppState>) -> impl IntoResponse {
    let websites = state.websites.lock().await;
    Json(websites.clone())
}

#[utoipa::path(
    post,
    path = "/",
    request_body = CreateWebsiteData,
    responses(
        (status = 201, body = Website),
    )
)]
pub async fn create_website(
    Extension(state): Extension<AppState>,
    Json(payload): Json<CreateWebsiteData>,
) -> impl IntoResponse {
    let website = Website {
        name: payload.name,
        description: payload.description,
    };
    state.websites.lock().await.push(website.clone());
    (StatusCode::CREATED, Json(website))
}
