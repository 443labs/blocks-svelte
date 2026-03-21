# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blocks is a Tetris clone built with Svelte 5, TypeScript, Vite 8, and Tailwind CSS 4. It runs entirely client-side with no backend or external dependencies. Uses pnpm as the package manager.

## Commands

```bash
pnpm dev      # Start Vite dev server with HMR
pnpm build    # Production build to /dist
pnpm preview  # Preview production build
pnpm start    # Build + preview combined
pnpm check    # Type checking via svelte-check and tsc
```

There are no test or lint commands configured.

## Architecture

### Game Logic (Reducer Pattern)

The game uses a pure functional reducer pattern with unidirectional data flow:

- **`src/game/types.ts`** — `GameState` interface, `GameAction` enum, `Direction` enum
- **`src/game/gameLogic.ts`** — `gameReducer()` pure function that takes state + action, returns new state. All game mechanics (movement, rotation, collision, line clearing, scoring) live here.
- **`src/game/tetrominoes.ts`** — Piece shapes (4×4 matrices), colors, and validation helpers

### Component Hierarchy

```
App.svelte
└── Game.svelte          — Main controller: owns game state, runs game loop (setInterval),
    │                      handles keyboard input, manages audio, dispatches to gameReducer()
    ├── GameBoard.svelte  — Renders 10×20 CSS Grid, ghost piece, drop guides, pause/gameover overlays
    ├── NextPiece.svelte  — Preview of upcoming tetromino
    ├── ScoreBoard.svelte — Score, level, lines, high score display
    └── Controls.svelte   — Keyboard controls reference
```

`Game.svelte` is the central orchestrator (~460 lines). It holds a single reactive `gameState` variable updated via `gameReducer()`. The game loop calls `gameTick()` on an interval that varies by level (50–800ms).

### Key Patterns

- **Cell values:** 0 = empty, 1–7 = tetromino types (I, J, L, O, S, T, Z)
- **Collision detection:** `isValidPosition()` checks grid bounds and cell occupancy
- **Wall kicks:** Rotation tries 9 offset positions before failing
- **Persistence:** High score and sound preferences stored in localStorage
- **Audio:** 6 sound effects + looping background music, managed in Game.svelte

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy-gh-pages.yml`. The Vite base path is set to `/blocks-svelte/` in `vite.config.ts`.
