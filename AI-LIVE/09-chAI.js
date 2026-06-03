import { checkMistralAI } from './01-chAI.js';
import { calculator, calculateTool } from './tools/calculator.js';

const client = await checkMistralAI();
const model = "mistral-medium-latest"; // 

console.log(client._baseURL);


const tools = [calculateTool];

const messages = [
    {
        role: "system",
        content: "You are a helpful assistant that can perform calculations using the calculator tool."
    },
    {
        role: "user",
        content: "What is result of adding 23 and 54",
    }
]

const firstResponse = await client.chat.complete({
    model,
    messages,
    tool_choice: "auto",
    tools,
});

console.log("+++++++++++++++++ First Response: +++++++++++++++++++++");
const assistantMessage = firstResponse.choices[0].message;

console.log(assistantMessage);
console.log(assistantMessage.toolCalls);

messages.push(assistantMessage);

if(assistantMessage.toolCalls){
    const tollCall = assistantMessage.toolCalls[0];
    const toolResponse = await calculator(tollCall.arguments);
    console.log("+++++++++++++++++ Tool Response: +++++++++++++++++++++");
    console.log(toolResponse);

    messages.push({
        role: "tool",
        name: tollCall.name,
        content: toolResponse,
    });
}

const secondResponse = await client.chat.complete({
    model,
    messages,
    tool_choice: "auto",
    tools,  
});

console.log("+++++++++++++++++ Second Response: +++++++++++++++++++++");
console.log(secondResponse.choices[0].message);     
