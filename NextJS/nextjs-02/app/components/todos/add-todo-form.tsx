"use client";

import React, { useState } from "react";

// 1. Defining the properties (props) that this component accepts.
// Here, we take an 'onAddTodo' callback function from the parent component.
interface AddTodoFormProps {
  onAddTodo: (title: string) => Promise<void>;
}

export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddTodo(title.trim());
      setTitle("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2.5 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
        className="flex-1 px-4 py-3.5 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-950 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 dark:focus:ring-zinc-50/10 dark:focus:border-zinc-50 transition-all text-sm"
        disabled={isSubmitting}
      />
      
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="px-6 py-3.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 disabled:opacity-50 font-semibold rounded-2xl transition-all duration-200 shadow-md shadow-black/10 text-sm flex items-center justify-center min-w-[90px]"
      >
        {isSubmitting ? (
          <svg className="animate-spin h-5 w-5 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          "Add Task"
        )}
      </button>
    </form>
  );
}
