import { useContext, useState, useEffect } from "react";
import { StylesContext } from "../../contexts/StylesContext";
import styles from "./Cart.module.css";
import ShoppingBag from "./ShoppingBag";
import ShippingAndCheckout from "./ShippingAndCheckout";
import Confirmation from "./Confirmation";

export default function Cart() {
  const [ isOrdered, setIsOrdered ] = useState(false);
  const { cartState, setCartState } = useContext(StylesContext);

  // useEffect(() => {
  //   if (cartState === "confirmation") {
  //     setCartState("shopping");
  //   }
  // }, []);

  return (
    <div className={styles.cart}>
      <b className={styles.cart1}>CART</b>

      <section>
        <button onClick={() => setCartState("shopping")} className="cursor-pointer">
          <b>01 SHOPPING BAG</b>
          <p className={styles.par}>Manage Your Items List</p>
        </button>
        <button onClick={() => setCartState("shipping")} className="cursor-pointer">
          <b>02 SHIPPING AND CHECKOUT</b>
          <p className={styles.par}>Checkout Your Items List</p>
        </button>
        <button disabled className={styles.disabled}>
          <b>03 CONFIRMATION</b>
          <p className={styles.par}>Review And Submit Your Order</p>
        </button>
      </section>
      <br></br>
      <hr className={styles.cart2} style={{width:
        cartState === "shopping"
          ? "33%"
          : cartState === "shipping"
          ? "66%"
          : "100%" }}>
      </hr>

      <br></br>
      <br></br>
      
        { cartState === "shopping" && <ShoppingBag /> }
        { cartState === "shipping" && <ShippingAndCheckout /> }
        { cartState === "confirmation" && <Confirmation /> }


    </div>
  );
}

