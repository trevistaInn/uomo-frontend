import useWishlistStore from "../../stores/wishlistStore";
import styles from "./DashboardWishlist.module.css";
import { useNavigate } from "react-router-dom";

function getProductRoute(product) {
  return `/product/${encodeURIComponent(product._id)}`;
}

export default function DashboardWishlist() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const deleteFromWishlist = useWishlistStore ((state) => state.deleteFromWishlist);
  const navigate = useNavigate();

  return (
    <section className={styles.grid}>
     {wishlist.length > 0 ? (
      wishlist.map((item) => (
        <article key={item._id} className={styles.card}>
          <button type="button" className={styles.removeBtn} onClick={() => deleteFromWishlist(item._id)}>
            x
          </button>
          <div className={styles.art}>
            <img src={item.image} alt={item.style} className={styles.img} 
            onClick={() => navigate(getProductRoute(item), {state:item})} />
          </div>
          <p className={styles.type}>{item.style}</p>
          <p className={styles.name}>{item.type}</p>
          <div className={styles.priceRow}>
            <p className={styles.price}>Price:${Math.round(item.price)}</p>
          </div> <br />
        </article>
      ))
    ):(       
      <p>Your wishlist is empty</p>
    )}
    </section>
  );
}
