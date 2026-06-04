"use client";

import React, { useState } from "react";
import AddTodoForm from "./add-todo-form";
import TodoList, { Todo } from "./todo-list";

// OPTION A: Server Actions
import { updateTodo, deleteTodo } from "@/actions/todos";

// OPTION B: Client-side API Fetch helpers
import { fetchUpdateTodo, fetchDeleteTodo } from "@/lib/todo-fetch";

interface TodoAppProps {
  initialTodos: Todo[];
}

export default function TodoApp({ initialTodos }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [actionId, setActionId] = useState<string | null>(null);

  const handleToggleTodo = async (id: string, currentCompleted: boolean) => {
    setActionId(id);
    try {
      // --- CHOOSE ONE OPTION ---

      // [A] Server Actions Method
      // (Note: we serialize Date fields returned by Prisma to match Client Todo interfaces)
      const updated = await updateTodo(id, !currentCompleted);
      const updatedTodo = updated ? {
        ...updated,
        createdAt: typeof updated.createdAt === 'string' ? updated.createdAt : updated.createdAt.toISOString(),
        updatedAt: typeof updated.updatedAt === 'string' ? updated.updatedAt : updated.updatedAt.toISOString(),
      } : null;

      // [B] REST API Fetch Method (Uncomment to use instead of Server Actions)
      // const updatedTodo = await fetchUpdateTodo(id, !currentCompleted);

      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? updatedTodo : t))
        );
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setActionId(null);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setActionId(id);
    try {
      // --- CHOOSE ONE OPTION ---

      // [A] Server Actions Method
      await deleteTodo(id);

      // [B] REST API Fetch Method (Uncomment to use instead of Server Actions)
      // await fetchDeleteTodo(id);

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setActionId(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (filter === "active") return matchesSearch && !todo.completed;
    if (filter === "completed") return matchesSearch && todo.completed;
    return matchesSearch;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const percentage = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/[0.03] border border-black/5 dark:border-white/5 p-6 md:p-8 transition-all duration-300">
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
              Task Dashboard
            </h1>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
              Manage your daily workflow effectively
            </p>
          </div>
          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/40 px-4 py-2 rounded-2xl border border-zinc-150 dark:border-zinc-800">
            <div className="text-right">
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium uppercase tracking-wider">Progress</p>
              <p className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                {completedCount} of {todos.length} completed
              </p>
            </div>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/10 dark:bg-zinc-100/10 text-zinc-900 dark:text-zinc-100">
              <span className="text-xs font-black">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-950 dark:bg-zinc-50 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <AddTodoForm onTodoAdded={(newTodo) => setTodos((prev) => [newTodo, ...prev])} />

      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pb-5 mb-5 border-b border-zinc-100 dark:border-zinc-800/60">
        
        <div className="flex gap-1.5 p-1 bg-zinc-100/80 dark:bg-zinc-800/50 rounded-xl w-full sm:w-auto">
          {(["all", "active", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                filter === t
                  ? "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black shadow-sm"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-950 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-300 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-50 transition-all"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <TodoList
        todos={filteredTodos}
        actionId={actionId}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        searchQuery={searchQuery}
      />
    </div>
  );
}
