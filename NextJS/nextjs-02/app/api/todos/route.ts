import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const todos = await prisma.todo.findMany();
        return NextResponse.json(
            { success: true, data: todos },
            { status: 200 }
        );
    }
    catch (error) {
        console.log("Error fetching todos:", error);
        return NextResponse.json(
            { error: "Failed to fetch todos" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title } = await request.json();
        if (!title) {
            return NextResponse.json(
                { success: false, error: "Title is required" },
                { status: 400 }
            );
        }
        const newTodo = await prisma.todo.create({
            data: {
                title: title }
        });
        return NextResponse.json(
            { success: true, data: newTodo },
            { status: 201 }
        );
    }
    catch (error) {
        console.log("Error creating todo:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create todo" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { success: false, error: "ID is required" },
                { status: 400 }
            );
        }
        await prisma.todo.delete({
            where: { id: id }
        });
        return NextResponse.json(
            { success: true, message: "Todo deleted successfully" },
            { status: 200 }
        );
    }
    catch (error) {
        console.log("Error deleting todo:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete todo" },
            { status: 500 }
        );
    }
}