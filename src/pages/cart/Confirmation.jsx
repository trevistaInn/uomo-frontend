import styles from "./Confirmation.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StylesContext } from "../../contexts/StylesContext";
export default function Confirmation(){

const navigate = useNavigate();
const { setCartState } = useContext(StylesContext)
const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
const cartItems = Array.isArray(orderData.cartItems)? orderData.cartItems: [];

const subtotal = cartItems.reduce((acc, item) => {
      const quantity = Number(item.quantity) || 1;

      const priceAfterDiscount = item.discount ? (Number(item.price) - (Number(item.discount/100)*Number(item.price))) : Number(item.price);
      return acc + priceAfterDiscount * quantity;
    }, 0);

               const vat = subtotal * 0.18;                                                          
               const total = subtotal + vat;

   if(!orderData || Object.keys(orderData).length === 0){
      return <p>No order data found</p>
   }


   
      return (
        <div>
         <BsCheckCircleFill className={styles.checkCircle}/>
         <p className={styles.orderCompleted}>Your order is completed!</p>
         <p className={styles.orderCompleted1}>Thank you. Your order has been received.</p>
         <div className={styles.paymentDetails}>
         <span>
            <h3>Order Number</h3>
            <p>{orderData._id}</p>
            </span>
               <span>
            <h3>Date</h3>
               <p>{orderData.date}</p>
               </span>
            <span>
            <h3>Total</h3>
            <p>${total.toFixed(2)}</p>
            </span>
            <span>
            <h3>Payment Method</h3>
               <p>{orderData.paymentMethod}</p> 
               </span>
         </div>
         <div>
         <div className={styles.table1}>
            <p className={styles.h11}>YOUR ORDER</p>
            <p className={styles.tableCell}>Product <span>Total</span></p>
            <hr className={styles.hr}/>

            {cartItems.length === 0 ? (
               <p>Your cart is empty</p>
            ) : (
            cartItems.map((item, index) => {
            const style = item.style || "Unknown Product";
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            return (
            <p className={`text-gray-400 ${styles.tableCell}`} key={index}>
               {style} {"\u00D7"} {quantity} {" "} <span>${(price * quantity).toFixed(2)}</span>
               </p>
            );
               })
            )}
            
            <hr className={styles.hr}/>
            <p className={styles.tableCell}>Subtotal <span>${subtotal.toFixed(2)}</span></p>
            <hr className={styles.hr}/>
            <p className={styles.tableCell}>Shipping <span className="text-gray-400">Free shipping</span></p>
            <hr className={styles.hr}/>
            <p className={styles.tableCell}>VAT <span>${vat.toFixed(2)}</span></p>
            <hr className={styles.hr}/>
            <p className={styles.tableCell}>Total <span>${total.toFixed(2)}</span></p>
      </div>
       </div> 
       <br />
       <div className={styles.buttons}>
         <button className={styles.orderbut} type="button" onClick={()=>navigate("/dashboard/order-details", {state: orderData} )}>
            VIEW ORDER DETAILS
         </button>
         <button className={styles.orderbut1} type="button" onClick={()=> {
            setCartState("shopping");
            navigate("/");
         }}>
            CONTINUE SHOPPING
         </button>
       </div>
       </div>
       
    )
}