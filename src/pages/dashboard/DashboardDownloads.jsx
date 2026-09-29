import styles from "./DashboardLogout.module.css";

export default function DashboardDownloads() {
  return (
    <section className={styles.panel}>
      <p className={styles.message}>
        No downloads available yet. Purchased downloadable products will appear
        here.
      </p>
    </section>
  );
}

