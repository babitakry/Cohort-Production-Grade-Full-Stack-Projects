import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateTodo } from "@/actions/todos";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TodoDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let todo = null;
  try {
    todo = await prisma.todo.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching todo detail:", error);
  }

  if (!todo) {
    notFound();
  }

  // Server action handler inside the Server Component (standard NextJS Form Action)
  async function handleUpdateAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const completed = formData.get("completed") === "true";
    if (title && title.trim() !== "") {
      await updateTodo(id, title, completed);
      redirect("/");
    }
  }

  return (
    <main className="flex-1 min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-black/5 dark:border-white/5 p-8 rounded-3xl shadow-lg flex flex-col gap-6">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-zinc-950 dark:text-zinc-50">
            Task Details
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            View or edit details for task: <span className="font-mono text-zinc-700 dark:text-zinc-300">{todo.id}</span>
          </p>
        </div>

        <form action={handleUpdateAction} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={todo.title}
              required
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              Status
            </label>
            <select
              name="completed"
              defaultValue={todo.completed ? "true" : "false"}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-all"
            >
              <option value="false">Active (Pending)</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/80">
            <div>
              <p className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Created At</p>
              <p>{new Date(todo.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">Last Updated At</p>
              <p>{new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-2xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black rounded-2xl text-xs font-extrabold hover:bg-zinc-900 dark:hover:bg-zinc-100 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
