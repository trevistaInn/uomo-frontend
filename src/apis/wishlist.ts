export const saveWishlist = async (userId: string, wishlistItems: any[]) => {
    const response = await fetch("https://uomo-backend-91j6.onrender.com/wishlist", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, wishlistItems })
    });
    return await response.json();
};

export const getWishlist = async (userId: string) => {
    const response = await fetch(
        `https://uomo-backend-91j6.onrender.com/wishlist/${userId}`
    );
    return await response.json();
};
