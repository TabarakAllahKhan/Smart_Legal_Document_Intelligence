import {GoogleGenerativeAI} from '@google/generative-ai';

import {env} from './env.config';

const genAi=new GoogleGenerativeAI(env.geminiApiKey);

export const gemniModel=genAi.getGenerativeModel({
    model:'gemma-4-26b-a4b-it'
})

export const embeddingModel=genAi.getGenerativeModel({
    model:'gemini-embedding-001'
})

export default genAi;