import { useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { StylesContext } from "../contexts/StylesContext";

function finalPrice(price, discount){
  return (Number(price) * (1 - (Number(discount)/100)))
}

function getFinalPrice(product) {
  return product.discount
    ? finalPrice(product.price, product.discount)
    : Number(product.price);
}

function parseNumberParam(searchParams, price) {
  const filteredPrice = searchParams.get(price);

  if (filteredPrice === null || filteredPrice === "") {
    return null;
  }

  const parsedValue = Number(filteredPrice);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function parseFilters(searchParams) {
  return {
    category: searchParams.get("category") || "",
    sizes: searchParams.get("size")?.split(",") || [],
    brands: searchParams.get("brand")?.split(",") || [],
    colors: searchParams.get("color")?.split(",") || [],
    minPrice: parseNumberParam(searchParams, "minPrice"),
    maxPrice: parseNumberParam(searchParams, "maxPrice"),
  };
}

function areFilterArraysEqual(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  return first.every((value, index) => value === second[index]);
}

function areFiltersEqual(first, second) {
  return (
    first.category === second.category &&
    areFilterArraysEqual(first.sizes, second.sizes) &&
    areFilterArraysEqual(first.brands, second.brands) &&
    areFilterArraysEqual(first.colors, second.colors) &&
    first.minPrice === second.minPrice &&
    first.maxPrice === second.maxPrice
  );
}

function filterProducts(products, filters) {
  return (products || []).filter((item) => {
    const price = getFinalPrice(item);
    const category = item?.style || "";
    const colors = Array.isArray(item?.color)
      ? item.color
      : item?.color
        ? [item.color]
        : [];
    const brand = item?.brand || "";
    const sizes = Array.isArray(item?.size)
      ? item.size
      : item?.size
        ? [item.size]
        : [];

    if (filters.category.length && filters.category !== category) {
      return false;
    }

    if (filters.colors.length && !colors.some((color) => filters.colors.includes(color))) {
      return false;
    }

    if (filters.brands.length && !filters.brands.includes(brand)) {
      return false;
    }

    if (filters.sizes.length && !sizes.some((size) => filters.sizes.includes(size))) {
      return false;
    }

    if (filters.minPrice !== null && price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== null && price > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

function sortProducts(products, sort) {
  const unsortedProducts = [...products];

  switch (sort) {
    case "newest":
      unsortedProducts.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        if (dateA !== dateB) {
          return dateB - dateA;
        }

        return Number(b._id || 0) - Number(a._id || 0);
      });
      break;

    case "Discount":
      unsortedProducts.sort(
        (a, b) => Number(b.discount || 0) - Number(a.discount || 0),
      );
      break;

    case "priceLowToHigh":
      unsortedProducts.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
      break;

    case "priceHighToLow":
      unsortedProducts.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
      break;
      
    default:
      break;
  }

  return unsortedProducts;
}

export default function useFilteredSortedProducts(products) {
  const [searchParams] = useSearchParams();
  const { sort, setFilters } = useContext(StylesContext);

  const appliedFilters = useMemo(() => 
    parseFilters(searchParams)
  , [searchParams]);

  useEffect(() => {
    setFilters((prev) => (areFiltersEqual(prev, appliedFilters) ? prev : appliedFilters));
  }, [appliedFilters, setFilters]);

  return useMemo(() => {
    const filteredProducts = filterProducts(products, appliedFilters);
    return sortProducts(filteredProducts, sort);
  }, [appliedFilters, products, sort]);
}
