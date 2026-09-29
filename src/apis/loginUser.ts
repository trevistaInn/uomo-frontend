import { useMutation } from "@tanstack/react-query"
import { SuccessResponse } from "./registerUser"

type LoginUser = {
    email: string,
    password: string
}

async function userLogin(user: LoginUser): Promise<SuccessResponse>{
    const res = await fetch("https://uomo-backend-91j6.onrender.com/api/login", {
        method: "POST",
        credentials : "include",
        headers : {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(user) 
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message)
    return data;
} 

const useLoginUser = () => {
    return useMutation({
        mutationFn: userLogin
    })
}

export default useLoginUser