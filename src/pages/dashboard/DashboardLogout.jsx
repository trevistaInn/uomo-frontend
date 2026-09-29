import { useContext } from "react";
import styles from "./DashboardLogout.module.css";
import { StylesContext } from "../../contexts/StylesContext";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartItemsStore";
import useWishlistStore from "../../stores/wishlistStore";
import useLogoutUser from "../../apis/logoutUser";

export default function DashboardLogout() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser, setAppLoading, openPanel, setOrders } = useContext(StylesContext)
  const clearCart = useCartStore((state) => state.clearCart);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const { mutate: logout } = useLogoutUser();
  return (
    <section className={styles.panel}>
      {currentUser ? 
        <>
          <p className={styles.message}>
            You are still logged in. Click the logout action in your auth flow to end this session.
          </p>
          <button
            onClick={() => {
              logout(undefined, {
                  onSuccess: () => {
                      localStorage.removeItem("user");
                      setOrders([]);
                      setAppLoading();
                      setCurrentUser(null);
                      clearCart();
                      clearWishlist();
                      navigate("/");
                      openPanel("login");
                    },
                });
            }}
            className="cursor-pointer"
          >Logout</button> 
        </>
      
      : <p className={styles.message}>
          You are logged out.
        </p>}

    </section>
  );
}

