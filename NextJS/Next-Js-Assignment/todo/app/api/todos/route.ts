import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Todo from "@/lib/schema/todos";

export async function GET() {
    await connectDB();
    try {
        const todos = await Todo.find();

        return NextResponse.json(
            { success: true, data: todos },
            { status: 200 }
        )
    }
    catch (error) {
        console.log("Find Todos error: ", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch todos" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { title } = await request.json();

        if (!title) {
            return NextResponse.json(
                { success: false, error: "Title is required" },
                { status: 400 }
            )
        }

        const newTodo = await Todo.create({title})

        console.log("New Todo Created: ", newTodo);
        return NextResponse.json(
            { success: true, data: newTodo },
            { status: 201 }
        )
    }
    catch (error) {
        console.log("Create Todo error: ", error);
        return NextResponse.json(
            { success: false, error: "Failed to create todo" },
            { status: 500 }
        )
    }
}