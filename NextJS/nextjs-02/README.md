# TaskFlow — Modern Task Management

TaskFlow is a production-grade full-stack task management application designed for speed, visual clarity, and responsiveness. The application provides clean, decoupled page routing alongside dynamic analytics, dynamic task details, and server action synchronization.

---

## Tech Stack Used

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Core Library**: React 19 (Server & Client Components)
- **Database Connection**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL database adapter
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables theme configurations
- **Runtime / Package Manager**: [Bun](https://bun.sh/) (compatible with Node / npm)

---

## Features Implemented

- **Task Lifecycle**: Create, update status, inline edit task names, and delete items.
- **Analytics Dashboard**: Dynamic metrics showing total tasks, completion progress, pending tasks, efficiency ratings, and a weekly activity bar chart.
- **Dedicated Task Details**: Individual detail page for each task displaying creation/update timestamps and allow deep edits.
- **Global Glassmorphic Layout**: Responsive dark-mode compatible Navigation Header and Footer.

---

## How to Run Locally

### 1. Clone & Install Dependencies
Ensure you have Node.js or Bun installed, then run:
```bash
bun install
# or
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory. You can copy the template:
```bash
cp .env.example .env
```
Provide your PostgreSQL connection string in the `.env` file:
```env
DATABASE_URL="postgresql://username:password@hostname:port/dbname?sslmode=require"
```

### 3. Database Sync & Prisma Client Generation
Sync your database schema and build the Prisma client bindings:
```bash
npx prisma db push
npx prisma generate
```

### 4. Run Development Server
```bash
bun run dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Environment Variables Required

| Key | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection URL | `postgresql://user:pass@host:5432/db?sslmode=require` |

---

## Routes & Pages Included

- **Home (`/`)**: [SSG] Modern marketing landing page detailing TaskFlow’s features and tech stack.
- **Tasks Dashboard (`/todos`)**: [SSR] Interactive dashboard workspace showing todos list, filters, and add task inputs.
- **Task Details (`/todos/[id]`)**: [SSR] Dynamic path rendering details and edit form for specific todo items.
- **Analytics Dashboard (`/dashboard`)**: [SSR] Visual reports showing weekly task timeline charts and backlog metrics.
- **About (`/about`)**: [ISR] Summary page showcasing tech stack with colorful SVG icon elements.

---

## API Routes Included

Structured HTTP endpoints are defined inside `app/api/` returning structured JSON payloads and error handling (HTTP 200, 201, 400, 404, 500):

- **`GET /api/todos`**: Fetches all todos.
- **`POST /api/todos`**: Adds a new todo (expects `{ "title": "name" }`).
- **`DELETE /api/todos`**: Deletes a todo (expects `{ "id": "uuid" }`).
- **`GET /api/todos/[id]`**: Fetches a single todo.
- **`PATCH /api/todos/[id]`**: Updates a todo (expects `{ "title": "...", "completed": true }`).
- **`DELETE /api/todos/[id]`**: Deletes a specific todo.

---

## Server Actions Used

TaskFlow uses Next.js Server Actions with the `"use server"` directive to perform server operations:
- **`createTodo(title: string)`**: Creates a database record.
- **`updateTodo(id: string, title: string, completed: boolean)`**: Updates the database record.
- **`deleteTodo(id: string)`**: Deletes the database record.
- **`handleUpdateAction(formData: FormData)`**: Server Form Action handler within the Task Details Page to process edits and redirect back on submit.

---

## Rendering Strategies Used

### 1. Static Site Generation (SSG)
The landing page (`/`) does not load server data and compiles to pure static HTML/JS at build time for speed.

### 2. Server Side Rendering (SSR)
Tasks (`/todos`), Task Details (`/todos/[id]`), and Dashboard (`/dashboard`) require fresh database queries. They use `export const dynamic = "force-dynamic"` to guarantee real-time synchronization on every page visit.

### 3. Incremental Static Regeneration (ISR)
The About page (`/about`) is static content that revalidates in the background:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

---

## API Routes vs. Server Actions in TaskFlow

- **API Routes**: Perfect for external clients, third-party integrations, or mobile apps needing structured REST communications.
- **Server Actions**: Perfect for our React component interactions, inline state changes, and form submissions. It allows direct backend database calls from browser interactions without boilerplate fetch setup.

---

## Assumptions & Limitations

- **Authentication**: Currently omitted. All tasks are shared globally.
- **Database**: Assumes connection to a PostgreSQL database (or compatible DB with Prisma).
