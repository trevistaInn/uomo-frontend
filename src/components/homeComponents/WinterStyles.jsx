import { Link } from "react-router-dom";
import styles from "./WinterStyles.module.css";

export default function WinterStyles() {
  return (
    <div className={styles.fifth}>
      <div className={styles.fifth1}>
          <img src={"./temp/image.jpg"} alt="Jackets" className={styles.img1} />
          <span className={styles.text}>
            <small>STARTING AT $19</small><br />
            <b>Jackets</b>
            <p><Link to="/beauty" className={styles.fifth2}>Shop Now</Link></p>
          </span>
      </div>

      <div>
          <img src={"./temp/image.jpg"} alt="Hoodie" className={styles.img2}/>
          <span className={styles.text}>
            <small>STARTING AT $39</small><br />
            <b>Hoodies</b>
            <p><Link to="/more" className="text-xs underline">Shop Now</Link></p>
          </span>
      </div>
    </div>
  );
}
