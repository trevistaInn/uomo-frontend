import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

export type User = {
    name?: string,
    email: string,
    password: string,
}
export type SuccessResponse = {
    name: string,
    message: string
}

async function userRegister(user: User): Promise<SuccessResponse>{
    const res = await fetch("https://uomo-backend-91j6.onrender.com/api/register", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message)
    return data
}

const useRegisterUser = (query: []) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: userRegister,
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey: query
            })
        }
    })
}

export default useRegisterUser;