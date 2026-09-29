import { useContext, useEffect, useState } from "react"
import { useSearchParams, NavLink } from "react-router-dom";
import { defaultFilters, StylesContext } from "../contexts/StylesContext"
import BlackButton from "../reusedComponents/BlackButton"
import styles from "./Filters.module.css"
import panelStyles from "../components/navigationComponents/Navigation.module.css"

export default function Filters(){
    const [searchParams, setSearchParams] = useSearchParams()
    const {closePanel, filters, setFilters, backendFilters} = useContext(StylesContext)
    const [searchBrand, setSearchBrand] = useState("")
    const availableFilters = backendFilters ?? {
        brands: [],
        colors: [],
        sizes: [],
        price: {
            minPrice: 0,
            maxPrice: 0,
        },
    };

    function selectedFilter(filterType, selectedFilterType) {
    setFilters((prev) => {
        const currentValues = prev[filterType] ?? [];
        const updatedFilters = currentValues.includes(selectedFilterType)
        ? currentValues.filter((s) => s !== selectedFilterType)
        : [...currentValues, selectedFilterType];
        return {
        ...prev,
        [filterType]: updatedFilters,
        };
    });
    }

    const minPrice = Math.floor(availableFilters?.price.minPrice ?? 0);
    const maxPrice = Math.ceil(availableFilters?.price.maxPrice ?? 0);
    const [priceMin, setPriceMin] = useState(minPrice)
    const [priceMax, setPriceMax] = useState(maxPrice)
    useEffect(() => {
        setPriceMin(filters.minPrice ?? availableFilters.price.minPrice ?? 0);
        setPriceMax(filters.maxPrice ?? availableFilters.price.maxPrice ?? 0);
    }, [
        filters.minPrice,
        filters.maxPrice,
        availableFilters.price.minPrice,
        availableFilters.price.maxPrice,
    ]);
    const rangeSpan = Math.max(maxPrice - minPrice, 1)
    const minPercent = ((priceMin - minPrice) / rangeSpan) * 100
    const maxPercent = ((priceMax - minPrice) / rangeSpan) * 100

    function applyFilters() {
        const nextMinPrice = priceMin <= minPrice ? null : priceMin;
        const nextMaxPrice = priceMax >= maxPrice ? null : priceMax;
        const params = new URLSearchParams(searchParams.toString());

        if (filters.sizes.length > 0) {params.set("size", filters.sizes.join(","));} else {params.delete("size");}
        if (filters.colors.length > 0) {params.set("color", filters.colors.join(","));} else {params.delete("color");}
        if (filters.brands.length > 0) {params.set("brand", filters.brands.join(","));} else {params.delete("brand");}
        if (nextMinPrice !== null) {params.set("minPrice", nextMinPrice);} else {params.delete("minPrice");}
        if (nextMaxPrice !== null) {params.set("maxPrice", nextMaxPrice);} else {params.delete("maxPrice");}

        setFilters((prev) => {
            if (prev.minPrice === nextMinPrice && prev.maxPrice === nextMaxPrice) {
                return prev;
            }
            return {
                ...prev,
                minPrice: nextMinPrice,
                maxPrice: nextMaxPrice,
            };
        });
        setSearchParams(params);
        closePanel();
}

    function clearFilters() {
        const params = new URLSearchParams(searchParams);

        params.delete("size");
        params.delete("color");
        params.delete("brand");
        params.delete("minPrice");
        params.delete("maxPrice");

        setFilters(defaultFilters());
        setPriceMin(minPrice);
        setPriceMax(maxPrice);

        setSearchParams(params);
    }
    return(
        <div className={panelStyles.overlay}>
            <div className={`${panelStyles.modal} ${styles.filterModal}`}>
                <div className={panelStyles.head}>
                    <b>FILTER BY</b>
                    <button onClick={closePanel} className={styles.close}>&#x1D5B7;</button>
                </div>

                <div className={styles.filters}>   
                    <h1 className={styles.titles}>
                        <b>PRODUCT CATEGORIES</b>
                    </h1>
                    <div className={styles.productCategories}>
                        <section>
                            <NavLink to="/category/dresses"><p>Dresses</p></NavLink>
                            <NavLink to="/category/sweatshirts"><p>Sweatshirts</p></NavLink>
                            <NavLink to="/category/jackets"><p>Jackets</p></NavLink>
                            <NavLink to="/category/jeans"><p>Jeans</p></NavLink>
                            <NavLink to="/category/men"><p>Men</p></NavLink>
                        </section>
                        <section>
                            <NavLink to="/category/shorts"><p>Shorts</p></NavLink>
                            <NavLink to="/category/swimwear"><p>Swimwear</p></NavLink>
                            <NavLink to="/category/tshirts&tops"><p>T-shirts & Tops</p></NavLink>
                            <NavLink to="/category/trousers"><p>Trousers</p></NavLink>
                            <NavLink to="/category/jumpers&cardigans"><p>Jumpers & Cardigans</p></NavLink>
                        </section>
                    </div>

                    {availableFilters.colors.length > 0 && <h1 className={styles.titles}><b>COLOR</b></h1>}
                    <div className={styles.colors}>
                        {availableFilters.colors.map((color) => (
                            <div key={color}>
                                <input type="checkbox" id={color} hidden checked={filters.colors.includes(color)} onChange={() => selectedFilter("colors", color)} />
                                <label htmlFor={color} className={styles.color} style={{ backgroundColor: color }}></label>
                            </div>
                        ))}
                    </div>

                    {availableFilters.sizes.length > 0 && <h1 className={styles.titles}><b>SIZES</b></h1>}
                    <div className={styles.sizes}>
                        {availableFilters.sizes.map((size) => (
                            <button
                            key={size}
                            className={filters.sizes.includes(size) ? styles.selectedSize : styles.unselectedSize}
                            onClick={() => selectedFilter("sizes", size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {Array.isArray(availableFilters.brands) && availableFilters.brands.length > 0 && <h1 className={styles.titles}><b>BRANDS</b></h1>}
                    {Array.isArray(availableFilters.brands) && availableFilters.brands.length > 0 && <>
                        <div className={styles.searchBrand}>
                            <input
                                type="text"
                                placeholder="Search"
                                className={styles.searchInput}
                                value={searchBrand}
                                onChange={(event) => setSearchBrand(event.target.value)}
                            />
                            <i className="fa-brands fa-sistrix cursor-pointer"></i>
                        </div>
                        <div className={styles.brandsList}>
                            {availableFilters.brands.map(availableBrand => (
                                <div key={availableBrand.brand} className={styles.searchBrand1}>
                                    <nav className={styles.searchBrand2}>
                                        <input type="checkbox" id={availableBrand.brand} name="brand.brand" checked={filters.brands.includes(availableBrand.brand)} onChange={() => selectedFilter("brands", availableBrand.brand)} />
                                        <label htmlFor={availableBrand.brand}>{availableBrand.brand}</label>
                                    </nav>
                                    <p>{availableBrand.count}</p>
                                </div>
                            ))}                        
                        </div>
                    </>}

                    {availableFilters.price > 0 && <h1 className={styles.titles}><b>PRICE</b></h1>}
                    {availableFilters.price.minPrice > 0 && availableFilters.price.maxPrice && <div className={styles.priceSection}>
                        <div className={styles.rangeWrap}>
                            <div className={styles.sliderTrack}></div>
                            <div className={styles.sliderFill} style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}></div>
                            <input type="range" min={minPrice} max={maxPrice} value={priceMin} step="1" onChange={(event) => setPriceMin(Math.min(Number(event.target.value), priceMax - 1))} className={styles.range} />
                            <input type="range" min={minPrice} max={maxPrice} value={priceMax} step="1" onChange={(event) => setPriceMax(Math.max(Number(event.target.value), priceMin + 1))} className={styles.range} />
                        </div>
                        <div className={styles.priceLabels}>
                            <span>Min Price: ${priceMin.toFixed(2)}</span>
                            <span>Max Price: ${priceMax.toFixed(2)}</span>
                        </div>
                    </div>}
                    
                    
                    <div className={styles.actions}>
                        <button onClick={clearFilters} className={styles.resetButton}>Clear Filters</button>
                        <BlackButton onClick={applyFilters}>Apply Filters</BlackButton>
                    </div>
                </div>
            </div>
        </div>)
} 
