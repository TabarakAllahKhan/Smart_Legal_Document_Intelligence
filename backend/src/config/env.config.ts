import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars=[
    'DATABASE_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'GEMINI_API_KEY',
    'PORT',
    'GROQ_API_KEY'
] as const;

requiredEnvVars.forEach((key)=>{
    if(!process.env[key]){
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

// The ! is the null asertion operator, which tells TypeScript that we are sure that the value is not null or undefined.
export const env={
    databaseUrl:process.env.DATABASE_URL!,
    jwtAccessSecret:process.env.JWT_ACCESS_SECRET!,
    jwtRefreshSecret:process.env.JWT_REFRESH_SECRET!,
    geminiApiKey:process.env.GEMINI_API_KEY!,
    GROQ_API_KEY:process.env.GROQ_API_KEY!,
    port:parseInt(process.env.PORT!) || 5000
}
