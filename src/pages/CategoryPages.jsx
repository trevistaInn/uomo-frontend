import Card from "../reusedComponents/Card";
import Shopping from "../reusedComponents/Shopping";
import useCategoryProducts from "../apis/categoryProducts";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const { category } = useParams();
    const { data, isLoading } = useCategoryProducts(category, !!category);

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
                              category={category}
                          />
                      ))}
            </Shopping>
        </div>
    );
}