use axum::{response::IntoResponse, Extension, Json};
use serde::Serialize;
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use crate::AppState;

#[derive(Clone, Serialize, ToSchema)]
pub struct Website {
    pub name: String,
    pub description: String,
}

pub fn router() -> OpenApiRouter {
    OpenApiRouter::new().routes(routes!(websites_index))
}

#[utoipa::path(
    get,
    path = "/",
    responses(
        (status = 200, body = Vec<Website>),
    )
)]
pub async fn websites_index(Extension(state): Extension<AppState>) -> impl IntoResponse {
    Json(state.websites)
}
