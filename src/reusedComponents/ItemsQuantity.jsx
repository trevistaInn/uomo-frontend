import useCartStore from "../stores/cartItemsStore";
import { saveCart } from "../apis/cartApis";
import { useContext } from "react";
import { StylesContext } from "../contexts/StylesContext";
import styles from "../reusedComponents/Shopping.module.css"

export default function ItemsQuantity({item}){

    const addToCart = useCartStore((state) => state.addToCart);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);
    const { currentUser } = useContext(StylesContext)
;
    const handleIncrement = async () => {
        if (!currentUser) return;
        console.log("Incrementing quantity for item:", item);
        addToCart(item);
        const updatedCart = useCartStore.getState().cartItems;
        await saveCart(currentUser.accessToken, updatedCart);
    }

    const handleDecrement = async () => {
        if (!currentUser) return;
        decrementQuantity(item._id, item.selectedSize, item.selectedColor);
        const updatedCart = useCartStore.getState().cartItems;
        await saveCart(currentUser.accessToken, updatedCart);
    }

    return(
        <div className={styles.itemsQuantity1}>
            <button onClick={handleDecrement} className={styles.itemsQuantity2}>-</button>
            <p>{item.quantity}</p>
            <button onClick={handleIncrement} className={styles.itemsQuantity2}>+</button>
        </div>
    )
}