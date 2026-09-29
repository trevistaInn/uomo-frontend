import Card from "../../reusedComponents/Card";
import styles from "./TrendyLimited.module.css";
import { Link } from "react-router-dom";

export default function TrendyLimited({ style, products }) {

  return (
    <div className={styles.mainthird}>
      <div className={styles.maintitle}>
        {style == "trendyProducts" ? (
          <>
            <p>OUR TRENDY <b>PRODUCTS</b></p>
            <div className={styles.categories}>
              <Link to="category/men" className="text-xl">ALL</Link>
              <Link to="category/women" className="text-xl">NEW ARRIVALS</Link>
              <Link to="category/kids" className="text-xl">BEST SELLER</Link>
              <Link to="category/more" className="text-xl">TOP</Link>
            </div>
          </>
        ) : (
          <p>LIMITED <b>EDITION</b></p>
        )}
      </div>
      <div className={styles.thirdblock}>
        {products?.map((card) => (
          <Card
            key={card._id}
            card={card}
          />
        ))}

      </div>
        <small className={styles.seeAll}>{style == "trendyProducts" ? <Link to="/products" className="text-xs"><b>SEE ALL PRODUCTS</b> <hr></hr></Link> : ""}</small>
    </div>
  );
}
