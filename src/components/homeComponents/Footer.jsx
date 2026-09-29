import styles from "./Footer.module.css";
import { SlArrowUp } from "react-icons/sl";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer style={{backgroundColor: '#D3D3D3'}}>
      <div className={styles.footer}>
      <div className={styles.contactBlock}>
        <img  src="/temp/logo.svg" alt="Eastside" />
        <p>1418 River Drive, Suite 35 Cottonhall, CA 9622 <br /> United States </p>
        <p>sale@uomo.com <br /> +1 246-345-0695 </p>
        <div className={styles.span}>
          <a href="https://www.facebook.com">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter />
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
      </div>

      <div className={styles.companyBlock}>
        <p className={styles.title}><b>COMPANY</b></p>
        <p>About Us</p>
        <p>Career</p> 
        <p>Affiliates</p>
        <p>Blog</p>
        <p>Contact Us</p>
      </div>

      <div className={styles.shopBlock}>
        <p className={styles.title}><b>SHOP</b></p>
        <p>New Arrivals</p>
        <p>Accessories</p>
        <p>Men</p>
        <p>Women</p>
        <p>Shop All</p>
      </div>

      <div className={styles.helpBlock}>
        <p className={styles.title}><b>HELP</b></p>
        <p>Customer Service</p>
        <p>My Account</p>
        <p>Find a Store</p>
        <p>Legal & Privacy</p>
        <p>Contact</p>
        <p>Gift Card</p>
      </div>

      <div className={styles.subscribeBlock}>
        <p className={styles.title}><b>SUBSCRIBE</b></p>
        <p>Be the first to get latest news about trends,promotions and more!</p>
        <form className={styles.sub1}>
          <input
            type="text"
            placeholder="Enter your email"
            className={styles.sub2}/>
          <button className={styles.sub3}>
            Join
          </button>
        </form>

        <p>Secure Payments</p>
        <div className={`flex align-center gap-10 ${styles.paymentRow}`}>
          <span className={styles.disc}> DISC <span style={{color: "orange"}}> O </span> VER </span>
          <img src="/footer/mastercard.png" alt="Mastercard"  className={styles.mastercard}/>
          <img src="/footer/paypal.png" alt="PayPal" className={styles.paypal}/>
          <span className={styles.skrill}>Skrill</span>
          <img src="/footer/visa.png" alt="Visa" className={styles.visa}/>
        </div>
      </div>
      </div>
      <hr className={styles.hrLine}/>

      <div className={styles.bottomRow}>
              <p className={styles.copy}>@2020 Uomo</p>
              <div className={styles.localeRow}>
                <span className={styles.label}>Language</span>
                <button type="button" className={styles.inlineSelect}>
                  United Kingdom | English
                </button>
                <SlArrowUp style={{cursor:"pointer"}} />
                <span className={styles.label}>Currency</span>
                <button type="button" className={styles.inlineSelect}>
                  $ USD 
                </button>
                <SlArrowUp style={{cursor:"pointer"}} />
              </div>
            </div>
    </footer>
  );
}

export default Footer;