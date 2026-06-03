import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.MISTRAL_API_KEY;

export const apikeyChecker = () => {
    if (!API_KEY) {
        console.error("Error: MISTRAL_API_KEY is not set in the environment variables.");
        process.exit(1);
    }
}

export const checkMistralAI = async () => {
    // const mistralai = (await import('@mistralai/mistralai')).default; // lazy import
    const client = new Mistral({ apiKey: API_KEY, });

    if (!client) {
        console.error("Error: Failed to initialize MistralAI client.");
        process.exit(1);
    }
    console.log("MistralAI client initialized successfully.");
    return client;
}

