import { Todo } from "@/app/components/todos/todo-list";

/**
 * Client-Side API Helper Functions (Standard REST Fetch requests)
 * These make network calls to the `/api/todos` Next.js Route Handlers.
 */

// 1. Create Todo Task via API POST
export async function fetchCreateTodo(title: string): Promise<Todo> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to create todo");
  }
  return data.data;
}

// 2. Toggle completion/update task via API PATCH
export async function fetchUpdateTodo(id: string, completed: boolean): Promise<Todo> {
  const res = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to update todo");
  }
  return data.data;
}

// 3. Delete task via API DELETE
export async function fetchDeleteTodo(id: string): Promise<void> {
  const res = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete todo");
  }
}
