# Timebox Personal Planner

A high-performance, minimalist personal time-boxing application inspired by timebox.so. Built for local-first use with all data stored securely in the browser's IndexedDB.

## Project Overview

- **Core Purpose**: A deep work and hourly planning tool featuring a 3-column layout: Tasks, Calendar (FullCalendar), and Daily Notes.
- **Main Technologies**:
  - **Framework**: React 18 with Vite and TypeScript.
  - **Database**: [Dexie.js](https://dexie.org/) (IndexedDB) for scalable, asynchronous local storage.
  - **Calendar**: FullCalendar with TimeGrid view for professional scheduling.
  - **Drag & Drop**: `@dnd-kit/core` for sidebar-to-calendar scheduling and `@fullcalendar/interaction` for internal grid management.
  - **Styling**: Vanilla CSS with a focus on dark mode and JetBrains Mono typography.
  - **Icons**: Lucide React.
  - **Color Management**: `react-color` (ChromePicker) with `@floating-ui/react` for popover positioning.

## Architecture

- **State Management**: Handled via a custom hook `src/hooks/useStore.ts` which leverages `useLiveQuery` from `dexie-react-hooks` for reactive updates from the database.
- **Data Layer**: Defined in `src/db/db.ts`. Tables include `tasks`, `timeBlocks`, and `notes`.
- **Component Structure**:
  - `src/components/sidebar/`: Manages "Today" and "Later" task lists, including color selection and backup/restore.
  - `src/components/schedule/`: The central FullCalendar implementation with auto-scrolling and smoothed "now" indicator centering.
  - `src/components/notes/`: A persistent daily scratchpad with optimized state for native undo/redo.
  - `src/components/heatmap/`: Visual activity history, located at the bottom of the Notes column.
- **Type Definitions**: All shared interfaces are centralized in `src/types/index.ts`.

## Key Features & UI Logic

- **Layout**: Strict `100vh` 3-column split (30/40/30 ratio). Sidebar and Notes share the same background (`var(--bg-secondary)`).
- **Task Sorting**: 
  - Active tasks are sorted by creation date (newest at bottom of active section).
  - Completed tasks are automatically moved to the bottom of the list.
- **Visuals**:
  - All main column titles (TIMEBOX, DATE, DAILY NOTES) are capitalized and set to `1rem`.
  - Completed tasks show a **green checkmark** regardless of task color.
  - Calendar items for completed tasks use grey text without strikethrough.
- **Interactions**:
  - **Tooltip**: Hovering on the 6-dots grab icon for 1 second reveals the full task text.
  - **Color Picker**: Disables text selection globally while open to ensure smooth dragging.
  - **Daily Notes**: Syncs to DB `onBlur` to preserve native browser undo/redo history.

## Building and Running

### Development
```bash
npm run dev
```
Starts the Vite development server.

### Production Build
```bash
npm run build
```
Compiles the application into the `dist/` directory.

### Portability
The app includes a built-in backup system in the Sidebar header:
- **Export**: Generates a JSON dump of the entire database.
- **Import**: Restores data from a previously exported JSON file (overwrites current data).

## Development Conventions

- **Scalability**: Always use Dexie.js transactions for operations that touch multiple tables.
- **Styling**: Maintain CSS classes in `src/index.css`; keep JSX clean of inline styles.
- **Time Formatting**: Use `h:mm a` (e.g., `9:00 am`) globally.
- **Components**: Modular structure with feature-specific sub-directories.
