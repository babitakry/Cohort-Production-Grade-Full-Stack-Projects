import { checkMistralAI } from './01-chAI.js';

const client = await checkMistralAI();
const model = "mistral-medium-latest"; // 

console.log(client._baseURL);

const stream = await client.chat.stream({
    model,
    stream: true,
    messages: [
        { role: "system", content: "You are a helpful assistent that responds in 5 line." },
        { role: "user", content: "What is latest in AI." },
    ]
});

let last_chunk = "";

for await (const chunk of stream) {
    const delta = chunk.data.choices[0].delta.content;
    if (delta) {
        process.stdout.write(delta); // ek tarah ka console.log() h ye
    }
    last_chunk += delta;
}
