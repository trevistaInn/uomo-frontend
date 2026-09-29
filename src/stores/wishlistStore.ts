import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./cartItemsStore";

type WishlistState = {
    wishlist: Product[];
    addItemsToWishlist: (item: Product) => void;
    deleteFromWishlist: (_id: number) => void;
    setWishlist: (items: Product[]) => void;
    clearWishlist: () => void;
}

const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            wishlist: [],
            addItemsToWishlist: (item) => set((state) => {
                const existingItem = state.wishlist.find((wishlistItem) => wishlistItem._id === item._id);
                if(existingItem) {
                    return {wishlist: state.wishlist.filter((wishlistItem) => wishlistItem._id !== existingItem._id)};
                }
                return {wishlist: [...state.wishlist, item]};
            }),
            deleteFromWishlist: (_id) => set((state) => ({wishlist: state.wishlist.filter((item) => item._id !== _id)})),
            setWishlist: (items) => set({wishlist: items}),
            clearWishlist: () => set({wishlist: []}),
        }),
        {
            name: "wishlist",
        }
    )
);
export default useWishlistStore;