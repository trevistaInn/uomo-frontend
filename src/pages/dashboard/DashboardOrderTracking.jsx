import styles from "./DashboardOrderTracking.module.css";
import { useState } from "react";

export default function DashboardOrderTracking(){

    const [order, setOrder] = useState(null);

    async function handleSubmit(e){
    e.preventDefault();
    const _id = e.target[0].value;
    const email = e.target[1].value;

      console.log({
                _id: Number(_id),
                // 'customer.email': email
            })

    try {
        const response = await fetch('https://uomo-backend-91j6.onrender.com/order/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: Number(_id),
                'customer.email': email}),
        });
        const data = await response.json();

        if (data.success) {
            setOrder(data.order);
        } else {
            alert(data.message);
        }
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    }

    return(
        <div className={styles.ordertrack1}>
            <div className={styles.ordertrack2}>
                <h1 className={styles.header}>ORDER TRACKING</h1>
                <p className={styles.orderpara}>To track your order please enter your Order ID in the box below and press the <br />
                Track button. This was given to you on your receipt and in the confirmation email <br />
                you should have received</p>
                <form action="" className={styles.orderform} onSubmit={handleSubmit}>
                    <input type="text" className={styles.inp1} placeholder="Order ID" />
                    <input type="text" className={styles.inp2} placeholder="Billing Email"/>
                    <button className={styles.orderbutton} type="submit">TRACK</button>
                </form>
                {order && (
                    <div>
                        <p>Order ID: {order._id}</p>
                        <p>Status: {order.status}</p>
                        <h2>Tracking History</h2>
                        {order.tracking.map((item, index) => (
                            <div key={index}>
                                <p>Status: {item.status}</p>
                                <p>Date: {new Date(item.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )} 
            </div>
        </div>
    )
}
