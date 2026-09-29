import { Link } from "react-router-dom";
import styles from "./DashboardHome.module.css";
import { useContext } from "react";
import { StylesContext } from "../../contexts/StylesContext";

export default function DashboardHome() {
  const { currentUser } = useContext(StylesContext)
  return (
    <section className={styles.panel}>
      {currentUser ? <>
        <p className={styles.line}>
          Hello <b>{currentUser.name}</b> (not <b>{currentUser.name}</b>?{" "}
          <button type="button" className={styles.inlineBtn}>
            Log out
          </button>
          )
        </p>
        <p className={styles.line}>
          From your account dashboard you can view your{" "}
          <Link to="/dashboard/orders" className={styles.inlineLink}>
            recent orders
          </Link>
          , manage your{" "}
          <Link to="/dashboard/addresses" className={styles.inlineLink}>
            shipping and billing addresses
          </Link>
          , and{" "}
          <Link to="/dashboard/account-details" className={styles.inlineLink}>
            edit your password and account details
          </Link>
          .
        </p>
      </>
      :  
      <p>You have to login first</p>
    }
    </section>
  );
}

