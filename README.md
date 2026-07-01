# Lores Static Sites

## Running this example

Developers can drive this using the justfile. Install [Just](https://github.com/casey/just) and then execute the following:

To fetch needed dependencies:

```bash
just setup
```

To run:

```bash
just dev
```

Swagger UI is available at **http://localhost:5173/swagger-ui** when the backend is running.

To generate the frontend API client (requires the backend to be running on port 3000):

```bash
just gen-api
```

This will output generated TypeScript files to `frontend/src/api/`.

## Style guide

- Prefer Web Awesome's layout utility classes (`wa-stack`, `wa-cluster`, `wa-grid`, `wa-split`, `wa-gap-*`, etc.) over hand-written flexbox/grid or inline styles.
