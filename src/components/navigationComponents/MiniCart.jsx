import { NavLink } from "react-router-dom";
import { useContext, useState } from "react"
import { StylesContext } from "../../contexts/StylesContext"
import CartItem from "./CartItem"
import GreyButton from "../../reusedComponents/GreyButton"
import { calculateTotals } from "../../utils/Price_Discount"
import styles from "./Navigation.module.css"
import useCartStore from "../../stores/cartItemsStore";

export default function MiniCart(){
    const { count, closePanel } = useContext(StylesContext)
    const cartItems = useCartStore((state) => state.cartItems);
    const [error, setError] = useState("")
    const totals = calculateTotals(cartItems);
    const totalMRP = Number(totals.totalMRP.toFixed(2));
    const totalDiscount = Number(totals.totalDiscount.toFixed(2));
    
    const handleSubmit = (e) => { 
        if(cartItems.length === 0){
            e.preventDefault();
            setError("Please add items to your cart before proceeding to viewcart.");
            return;
        }
        setError("");
        closePanel();
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.cartItems}>
                    <div className={styles.head}> 
                        <b>Cart({count.cartCount})</b>
                        <button onClick={closePanel} className="cursor-pointer">&#x1D5B7;</button>
                    </div>

                    {cartItems.length > 0 ?
                        cartItems.map((item) => (<CartItem  key={`${item._id}-${item.selectedColor}-${item.selectedSize}`} 
                            item={item}/> ))
                        : <h1 className="text-center">Your cart is empty</h1>
                    }

                    <div className={styles.totalPrice}>
                        <div className="flex justify-between text-xs">
                            <b>SUBTOTAL:</b>
                            <b>${Number((totalMRP - totalDiscount).toFixed(2))}</b>
                        </div>
                        <br/>
                        <NavLink to="/cart"><GreyButton onClick={handleSubmit}>VIEW CART</GreyButton></NavLink>
                        {error && (<p style={{color:"red", padding:"8px", textAlign:"center", fontSize:"10px"}}>{error}</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
