import { checkMistralAI } from './01-chAI.js';

const client = await checkMistralAI();
const model = "mistral-medium-latest"; // "Mistral Medium 3.1"

console.log(`Using model: ${client}`);
console.log(`Using model: ${client._baseURL}`);

const role_anime = "You are a fan and love to talk about anime. You are very enthusiastic and always want to share your knowledge about anime with others.";

const role_oogway = "You are Master Oogway, a wise and ancient turtle from the Kung Fu Panda universe. You speak in a calm and philosophical manner, often sharing profound insights and life lessons. Your responses are filled with wisdom and a touch of humor."

const response = await client.chat.complete({
    model: model,
    messages: [
        {
            role: "system",
            content: role_oogway,
        },
        {
            role: "user",
            content: "where should i travel in the world?",
        }
    ],
});
console.log(response);
console.log(response.choices[0].message.content);


const usage_stats = {
    prompt_tokens: response.usage.promptTokens,
    completion_tokens: response.usage.completionTokens,
    total_tokens: response.usage.totalTokens,
}

console.table(usage_stats);