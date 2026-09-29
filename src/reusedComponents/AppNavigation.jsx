import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StylesContext } from "../contexts/StylesContext";
import styles from "./AppNavigation.module.css";
import Loading from "./Loading";

export default function AppNavigation() {
  const { count, activePanel, togglePanel, currentUser, cartLoading, setAppLoading } = useContext(StylesContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.loading}>
      {cartLoading && <Loading />}
      <div className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.navLeft}>
          <NavLink to="/" onClick={() => setAppLoading()}>
            <img src="../../temp/logo.svg" alt="UOMO"  />
          </NavLink>
          <div className={styles.navLinks}> 
            <p className={styles.type}>
              <NavLink to="category/men" onClick={() => setAppLoading()}>MEN</NavLink>
            </p>
            <p className={styles.type}>
              <NavLink to="category/women" onClick={() => setAppLoading()}>WOMEN</NavLink>
            </p>
            <p className={styles.type}>
              <NavLink to="category/kids" onClick={() => setAppLoading()}>KIDS</NavLink>
            </p>
            <p className={styles.type}>
              <NavLink to="category/beauty" onClick={() => setAppLoading()}>BEAUTY</NavLink>
            </p>
            <p className={styles.type}>
              <NavLink to="category/more" onClick={() => setAppLoading()}>MORE</NavLink>
            </p>
            {currentUser ? <p className={styles.type}>
              <NavLink to="dashboard" onClick={() => setAppLoading()}>DASHBOARD</NavLink>
            </p> : ""
            }
          </div>
        </div>

        <div className={styles.navRight}>
          <button onClick={() => togglePanel("search")}>
            <li>
              {activePanel !== "search" ? <i className="fa-brands fa-sistrix cursor-pointer"></i> : <p className="cursor-pointer">&#x1D5B7;</p>}
            </li>
          </button>

          <button className={styles.close}  onClick={() => togglePanel("wishlist")}>
            <li className={styles.cartWrapper}>
              <i className="fa-regular fa-heart"></i>
              {count.wishlistCount > 0 && <span className={styles.badge}>{count.wishlistCount}</span>}
            </li>
          </button>

          <button className={styles.close} onClick={() => togglePanel("cart")}>
            <li className={styles.cartWrapper}>
              <i className="fa-solid fa-bag-shopping"></i>
              {count.cartCount > 0 && <span className={styles.badge}>{count.cartCount}</span>}
            </li>
          </button>

          {currentUser ? <button onClick={() => navigate("/dashboard/account-details")} className={styles.currentUser1}>
              {currentUser.name}
            </button>
          : <button onClick={() => togglePanel("login")} className={styles.close}>
              <li>
                <i className="fa-regular fa-user"></i>
              </li>
            </button>}

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
