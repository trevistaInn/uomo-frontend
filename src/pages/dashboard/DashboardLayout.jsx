import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

const navItems = [
  { label: "Dashboard", path: "/dashboard", end: true },
  { label: "Orders", path: "/dashboard/orders" },
  { label: "Downloads", path: "/dashboard/downloads" },
  { label: "Addresses", path: "/dashboard/addresses" },
  { label: "Account Details", path: "/dashboard/account-details" },
  { label: "Wishlist", path: "/dashboard/wishlist" },
  { label: "Logout", path: "/dashboard/logout" },
];

function getDashboardTitle(pathname) {
  if (pathname.includes("/dashboard/orders")) return "ORDERS";
  if (pathname.includes("/dashboard/downloads")) return "DOWNLOADS";
  if (pathname.includes("/dashboard/addresses")) return "ADDRESSES";
  if (pathname.includes("/dashboard/account-details")) return "ACCOUNT DETAILS";
  if (pathname.includes("/dashboard/wishlist")) return "WISHLIST";
  if (pathname.includes("/dashboard/logout")) return "LOGOUT";
  return "MY ACCOUNT";
}

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const title = getDashboardTitle(pathname);

  return (
    <section className={`homecontainer ${styles.page}`}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.main}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
