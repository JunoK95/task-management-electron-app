# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Electron + Vite HMR)
npm run build:mac    # Build for macOS (skips typecheck)
npm run build        # Build with typecheck (Windows/Linux target)
npm run lint         # ESLint
npm run typecheck    # Type-check both node and web tsconfigs
npm test             # Run all Jest tests
npm test -- --testPathPattern=AuthCard  # Run a single test file
```

## Architecture

This is an **Electron + React + TypeScript** app using `electron-vite`. The process split:

- `src/main/` — Electron main process (window creation, IPC, system tray, keyboard shortcuts)
- `src/preload/` — Preload script (bridges main ↔ renderer via `contextBridge`)
- `src/renderer/src/` — React SPA (all UI code)

### Renderer layer structure

```
api/           Raw Supabase calls, organized by entity (tasks, projects, workspaces, tags, profiles, workspace_members)
queries/       TanStack Query hooks wrapping api/ — one hook per operation (useTasks, useUpdateTask, etc.)
pages/         Route-level components (Tasks, Projects, Workspace, Auth, Settings, Tags)
components/    Shared UI components, each in its own folder with a .module.scss
layouts/       AppLayout (sidebar + outlet), WorkspaceLayout, SettingsLayout
context/       React contexts: auth, theme, modal
hooks/         Thin wrappers for context access (useAuth, useTheme, useModal)
routes/        HashRouter config, PublicRoute / PrivateRoute guards, ROUTES constants
types/         Type system (see below)
services/supabase/  Supabase client init + auth helpers
lib/react-query/    Shared optimistic update utility
styles/        Global SCSS: variables.scss (CSS custom properties + SCSS vars), theme.scss, typography.scss
```

### Type system layering

1. `types/supabase.ts` — auto-generated Supabase schema types
2. `types/db.ts` — shorthand row/insert/update aliases (e.g. `TaskRow`, `TaskInsert`). **Do not use raw DB types in forms.**
3. `types/domain/` — UI-facing types with narrowed enums and normalized nullables (e.g. `Task` extends `TaskRow` with `priority: TaskPriority` instead of `string`)
4. `types/inputs/` — form input types (used with react-hook-form + zod schemas)
5. `types/enums/` — string literal union enums for task status, priority, etc.

### Data flow

`api/` (raw Supabase) → `queries/` (React Query hooks) → pages/components

### React Query conventions

- Single entity key: `['task', taskId]`
- List key: `['tasks', workspaceId, ...filters]`
- `optimisticPatchAutoLists` in `lib/react-query/` handles optimistic updates across both entity and all matching list caches simultaneously, with automatic rollback on error.

### Routing

Uses `HashRouter`. All authenticated routes are scoped under `/workspaces/:workspaceId/`. `AuthGate` redirects to the user's first workspace on login.

### Styling

Components use **SCSS modules** (`.module.scss` co-located with each component). Global CSS custom properties are defined in `styles/variables.scss` — use these (`--text`, `--surface`, `--border`, etc.) rather than hardcoded colors. Dark mode is applied via a `.dark` class on the root element.

### Path alias

`@/` resolves to `src/renderer/src/` — use it for all renderer imports.

## Testing

Tests use Jest + jsdom + `@testing-library/react`. Test files live alongside source files (e.g. `AuthCard.test.tsx` next to `AuthCard.tsx`). SCSS modules are mocked via `identity-obj-proxy`. The Supabase client is mocked at `src/renderer/src/__mocks__/client.ts`.
