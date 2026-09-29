import styles from "./CollectionStyles.module.css";
import { Link } from "react-router-dom";

function CollectionStyles() {
  return (
    <div>
      <div className={styles.firstblock}>
        <div className={styles.firstimage} style={{backgroundImage: `url('${"./temp/image.jpg"}')`}}>
            <span className={styles.span}>
              <p className="text-xs">HOT LIST</p>
              <strong>Women</strong> Collection
              <Link to="/women"><p className="text-xs underline">SHOP NOW</p></Link>
            </span>
        </div>

        <div className={styles.secondblock}>
          <div className={styles.secondimage} style={{backgroundImage: `url('${"./temp/image.jpg"}')`}}>
            
              <span className={styles.span}>
                <p className="text-xs">HOT LIST</p>
                <strong>Men</strong> Collection
                <Link to="/men"><p className="text-xs underline">SHOP NOW</p></Link>
              </span>   
          </div>

          <div className={styles.thirdblock}>
            <div className={styles.thirdimage} style={{backgroundImage: `url('${"./temp/image.jpg"}')`}}>
              <span className={styles.span}>
                  <p className="text-xs">HOT LIST</p>
                  <strong>Kids</strong> Collection
                  <Link to="/kids"><p className="text-xs underline">SHOP NOW</p></Link>
                </span>
            </div>

            <div className={styles.fourthimage}>
              
                <span className={styles.span}>
                  <strong>Beauty</strong>& More
                  <p className="text-xs">Surprise someone with the gift they really want.</p>
                  <Link to="/beauty"><p className="text-xs underline">DISCOVER MORE</p></Link>
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.second}>
        <div className={styles.imagefirst} style={{backgroundImage: `url('${"./temp/image.jpg"}')`}}>
          <Link to="/women">
            <div className={styles.some}>
              <strong>Women </strong> Collection
            </div>
          </Link>
        </div>
        <div className={styles.imagesecond} style={{backgroundImage: `url('${"./temp/image.jpg"}')`}}>
          <Link to="/men">
            <div className={styles.some}>
              <strong>Men </strong> Collection
            </div>
          </Link>
        </div>
        <div className={styles.imagethird} style={{backgroundImage: `url('${"./temp/image.jpg"}')`}}>
          <Link to="/kids">
            <div className={styles.some}>
              <strong>Kids </strong> Collection
            </div>
          </Link>
        </div>
        <div className={styles.imagefourth} style={{backgroundImage: `url('${"./temp/image.jpg"}')` }}>
          <Link to="/beauty">
            <div className={styles.some}>
              <strong>Beauty </strong>& More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionStyles;
