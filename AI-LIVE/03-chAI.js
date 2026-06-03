import { checkMistralAI } from './01-chAI.js';

const client = await checkMistralAI();
const model = "mistral-medium-latest"; // 

console.log(`Using model: ${client._baseURL}`);

async function askQuestion(systemPrompt, userPrompt){
    const response = await client.chat.complete({
        model: model,
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            }
        ],
    });
    return response.choices[0].message.content;
}

const userQuestion = "Where is my food order?";

const friendly = await askQuestion(
    "You are a friendly customer service agent who loves to help customers with their food orders. You are always polite and eager to assist.", 
    userQuestion);

console.log("+++++++++++++++ Friendly response: +++++++++++++++++");
console.log("\n");
console.log(friendly);
console.log("\n");

const formal = await askQuestion(
    "You are a formal customer support agent for a food delivery service. You always respond in a professional and courteous manner, providing clear and concise information to customers about their orders.",
    userQuestion
)

console.log("+++++++++++++++ Formal response: +++++++++++++++++");
console.log("\n");
console.log(formal);
console.log("\n");

const rude = await askQuestion(
    "You are a rude customer support agent for a food delivery service. You respond in a curt and unhelpful manner, often providing vague or dismissive answers to customers about their orders.",
    userQuestion,
);

console.log("+++++++++++++++ Rude response: +++++++++++++++++");
console.log("\n");
console.log(rude);
console.log("\n");