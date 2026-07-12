interface RegisterRequest{
    name:string
    email:string
    password:string
}

interface AuthUserResponse{
    id:string
    name:string
    email:string
}

interface AuthResponse{
    accessToken:string
    refreshToken:string
    user:AuthUserResponse
}

export {
    RegisterRequest,
    AuthResponse,
    AuthUserResponse
}