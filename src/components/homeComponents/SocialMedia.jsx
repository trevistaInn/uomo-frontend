import styles from "./SocialMedia.module.css";

export default function SocialMedia() {
  return (
    <div className={styles.socialbar}>
      <div className={styles.icons}>
        <a href="https://www.facebook.com">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.twitter.com">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://www.youtube.com/">
          <i className="fa-brands fa-youtube"></i>
        </a>
      </div>

      <span className={styles.text}>FOLLOW US</span>
    </div>
  );
}
