import { checkMistralAI } from './01-chAI.js';

const client = await checkMistralAI();
const model = "mistral-medium-latest"; // 

console.log(`Using model: ${client._baseURL}`);

const conversation = [];

async function askQuestion(systemPrompt, userPrompt, history = []) {
    const response = await client.chat.complete({
        model: model,
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            ...history,
            {
                role: "user",
                content: userPrompt,
            }
        ],
    });
    history.push({ role: "user", content: userPrompt });
    history.push({ 
        role: "assistant", 
        content: response.choices[0].message.content 
    });
    return response.choices[0].message.content;
}

const userQuestion = " My name is Babita and  I am a software developer, tell me a 1 line joke";

const response1 = await askQuestion(
    "You always respond in 1 line", 
    userQuestion,
    conversation
);

console.log("+++++++++++++++ Response 1: +++++++++++++++++");
console.log(response1);
console.log("\n");
console.log("Conversation history after response 1:");
console.log(conversation);
console.log("\n");

const userQuestion2 = "Tell me my Name and Profession";

const response2 = await askQuestion(
    "You always respond in 1 line",
    userQuestion2,
    conversation
)

console.log("+++++++++++++++ Response 2: +++++++++++++++++");
console.log(response2);
console.log("\n");
console.log("Conversation history after response 2:");  
console.log(conversation);
console.log("\n");

