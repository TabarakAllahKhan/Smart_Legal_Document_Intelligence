import {Document} from "@prisma/client";

export interface DocumentUploadResponse{
    document:Document
    summary:string
    parties:string[]
    keyDates:string[]
    keyClauses:string[]
    riskFlags:string[]
}