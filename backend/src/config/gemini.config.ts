import {GoogleGenerativeAI} from '@google/generative-ai';
import Groq from 'groq-sdk';
import {env} from './env.config';

const genAI=new GoogleGenerativeAI(env.geminiApiKey);

export const groqClient=new Groq({
    apiKey:env.GROQ_API_KEY
})

export const embeddingModel=genAI.getGenerativeModel({
    model:'gemini-embedding-001'
})


export {genAI}
export default genAI;