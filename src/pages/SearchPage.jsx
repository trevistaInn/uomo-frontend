import Card from "../reusedComponents/Card";
import Shopping from "../reusedComponents/Shopping";
import useSearchedProducts from "../apis/searchProducts";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StylesContext } from "../contexts/StylesContext";

export default function SearchPage() {
    const { setBackendFilters } = useContext(StylesContext)
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q") ?? "";
    const { data, isLoading } = useSearchedProducts(search,!!search);
    useEffect(() => {
        if (data?.filters) {
            setBackendFilters(data.filters);
        }
    }, [data?.filters, setBackendFilters]);
    return (
        <div className="homecontainer">
            <Shopping>
                {!isLoading && data?.products.length === 0 && (
                    <div className="text-red-500">
                        No products found.
                    </div>
                )}

                {isLoading
                    ? "Loading..."
                    : data?.products.map((card) => (
                          <Card
                              key={card._id}
                              card={card}
                          />
                      ))}
            </Shopping>
        </div>
    );
}