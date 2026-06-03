import { checkMistralAI } from './01-chAI.js';
import readline from 'readline';

const client = await checkMistralAI();
const model = "mistral-medium-latest"; // 

console.log(client._baseURL);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const systemPrompot = "You are a helpful assistant that responds in 5 line.";

function askQuestion(userPrompt){
    return new Promise((resolve) => {
        rl.question(userPrompt, (answer) => {
            resolve(answer);
        });
    });
}

while(true){
    const userQuestion = await askQuestion("Ask a question: ");

    if(userQuestion.toLowerCase() === "exit"){
        console.log("Exiting...");
        break;
    }

    const stream = await client.chat.stream({
        model,
        stream: true,
        messages: [
            { role: "system", content: systemPrompot },
            { role: "user", content: userQuestion },
        ],
    });

    process.stdout.write("Chai Bot: ");
    for await(const chunk of stream){
        const delta = chunk.data.choices[0]?.delta?.content;
        if(delta){
            process.stdout.write(delta);
        }
    }
    console.log("\n");
}
rl.close();