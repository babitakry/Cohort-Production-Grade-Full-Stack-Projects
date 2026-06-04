"use server";

import { Todo } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/db";


export async function createTodo(title: string): Promise<Todo> {
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
            },
        });
        return todo;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to create todo");
    }
}
// for query or get Don't use "Server Actions", Use custom hook or route
// export async function getAllTodos(): Promise<Todo[]> {
//     try {
//         const todos = await prisma.todo.findMany();
//         return todos;
//     }
//     catch (error) {
//         console.log(error);
//         throw new Error("Failed to fetch todos");
//     }
// }

export async function getTodoById(id: string): Promise<Todo | null> {
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id,
            },
        });
        return todo;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to fetch todo");
    }
}

export async function updateTodo(id: string, completed: boolean): Promise<Todo> {
    try {
        const updatedTodo = await prisma.todo.update({
            where: {
                id,
            },
            data: {
                completed,
            },
        });
        return updatedTodo;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to update todo");
    }

}

export async function deleteTodo(id: string): Promise<Todo> {
    try {
        const deletedTodo = await prisma.todo.delete({
            where: {
                id,
            },
        });
        return deletedTodo;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to delete todo");
    }
}