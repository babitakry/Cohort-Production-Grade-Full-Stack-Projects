import { prisma } from "@/lib/db";
import TodoApp from "./components/todos/todo-app";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialTodos: any[] = [];
  try {
    initialTodos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching initial todos on server:", error);
  }

  // Convert Date objects to ISO strings to avoid Next.js serialization warnings for server component props
  const serializedTodos = initialTodos.map((todo) => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  }));

  return (
    <main className="flex-1 min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full">
        <TodoApp initialTodos={serializedTodos} />
      </div>
    </main>
  );
}
