import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useContext, useState } from "react";
import { StylesContext} from "../contexts/StylesContext";
import useCartStore from "../stores/cartItemsStore";
import useWishlistStore from "../stores/wishlistStore";
import styles from "./Card.module.css";
import { saveWishlist } from "../apis/wishlist";

export default function Card({ card, category }) {
  const discount = card.price*(card.discount/100);
  const price = (card.price - discount).toFixed(2);
  const {setAppLoading} = useContext(StylesContext);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const addItemsToWishlist = useWishlistStore((state) => state.addItemsToWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  
  const isWishlisted = wishlist.some((item)=>item._id === card._id)

  const handleWishlistClick = async (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    addItemsToWishlist(card);

    const updatedWishlist = useWishlistStore.getState().wishlist;

    await saveWishlist(user.id, updatedWishlist);

  };


  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <FaHeart className={`${styles.heartIcon} ${isWishlisted ? styles.active : ''}`} 
          onClick={handleWishlistClick}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        />
        <Link to={category ? `${card.brand} ${card.style} ${card.type} ${card._id}` : `/product/${card._id}`} state={card} onClick={() => setAppLoading()}>
          <img src={card.image} alt={card.style} className={styles.image}/>
        </Link>
      </div>
      <article className={styles.category}>{card.style}</article>
      <p className={styles.nav}>{card.type}</p>
      <div className={styles.price}>
        {card.discount 
        ? <nav className={styles.nav1}>
            <h6 className={styles.nav2}>${card.price}</h6> 
            <h6 className={styles.nav3}>${price}</h6>
          </nav>
        : `$${card.price}`}
      </div>
    </div>
  );
}
