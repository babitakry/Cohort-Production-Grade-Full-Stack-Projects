import React, { useState } from "react";
import Link from "next/link";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface TodoListProps {
  todos: Todo[];
  actionId: string | null;
  onUpdate: (id: string, title: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  searchQuery: string;
}

export default function TodoList({
  todos,
  actionId,
  onUpdate,
  onDelete,
  searchQuery,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleStartEdit = (todo: Todo, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSave = async (id: string, completed: boolean) => {
    if (editTitle.trim() === "") return;
    setEditingId(null);
    await onUpdate(id, editTitle, completed);
  };

  const handleCancelEdit = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
      {todos.length > 0 ? (
        todos.map((todo) => {
          const isLoading = actionId === todo.id;
          const isEditing = editingId === todo.id;

          return (
            <div
              key={todo.id}
              onClick={() => !isLoading && !isEditing && onUpdate(todo.id, todo.title, !todo.completed)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group cursor-pointer select-none ${
                todo.completed
                  ? "bg-zinc-50/60 dark:bg-black/20 border-zinc-100 dark:border-zinc-950/40 opacity-75"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/80 hover:border-black dark:hover:border-white shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    todo.completed
                      ? "bg-zinc-950 border-zinc-950 text-white dark:bg-zinc-50 dark:border-zinc-50 dark:text-black"
                      : "border-zinc-300 dark:border-zinc-600 group-hover:border-black dark:group-hover:border-white"
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave(todo.id, todo.completed);
                      if (e.key === "Escape") handleCancelEdit(e);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-950 dark:text-zinc-50 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`text-sm font-medium transition-all duration-200 truncate ${
                      todo.completed
                        ? "line-through text-zinc-500 dark:text-zinc-400"
                        : "text-zinc-950 dark:text-zinc-50"
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pl-4">
                {isLoading && (
                  <svg className="animate-spin h-4 w-4 text-zinc-950 dark:text-zinc-50" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}

                {!isEditing && (
                  <Link
                    href={`/todos/${todo.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="View details"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                )}

                {isEditing ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(todo.id, todo.completed);
                    }}
                    className="p-2 text-zinc-950 hover:text-black dark:text-zinc-50 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-bold"
                    title="Save edit"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleStartEdit(todo, e)}
                    disabled={isLoading}
                    className="p-2 text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Edit task"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLoading) onDelete(todo.id);
                  }}
                  disabled={isLoading}
                  className="p-2 text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete task"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <svg
            className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
            No tasks found
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            {searchQuery ? "Try refining your search query" : "Create a task above to get started!"}
          </p>
        </div>
      )}
    </div>
  );
}
