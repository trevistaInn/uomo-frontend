import { useContext } from "react"
import { StylesContext } from "../../contexts/StylesContext"
import styles from "./Navigation.module.css"
import ItemsQuantity from "../../reusedComponents/ItemsQuantity"
import GreyButton from "../../reusedComponents/GreyButton"
import { NavLink } from "react-router-dom"
import useWishlistStore from "../../stores/wishlistStore"
import { saveWishlist } from "../../apis/wishlist"

export default function Wishlist() {
    const {closePanel} = useContext(StylesContext)
    const deleteFromWishlist = useWishlistStore((state) => state.deleteFromWishlist);
    const wishlist = useWishlistStore((state) => state.wishlist);

    const handleDeleteFromWishlist = async (_id) => {
        deleteFromWishlist(_id);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;
        const updatedWishlist = useWishlistStore.getState().wishlist;

        await saveWishlist(user.id, updatedWishlist);
    };

    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.head}>
                    <b>Wishlist({wishlist.length})</b>
                    <button onClick={closePanel} className={styles.close}>&#x1D5B7;</button>
                </div>
                <div className={styles.cartItems}>
                    {wishlist.length > 0 ? (
                        wishlist.map((item)=> (
                        <div key={item._id} className={styles.itemRow}>
                            <img src={item.image} alt={item.style} className={styles.image} />
                            <div className={styles.details}>
                              <h2 className={styles.details1}>
                                <b>{item.style}</b>
                                <button 
                                    onClick={() => handleDeleteFromWishlist(item._id)}
                                    className={styles.close}>
                                    &#x1D5B7;
                                </button>
                               </h2> 
                               <h4>Color : {item.color?.join(', ')|| 'N/A'}</h4>
                                <h4>Size : {item.size?.join(', ') || 'N/A'}</h4>
                                <h6>{item.type}</h6>
                                <h1>Price : ${Math.round(item.price)}</h1>
                            </div>
                        </div>
                    ))
                ):(
                    <p className={styles.p1}>Your wishlist is empty</p>
                    )}
                </div>
                <div className={styles.actions}>
                <NavLink to="/dashboard/wishlist"><GreyButton onClick={closePanel}>VIEW WISHLIST</GreyButton></NavLink>
                </div>
                </div>
            </div>
            )
        }

