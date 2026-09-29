type RefreshResponse = {
    accessToken: string;
};

async function refreshAccessToken(): Promise<RefreshResponse> {
    const res = await fetch("https://uomo-backend-91j6.onrender.com/api/refresh", {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
}

export default refreshAccessToken;