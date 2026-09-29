import { useMutation } from "@tanstack/react-query";

async function logoutUser() {
    const res = await fetch("https://uomo-backend-91j6.onrender.com/api/logout", {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
}

const useLogoutUser = () => {
    return useMutation({
        mutationFn: logoutUser,
    });
};

export default useLogoutUser;