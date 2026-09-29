import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  _id: number;
  image: string;
  description: string;
  images: string[];
  style: number;
  price: number;
  type: string;
  brand: string;
  rating: number;
  gender: string;
  color: string[];
  size: string[];
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type CartState = {
    cartItems: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (_id: number, selectedColor: string, selectedSize: string) => void;
    clearCart: () => void;
    decrementQuantity: (_id: number, selectedSize: string, selectedColor: string) => void;
    updateCartItemSizeAndColor: (
        _id: number,
        oldSize: string, 
        oldColor: string, 
        newSize: string, 
        newColor: string) => void;
     setCartItems: (items: Product[]) => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
        cartItems: [],
        addToCart: (item) =>
            set((state) => {
                const existingItem = state.cartItems.find((cartItem) => cartItem._id === item._id &&
            cartItem.selectedColor === item.selectedColor && cartItem.selectedSize === item.selectedSize);

                if (existingItem) {
                return {
                    cartItems: state.cartItems.map((cartItem) =>
                    cartItem._id === item._id &&
                    cartItem.selectedSize === item.selectedSize &&
                    cartItem.selectedColor === item.selectedColor
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                        }
                        : cartItem
                    ),
                };
                }
                return {cartItems: [...state.cartItems, { ...item, quantity: 1 }]};
            }),
        removeFromCart: (_id, selectedColor, selectedSize) => set((state) => ({cartItems: state.cartItems.filter(item => !(item._id === _id &&
         item.selectedSize === selectedSize && item.selectedColor === selectedColor)
        )})),
        clearCart: () => set({ cartItems: [] }),
        decrementQuantity: (_id, selectedSize, selectedColor) => set((state) => ({
            cartItems: state.cartItems.map((cartItem) =>
                cartItem._id === _id &&
             cartItem.selectedSize === selectedSize && 
             cartItem.selectedColor === selectedColor && 
             cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
        })),
        setCartItems: (items) => set({ cartItems: items }),
        updateCartItemSizeAndColor: (_id, oldSize, oldColor, newSize, newColor) => set((state) => ({
            cartItems: state.cartItems.map((cartItem) =>
                cartItem._id === _id &&
                cartItem.selectedSize === oldSize &&
                cartItem.selectedColor === oldColor
                    ? {
                         ...cartItem, 
                         selectedSize: newSize,
                         selectedColor: newColor }
                    : cartItem
            )
        })),
    }),
    {
      name: "cart",
    }
    )
);
export default useCartStore;