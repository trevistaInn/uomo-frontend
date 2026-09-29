import { useContext } from "react";
import FilterSort from "../features/FiltersSort";
import styles from "../reusedComponents/Shopping.module.css";
import { StylesContext } from "../contexts/StylesContext";

export default function Shopping({children}){
    const {sort, setSort} = useContext(StylesContext)
    return(
        <>
            <FilterSort sort={sort} setSort={setSort} />    
            <div className={styles.gridcontainer}>
                {children}
            </div>
        </>
    )
}