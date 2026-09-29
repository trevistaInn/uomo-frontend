type CartResponse = {
    success: boolean;
    cartItems: any[];
};

export const saveCart = async (
    accessToken: string,
    cartItems: any[]
): Promise<CartResponse> => {
    const response = await fetch("https://uomo-backend-91j6.onrender.com/cart", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const getCart = async (
    accessToken: string
): Promise<CartResponse> => {
    const response = await fetch("https://uomo-backend-91j6.onrender.com/cart", {
        method: "GET",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};