import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { StylesContext } from "../contexts/StylesContext";
import AppNavigation from "../reusedComponents/AppNavigation";
import Footer from "./homeComponents/Footer";
import Login from "../components/navigationComponents/Login";
import Register from "../components/navigationComponents/Register";
import MiniCart from "./navigationComponents/MiniCart";
import Search from "./navigationComponents/Search";
import Filters from "../features/Filters";
import Wishlist from "../components/navigationComponents/Wishlist"
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const { activePanel, cartLoading } = useContext(StylesContext);
  return (
    <>
      <div>
        <AppNavigation />
        <main className={`${styles.content} ${cartLoading ? styles.contentLoading : ""}`}>
          <Outlet />
        </main>
        <Footer />
      </div>

      {activePanel === "login" && <Login />}
      {activePanel === "register" && <Register />}
      {activePanel === "cart" && <MiniCart />}
      {activePanel === "wishlist" && <Wishlist/>}
      {activePanel === "search" && <Search />}
      {activePanel === "filter" && <Filters />}
    </>
  );
}
