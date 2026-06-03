import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Todo from "@/lib/schema/todos";

type RouteContext = { params: Promise<{id: string}> };

export async function GET(_request: NextRequest, ctx: RouteContext) {
    await connectDB();
    try{
        const { id } = await ctx.params;
        const todo = await Todo.findById(id);

        if(!todo){
            return NextResponse.json(
                {success: false, error: "Todo not found"},
                {status: 404}
            )
        }
        return NextResponse.json(
            { success: true, data: todo },
            { status: 200 }
        )
    }
    catch(error){
        console.log("Get todo error: ", error);
        return NextResponse.json(
            {success: false, error: "Failed to fetch todo"},
            {status: 500}
        )
    }
}

export async function PATCH(request: NextRequest, ctx: RouteContext){
    await connectDB();
    try{
        const { id } = await ctx.params;
        const body = await request.json();
        const { title, completed } = body;

        const todo = await Todo.findByIdAndUpdate(id, {
            ...(typeof title === "string" ? {title} : {}),
            ...(typeof completed === "boolean" ? {completed} : {})
        });

        return NextResponse.json({success: true, data: todo}, {status: 200});
    }
    catch(error){
        console.log("Update todo error: ", error);
        return NextResponse.json(
            {success: false, error: "Failed to update todo"},
            {status: 500}
        )
    }
}

export async function DELETE(_request: NextRequest, ctx: RouteContext){
    await connectDB();
    try{
        const { id } = await ctx.params;
        const todo = await Todo.findByIdAndDelete(id);

        return NextResponse.json(
            {success: true, message: "Todo deleted successfully"},
            {status: 200}
        )
    }
    catch(error){
        console.log("Delete todo error: ", error);
        return NextResponse.json(
            {success: false, error: "Failed to delete todo"},
            {status: 500}
        )
    }
}
