import { useContext } from "react";
import ItemsQuantity from "../../reusedComponents/ItemsQuantity";
import BlackButton from "../../reusedComponents/BlackButton";
import GreyButton from "../../reusedComponents/GreyButton"
import styles from "./ShoppingBag.module.css"
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartItemsStore";
import { StylesContext } from "../../contexts/StylesContext";

export default function ShoppingBag(){

    const navigate = useNavigate();
    const { setCartState } = useContext(StylesContext);
    const cartItems = useCartStore(state => state.cartItems)
    const removeFromCart = useCartStore(state => state.removeFromCart)

    const subtotal = cartItems.reduce((acc, item) => {
    const quantity = item.quantity || 1;

    const priceAfterDiscount = item.discount ? (Number(item.price) - (Number(item.discount/100)*Number(item.price))) : Number(item.price);
    return acc + (priceAfterDiscount * quantity);
    }, 0);

    const vat = subtotal * 0.18;
    const total = subtotal + vat;

    return(
    <div className={styles.divider}>
        <div> 
            <div className={styles.item}>
                <b>PRODUCT</b>
                <div className={styles.prices}>
                    <b>PRICE</b>
                    <b>QUANTITY</b>
                    <b>SUBTOTAL</b>
                </div>
            </div>
            <br></br>
            <hr className={styles.line}></hr>

            {cartItems.map((item) => 
            <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}>
                <div className={styles.item1}>
                    <div className={styles.item}>
                        <div className={styles.productMeta}>
                            <img src={item.image} alt={item.style} />
                            <p>{item.style}</p>
                        </div>
                        <div className={styles.prices}>
                            <p>${item.price}</p>
                            <div className={styles.qtyBox}><ItemsQuantity item={item} /></div>
                            <p>{((item.discount ? Number(item.price) - (Number(item.discount)/100)*Number(item.price) : Number(item.price)) * (item.quantity || 1)).toFixed(2) }</p>
                        </div>
                    </div>
                    <button onClick={(() => removeFromCart(item._id, item.selectedColor, item.selectedSize))} className={styles.deleteButton}>&#x1D5B7;</button>
                </div>
                <hr className={styles.line}></hr>
            </div>
            )}

            <div className={styles.coupon}>
            <form className={styles.couponForm}>
                <input type="text" placeholder="Coupon Code" />
                <button type="button">APPLY COUPON</button>
            </form>
            <div className={styles.updateCart}><GreyButton>UPDATE CART</GreyButton></div>
            </div>

        </div>

        <div className={styles.cartAmount}>
            <div className={styles.totalsCard}>
                <h1>CART TOTALS</h1>
                <br></br>
                <div className={styles.subtotal}>
                    <p>SUBTOTAL</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className={styles.shippingRow}>
                    <p>SHIPPING</p>
                    <div>
                         <label className={styles.shippingOption}>
                            <input type="checkbox" name="" id="" /> Free Shipping
                        </label>
                        <label className={styles.shippingOption}>
                            <input type="checkbox" name="" id="" />  Flat rate: $49
                        </label>
                        <label className={styles.shippingOption}>
                            <input type="checkbox" name="" id="" />  Local pickup: $8
                        </label>        
                        <h5>Shipping to AL.</h5>
                        <h1 className={styles.changeAddress} onClick={() => navigate("/dashboard/addresses")}>
                              CHANGE ADDRESS <hr className={styles.changeAddress1} /> </h1>
                    </div>
                </div>
                 <div className={styles.vat}>
                    <p>VAT</p>
                    <p>${vat.toFixed(2)}</p>
                </div>                               
       
                <div className={styles.total}>
                    <p>TOTAL</p>
                    <p>${total.toFixed(2)}</p>
                </div>    
            </div>

            <BlackButton onClick={() => setCartState("shipping")}>PROCEED TO CHECKOUT</BlackButton>
        </div>
    </div>
    )
}
