import api from "./axios.config";


export const uploadDocumentApi=async(file:File)=>{
    const formData=new FormData()
    formData.append('document',file);
    const res=await api.post('/documents/upload',formData,{
        headers:{'Content-Type':'multipart/form-data'}
    })
    return res.data.data
}

export const getDocumentsApi=async()=>{
    const res=await api.get('/documents');
    return res.data.data;
}

export const getDocumentById=async(id:string)=>{
     const res=await api.get(`/documents/${id}`)
     return res.data.data
}
export const deleteDocumentApi=async(id:string)=>{
    await api.delete(`/documents/${id}`)
}