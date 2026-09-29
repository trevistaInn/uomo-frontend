import { useState, useEffect, useMemo, createContext } from "react";
import useCartStore from "../stores/cartItemsStore";
import useWishlistStore from "../stores/wishlistStore";
import refreshAccessToken from "../apis/refreshAccessToken";

export const StylesContext = createContext();

export function defaultFilters() {
  return {
    category: "",
    sizes: [],
    brands: [],
    colors: [],
    minPrice: null,
    maxPrice: null,
  };
}

export default function CardProvider({ children }) {
  const [search, setSearch] = useState("");
  const [allStyles, setAllStyles] = useState({});
  const [activePanel, setActivePanel] = useState(null);
  const [sort, setSort] = useState("newest");
  const [cartState, setCartState] = useState("shopping");
  const [filters, setFilters] = useState(defaultFilters());
  const [backendFilters, setBackendFilters] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const count = {
    cartCount: cartItems.reduce((totalItems, item) => item.quantity + totalItems, 0),
    wishlistCount: wishlist.length,
  };

  const {
    mensStyles,
    womenStyles,
    trendyProducts,
    limitedEditionProducts,
    eastsideProducts,
    categories,
    winterstyles,
  } = allStyles || {};

  function setAppLoading() {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
    }, 500);
  }

  const allData = useMemo(() => {
    return [
      ...(mensStyles || []),
      ...(womenStyles || []),
      ...(trendyProducts || []),
      ...(limitedEditionProducts || []),
      ...(eastsideProducts || []),
      ...(categories || []),
      ...(winterstyles || []),
    ];
  }, [
    mensStyles,
    womenStyles,
    trendyProducts,
    limitedEditionProducts,
    eastsideProducts,
    categories,
    winterstyles,
  ]);

  function filterProducts(products) {
    if (!products) return [];
    return products.filter((item) =>
      item?.style
        ?.toString()
        ?.toLowerCase()
        ?.includes(search.toString().toLowerCase())
    );
  }

  const searchResults = allData && filterProducts(allData);
  
  function togglePanel(panelName) {
    setActivePanel((currentPanel) =>
      currentPanel === panelName ? null : panelName
    );
  }
  function openPanel(panelName) {
    setActivePanel(panelName);
  }
  function closePanel() {
    setActivePanel(null);
  }

  useEffect(() => {
    async function restoreSession() {
        try {
            const data = await refreshAccessToken();
            setCurrentUser(data);
        } catch {
            setCurrentUser(null);
        } finally {
            setAuthLoading(false);
        }
    }
    restoreSession();
}, []);

  useEffect(() => {
    async function getallData() {
      try {
        const res = await fetch("https://uomo-backend-91j6.onrender.com/allData");
        const data = await res.json();
        setAllStyles(data.data)
        } catch (error) {
           console.log(error);
        }
      }
      getallData();
    }, []);

    useEffect(() => {
      async function getUserOrders() {
        if (!currentUser) {
          setOrders([]);
          return;
        }
        try {
          const res = await fetch(`https://uomo-backend-91j6.onrender.com/order/user/${currentUser.id}`);
          const data = await res.json();
          if (data.success) {
            setOrders(data.orders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error(error);
          setOrders([]);
        }
      }
      getUserOrders();
    }, [currentUser]);

  return (
    <StylesContext.Provider
      value={{
        mensStyles, womenStyles, categories, winterstyles,
        searchResults,
        allData,
        count,
        orders, setOrders,
        search, setSearch,
        activePanel, togglePanel, openPanel, closePanel,
        sort, setSort,
        cartState, setCartState,
        filters, setFilters,
        backendFilters, setBackendFilters,
        currentUser, setCurrentUser, authLoading,
        error, setError,
        cartLoading,
        setAppLoading
      }}
      >
      {children}
    </StylesContext.Provider>
  );
}
