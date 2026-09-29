import { Link } from "react-router-dom";
import styles from "./Uomo.module.css";

export default function Uomo({ products}) {
  return (
    <div className={styles.sixthblock}>
      <b className={styles.text}>UOMO</b>
      <div className={styles.sixth}>{products?.map((pic) => (
              <Link to="/category/more" key={pic._id}>
                <img src={"./temp/image.jpg"} alt={pic.style} />
              </Link>
            ))}</div>
    </div>
  );
}