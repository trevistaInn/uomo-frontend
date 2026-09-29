import ItemsQuantity from "../../reusedComponents/ItemsQuantity"
import useCartStore from "../../stores/cartItemsStore";
import styles from "./CartItem.module.css"
import { saveCart } from "../../apis/cartApis";
import { useContext } from "react";
import { StylesContext } from "../../contexts/StylesContext";


export default function CartItem({item}){
    const { currentUser } = useContext(StylesContext);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const handleRemoveFromCart = async (itemId, selectedColor, selectedSize) => {
        if (!currentUser) return;
        removeFromCart(itemId, selectedColor, selectedSize);
        const updatedCart = useCartStore.getState().cartItems;
        await saveCart(currentUser.accessToken, updatedCart);
    }

    const updateCartItemSizeAndColor = useCartStore((state) => state.updateCartItemSizeAndColor);

    const changeProductOptions = async ( newSize, newColor) => {
        updateCartItemSizeAndColor(
            item._id, 
            item.selectedSize, 
            item.selectedColor, 
            newSize, newColor
        );
        if (!currentUser) return;
        const updatedCart = useCartStore.getState().cartItems;
        await saveCart(currentUser.accessToken, updatedCart);
    }

    return(
        <main className={styles.main}>
            <img src={item.image} alt={item.style} className={styles.image} />
            <div className={styles.details}>
                <h2 className={styles.details1}>
                    <b>{item.style}</b>
                    <button 
                        onClick={() => handleRemoveFromCart(item._id, item.selectedColor, item.selectedSize)}
                        className={styles.but}
                        >&#x1D5B7;
                    </button>
                </h2>
                <div>
                    <label htmlFor="size">Size:</label>
                    <select id="size" value={item.selectedSize} 
                    onChange={(e) => changeProductOptions(e.target.value, item.selectedColor)}>
                        {item.size?.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="color">Color:</label>
                    <select id="color" value={item.selectedColor} 
                    onChange={(e) => changeProductOptions(item.selectedSize, e.target.value)}>
                        {item.color?.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <ItemsQuantity item={item} />
                    <h1>${Math.round(item.quantity * item.price)}</h1>
                </div>
            </div>
           
        </main>
    )
}