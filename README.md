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

Swagger UI is available at **http://localhost:3000/swagger-ui** when the backend is running.

## Style guide

- Prefer Web Awesome's layout utility classes (`wa-stack`, `wa-cluster`, `wa-grid`, `wa-split`, `wa-gap-*`, etc.) over hand-written flexbox/grid or inline styles.
