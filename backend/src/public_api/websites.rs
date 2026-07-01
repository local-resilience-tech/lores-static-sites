use axum::{response::IntoResponse, Json};
use serde::Serialize;
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

#[derive(Serialize, ToSchema)]
pub struct Site {
    pub name: String,
    pub description: String,
}

pub fn router() -> OpenApiRouter {
    OpenApiRouter::new().routes(routes!(sites_index))
}

#[utoipa::path(
    get,
    path = "/",
    responses(
        (status = 200, body = Vec<Site>),
    )
)]
pub async fn sites_index() -> impl IntoResponse {
    let sites = vec![
        Site {
            name: "Example Site".to_string(),
            description: "A static site hosted on Lores.".to_string(),
        },
        Site {
            name: "My Blog".to_string(),
            description: "Personal blog built with a static generator.".to_string(),
        },
        Site {
            name: "Portfolio".to_string(),
            description: "Design and development portfolio.".to_string(),
        },
    ];

    Json(sites)
}
