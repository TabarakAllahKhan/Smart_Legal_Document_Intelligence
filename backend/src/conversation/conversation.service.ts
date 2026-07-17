import prisma from "../config/prisma.config";

export const createConverstaion=async(
    userId:string,
    documentId:string,
    title?:string
)=>{
    return prisma.conversation.create({
        data:{userId,documentId,title}
    })
}

export const saveMessage=async(
    conversationId:string,
    role:'user' | 'assistant',
    content:string,
    sources:string[]=[]
)=>{
    return prisma.message.create({
        data:{
            conversationId,
            role,
            content,
            sources
        }
    })

}

export const getConverstaionWithMessages=async(
    converstaionId:string,
    userId:string
)=>{
    return prisma.conversation.findFirst({
        where:{
            id:converstaionId,userId
        },
        include:{
            messages:{orderBy:{createdAt:'asc'}}
        }
    })
}

export const getUserConversations=async(userId:string)=>{
    return prisma.conversation.findMany({
        where:{userId},
        include:{
            messages:{take:1,orderBy:{createdAt:'asc'}},
            document:{select:{originalName:true}}
        },
        orderBy:{updatedAt:'desc'}
    })
}