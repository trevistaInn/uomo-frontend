import { useContext } from "react";
import BlackButton from "../../reusedComponents/BlackButton";
import styles from "./DashboardAccountDetails.module.css";
import { StylesContext } from "../../contexts/StylesContext";

export default function DashboardAccountDetails() {
  const { currentUser } = useContext(StylesContext);
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <input type="text" placeholder={currentUser.name || "first name"} />
      </div>
      <input type="text" placeholder={currentUser.name || "name"} />
      <input type="email" placeholder={currentUser.email || "email"} defaultValue={null} />

      <h2>Password Change</h2>
      <input type="password" placeholder="Current password (leave blank to leave unchanged)" />
      <input type="password" placeholder="New password (leave blank to leave unchanged)" />
      <input type="password" placeholder="Confirm new password" />

      <BlackButton className={styles.submitBtn}>Save Changes</BlackButton>
    </form>
  );
}
