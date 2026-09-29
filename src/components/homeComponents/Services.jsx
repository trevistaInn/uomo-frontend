import styles from './Services.module.css';

export default function Services() {
  return (
    <div className={styles.services}>

      <div className={styles['service-item']}>
        <i className="fa-solid fa-truck"></i>
        <h2>FAST and FREE delivery</h2>
        <p>Free delivery on all orders over $150</p>
      </div>

      <div className={styles['service-item']}>
        <i className="fa-solid fa-headset"></i>
        <h2>24/7 CUSTOMER SUPPORT</h2>
        <p>Friendly 24/7 customer support</p>
      </div>

      <div className={styles['service-item']}>
        <i className="fa-solid fa-shield-halved"></i>
        <h2>MONEY BACK GUARANTEE</h2>
        <p>We return money within 30 days</p>
      </div>
    </div>
  );
}
