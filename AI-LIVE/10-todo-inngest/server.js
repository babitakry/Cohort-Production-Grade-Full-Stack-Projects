import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { todos, createTodo } from "./store.js";
import { serve } from "./inngest/server.js";
import { inngest } from "./inngest/client.js";
import { onTodoCreated } from "./inngest/functions.js";

const app = express();
app.use(express.json());

app.use(
    "/api/inngest",
    serve(
        {
            client: inngest,
            functions: [onTodoCreated],
        }
    )
)

app.post("/todos", (req, res) => {
    const { title } = req.body;

    if (!title)
        return res.status(400).json({ error: "Title is required" });

    const todo = createTodo(title);
    res.status(201).json(todo);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});