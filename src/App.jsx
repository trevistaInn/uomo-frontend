import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart/Cart";
import ItemDetails from "./pages/ItemDetails";
import AppLayout from "./components/AppLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardOrders from "./pages/dashboard/DashboardOrders";
import DashboardAddresses from "./pages/dashboard/DashboardAddresses";
import DashboardAccountDetails from "./pages/dashboard/DashboardAccountDetails";
import DashboardWishlist from "./pages/dashboard/DashboardWishlist";
import DashboardDownloads from "./pages/dashboard/DashboardDownloads";
import DashboardLogout from "./pages/dashboard/DashboardLogout";
import DashboardOrderTracking from "./pages/dashboard/DashboardOrderTracking";
import DashboardOrderDetails from "./pages/dashboard/DashboardOrderDetails";
import CategoryPages from "./pages/CategoryPages";
import SearchPage from "./pages/SearchPage";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "category/:category", element: <CategoryPages /> },
        { path: "category/:category/:type", element: <ItemDetails /> },
        { path: "search", element: <SearchPage /> },
        { path: "search/:type", element: <ItemDetails /> },
        { path: "product/:id", element: <ItemDetails /> },
        { path: "cart", element: <Cart /> },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardHome /> },
            { path: "orders", element: <DashboardOrders /> },
            { path: "downloads", element: <DashboardDownloads /> },
            { path: "addresses", element: <DashboardAddresses /> },
            { path: "account-details", element: <DashboardAccountDetails /> },
            { path: "wishlist", element: <DashboardWishlist /> },
            { path: "logout", element: <DashboardLogout /> },
            { path: "order-tracking/:orderId", element: <DashboardOrderTracking/>},
            { path: "order-details/:orderId", element: <DashboardOrderDetails/>},
            
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
