import { useContext, useState } from "react";
import { StylesContext } from "../../contexts/StylesContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BlackButton from "../../reusedComponents/BlackButton";
import styles from "./Navigation.module.css";
import useLoginUser from "../../apis/loginUser";
import useCartStore from "../../stores/cartItemsStore";
import { getCart } from "../../apis/cartApis";
import useWishlistStore from "../../stores/wishlistStore";
import { getWishlist } from "../../apis/wishlist.ts";

export default function Login() {
  const { mutate, error, isError } = useLoginUser()
  const { openPanel, closePanel, setCurrentUser } = useContext(StylesContext);
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  
  function handleLogin() {
    mutate(userCredentials, {
      onSuccess : async (data) => {
        setCurrentUser(data)
        closePanel();
        
        const cart = await getCart(data.accessToken);
        useCartStore.getState().setCartItems(cart.cartItems);

        const wishlist = await getWishlist(data.accessToken);
        useWishlistStore.getState().setWishlist(wishlist.wishlistItems);
      }
    })
  }

  return (
    <div className={styles.overlay}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className={styles.modal}
      >
        <div className={styles.head}>
          <p>LOGIN</p>
          <button
            type="button"
            onClick={closePanel}
            className={styles.close}>
            &#x1D5B7;
          </button>
        </div>

        <div className={styles.form}>
          <input
            type="email"
            className={styles.input2}
            value={userCredentials.email}
            onChange={(e) =>
              setUserCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Username or email address *"
            required
          />

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Password *</legend>

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.passwordInput}
                value={userCredentials.password}
                onChange={(e) =>
                  setUserCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="********"
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </fieldset>

          <div className={styles.rememberForgot}>
            <div className={styles.rememberForgot1}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <label htmlFor="remember">Remember me</label>
            </div>

            <button
              type="button"
              onClick={() => openPanel("forgotPassword")}
              className={styles.butt}>
              Lost password?
            </button>
          </div>

          <p className={styles.errorMsg}>
            {isError && error.message}
          </p>

          <BlackButton type="submit">
            LOG IN
          </BlackButton>

          <p className={styles.createAcc}>
            No account yet?{" "}
            <button
              type="button"
              onClick={() => openPanel("register")}
              className="underline cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}