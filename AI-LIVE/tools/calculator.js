export async function calculator({op, a, b}){
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw new Error("Both a and b should be numbers");
    }
    switch(op){
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if(b === 0){
                throw new Error("Cannot divide by zero");
            }
            return a / b;
        default:
            return "Unsupported operation. Use add, subtract, multiply or divide.";
    }
}


// metadata for the tool
export const calculateTool = {
    type: "function",
    function: {
        name: "calculator",
        description: "A simple calculator function that can perform basic arithmetic operations like addition, subtraction, multiplication, and division. It takes an object with three properties: 'op' (the operation to perform), 'a' (the first number), and 'b' (the second number). The 'op' property can be one of the following strings: 'add', 'subtract', 'multiply', or 'divide'. The function returns the result of the specified operation on the two numbers.",
        parameters: {
            type: "object",
            properties: {
                op: {
                    type: "string",
                    enum: ["add", "subtract", "multiply", "divide"],
                    description: "The operation to perform."
                },
                a: {
                    type: "number",
                    description: "The first number."
                },
                b: {
                    type: "number",
                    description: "The second number."
                }
            },
            required: ["op", "a", "b"]
        },  
    }
}