import api from "./axios.config";

export const sendMessageApi=async(
    documentId:string,
    question:string,
    conversationId?:string
)=>{
    const url=conversationId
    ? `/chat/document/${documentId}/${conversationId}`
    : `/chat/document/${documentId}`
    const res=await api.post(url,{question})
    return res.data.data
}

export const getConversationsApi=async()=>{
    const res=await api.get('/conversations')
    return res.data.data
}

export const getConversationApi=async(id:string)=>{
    const res=await api.get(`/conversations/${id}`)
    return res.data.data
}
