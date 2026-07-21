import api from "./axios.config";

export const registerApi=async(name:string,email:string,password:string)=>{
    const res=await api.post('/auth/register',{name,email,password})
    return res.data.data
}

export const loginApi=async(email:string,password:string)=>{
    const res=await api.post('/auth/login',{email,password});
    return res.data.data
}

export const logoutApi=async()=>{
    await api.post('/auth/logout')
}