import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, ctx: RouteContext) {
    try {
        const { id } = await ctx.params;
        if (!id) {
            return NextResponse.json(
                { success: false, error: "ID is required" },
                { status: 400 }
            );
        }
        const todo = await prisma.todo.findUnique({
            where: { id: id }
        });
        if (!todo) {
            return NextResponse.json(
                { success: false, error: "Todo not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, data: todo },
            { status: 200 }
        );
    }
    catch (error) {
        console.log("Error fetching todo:", error);
        return NextResponse.json(
            { error: "Failed to fetch todo" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest, ctx: RouteContext) {
    try {
        const { id } = await ctx.params;

        if (!id) {
            return NextResponse.json(
                { success: false, error: "ID is required" },
                { status: 400 }
            );
        }

        const { title, completed } = await request.json();

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                completed: completed,
            },
        });

        return NextResponse.json(
            {
                success: true,
                data: updatedTodo,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error updating todo:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to update todo",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
    try {
        const { id } = await ctx.params;
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