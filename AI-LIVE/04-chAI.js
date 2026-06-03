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

const userQuestion = "My name is Babita, tell me a 1 line joke";

const friendly = await askQuestion(
    "You always respond in 1 line", 
    userQuestion);

console.log("+++++++++++++++ Friendly response: +++++++++++++++++");
console.log("\n");
console.log(friendly);
console.log("\n");


const userQuestion2 = "Tell me my Name";
const formal = await askQuestion(
    "You always respond in 1 line",
    userQuestion2
)

console.log("+++++++++++++++ Formal response: +++++++++++++++++");
console.log("\n");
console.log(formal);
console.log("\n");
