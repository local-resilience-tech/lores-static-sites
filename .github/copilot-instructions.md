# Copilot Instructions

## Frontend UI

This project uses [Web Awesome](https://webawesome.com) (React 19, native custom elements — no wrappers needed).

### Component usage

Use `<wa-*>` custom elements directly in JSX. Import each component's JS individually for tree-shaking:

```tsx
import "@awesome.me/webawesome/dist/components/button/button.js";
// <wa-button variant="brand">Click me</wa-button>
```

The stylesheet is imported globally in `main.tsx`. Do not add it per-component.

### Agent Skills

Refer to the Web Awesome agent skills for component APIs and design guidance:

- Component reference: `@node_modules/@awesome.me/webawesome/dist/skills/webawesome/SKILL.md`
- Design guidance: `@node_modules/@awesome.me/webawesome/dist/skills/webawesome-design/SKILL.md`
