import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StylesContext } from "../../contexts/StylesContext";
import styles from "./Navigation.module.css";

export default function Search() {
    const navigate = useNavigate();

    const { search, togglePanel, setSearch } = useContext(StylesContext);
    const [suggestions, setSuggestions] = useState([]);
    const [searchSuggestions, setSearchSuggestions] = useState(() => {
        const saved = localStorage.getItem("searchSuggestions");
        return saved ? JSON.parse(saved) : [];
    });

    // Fetch backend suggestions while typing
    useEffect(() => {
        const query = search.trim();

        if (!query) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://uomo-backend-91j6.onrender.com/search/suggestions?q=${encodeURIComponent(query)}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch search suggestions."
                    );
                }

                const data = await response.json();

                setSuggestions(data.slice(0, 6));
            } catch (error) {
                console.error(error);
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    function handleSubmit(e) {
        e.preventDefault();
        togglePanel("search");
        const trimmedSearch = search.trim();
        if (!trimmedSearch) return;
        const filteredSuggestions = searchSuggestions.filter(
            (item) => item !== trimmedSearch
        );
        const updatedSuggestions =
            filteredSuggestions.length >= 5
                ? [
                      ...filteredSuggestions.slice(1),
                      trimmedSearch,
                  ]
                : [
                      ...filteredSuggestions,
                      trimmedSearch,
                  ];

        setSearchSuggestions(updatedSuggestions);

        localStorage.setItem(
            "searchSuggestions",
            JSON.stringify(updatedSuggestions)
        );

        setSuggestions([]);

        navigate(
            `/search?q=${encodeURIComponent(trimmedSearch)}`
        );
    }

    function handleSuggestionClick(suggestion) {
        // Save selected suggestion to recent searches
        const filteredSuggestions = searchSuggestions.filter(
            (item) => item !== suggestion
        );

        const updatedSuggestions =
            filteredSuggestions.length >= 5
                ? [
                      ...filteredSuggestions.slice(1),
                      suggestion,
                  ]
                : [
                      ...filteredSuggestions,
                      suggestion,
                  ];

        setSearchSuggestions(updatedSuggestions);

        localStorage.setItem(
            "searchSuggestions",
            JSON.stringify(updatedSuggestions)
        );
        setSuggestions([]);
        setSearch(suggestion);
        togglePanel("search");
        navigate(
            `/search?q=${encodeURIComponent(suggestion)}`
        );
    }

    function handleDeleteSuggestion(curSuggestion) {
        setSearchSuggestions((prev) => {
            const changedSuggestions = prev.filter(
                (suggestion) => suggestion !== curSuggestion
            );

            localStorage.setItem(
                "searchSuggestions",
                JSON.stringify(changedSuggestions)
            );

            return changedSuggestions;
        });
    }

    return (
        <div className={styles.searchBlock}>
            <div className={styles.search}>
                <p>WHAT ARE YOU LOOKING FOR?</p>

                <br />

                <form
                    onSubmit={handleSubmit}
                    className={styles.searchPro}
                >
                    <input
                        type="text"
                        placeholder="SEARCH PRODUCTS"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className={styles.input}
                    />

                    <button
                        type="submit"
                        className={styles.close}
                    >
                        <i className="fa-brands fa-sistrix"></i>
                    </button>
                </form>

                <br />

                {suggestions.length > 0 && (
                    <div>
                        {suggestions.map((suggestion) => (
                            <div
                                key={suggestion}
                            >
                                <button
                                    type="button"
                                    className={styles.suggButton}
                                    onClick={() =>
                                        handleSuggestionClick(
                                            suggestion
                                        )
                                    }
                                >
                                    <p>{suggestion}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {search.trim() === "" &&
                    searchSuggestions.length > 0 && (
                        <>
                            <div className={styles.sugg1}>
                                {searchSuggestions.map(
                                    (suggestion) => (
                                        <div
                                            className={styles.sugg}
                                            key={suggestion}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        suggestion
                                                    )
                                                }
                                                className={
                                                    styles.close
                                                }
                                            >
                                                <p>
                                                    {suggestion}
                                                </p>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteSuggestion(
                                                        suggestion
                                                    )
                                                }
                                                className={
                                                    styles.close
                                                }
                                            >
                                                &#x1D5B7;
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>

                            <br />
                        </>
                    )}
            </div>
        </div>
    );
}