import styles from "./DashboardOrderDetails.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DashboardOrderDetails() {
  
  const navigate = useNavigate();
  const handleTrack = (order) => {
    navigate(`/dashboard/order-tracking/${order._id}`)
  }
  const {orderId} = useParams();
  const [order, setOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const handleRating = (_id, value) => {      
      setRatings((prev) => ({
        ...prev,
        [_id]: value,

      }));
    };

    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`https://uomo-backend-91j6.onrender.com/order/${orderId}`);
          const data = await response.json();
          if (data.success) {
            setOrder(data.order);
          }
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };
      fetchOrder();
    }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }


    return (
      <div>
        <h1 className={styles.orderdetails1}>Order Details</h1>
          {order.cartItems.map((item, index)=>(
          <div className={styles.orderdetails3} key={index} >
            <div>
              <b>Status : {order.status} </b>
            </div>
            
            <div className={styles.row}>
              <img src={item.image} alt={item.style} className={styles.orderdetails2}/>
            <div className={styles.orderdetails4}>
              <b>Type : {item.style}</b>
              <h4>Color : {item.selectedColor} </h4>
              <h4>Size : {item.selectedSize}</h4>
              <h1>Price : ${Math.round(item.price)}</h1>
            </div>
            </div>
            {order.status === "Delivered" && (
                <div>
                {[1,2,3,4,5].map((star)=>( 
                <span key={star} onClick={()=>handleRating(index, star)} 
                style={{cursor:"pointer", color: star <= (ratings[index] || 0) ? "gold" : "gray"}}>
                {star <= (ratings[index] || 0) ? "\u2605" : "\u2606"} </span>
                ))}
                   <p>Your Rating : {ratings[index] || 0}/5</p>
              </div>
            )}
            <button type="button" className={styles.trackBtn} onClick={()=> handleTrack(order)}>
                  Track Order</button>
          </div> 
        ))} 
      </div>
    );
  }
