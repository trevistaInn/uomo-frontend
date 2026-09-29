import SeasonStyles from "../components/homeComponents/SeasonStyles";
import CollectionStyles from "../components/homeComponents/CollectionStyles";
import TrendyLimited from "../components/homeComponents/TrendyLimited";
import WinterStyles from "../components/homeComponents/WinterStyles";
import Uomo from "../components/homeComponents/Uomo";
import Services from "../components/homeComponents/Services";
import SocialMedia from "../components/homeComponents/SocialMedia";
import styles from "./Home.module.css";
import useHomeProducts from "../apis/homeProducts";

export default function Home() {
  const { data, error, isLoading } = useHomeProducts();
  return (
    <div className={styles.page}>
      <div className={styles.centerWrapper}>
        <div className="homecontainer">
          {isLoading ? "Loading..." : error ? "An error occurred while fetching products." : 
            <>
              <div className={styles.firstSeason}>
                <SeasonStyles season="Summer" />
                <SocialMedia />
              </div>

              <CollectionStyles />

              <TrendyLimited style="trendyProducts" products={data?.trendyProducts} />

              <SeasonStyles season="Winter" />

              <WinterStyles />

              <TrendyLimited products={data?.limitedEditionProducts} />

              <Uomo products={data?.uomoProducts} />

              <Services />
            </>
          }
        </div>
      </div>
    </div>
  );
}
