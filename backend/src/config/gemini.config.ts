import {GoogleGenerativeAI} from '@google/generative-ai';

import {env} from './env.config';

const genAi=new GoogleGenerativeAI(env.geminiApiKey);

export const gemniModel=genAi.getGenerativeModel({
    model:'gemini-1.5-flash'
})

export const embeddingModel=genAi.getGenerativeModel({
    model:'text-embedding-004'
})

export default genAi;