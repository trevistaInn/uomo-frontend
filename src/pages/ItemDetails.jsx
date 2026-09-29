import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ItemDetails.module.css";
import BlackButton from "../reusedComponents/BlackButton";
import { StylesContext } from "../contexts/StylesContext";
import useCartStore from "../stores/cartItemsStore";
import useWishlistStore from "../stores/wishlistStore";
import { FaHeart } from "react-icons/fa";
import { saveCart } from "../apis/cartApis";
import { saveWishlist } from "../apis/wishlist";

const detailsRows = [
  { label: 'SKU', value: 'UOM-7784' },
  { label: 'Categories', value: 'Men, Jackets, New Arrivals' },
  { label: 'Tags', value: 'Hoodie, Lightweight, Winter' },
  { label: 'Designer', value: 'Trevista Studio' },
]

const reviews = [
  {
    name: 'John White',
    rating: 5,
    text: 'Looks exactly as pictured. The fabric is lightweight but still holds shape very well.'
  },
  {
    name: 'Sophia Rose',
    rating: 4,
    text: 'Great fit and very comfortable. I would size up if you plan to wear layers underneath.'
  },
]

  
function Stars({ count = 0 }) {
  return (
    <span className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {'\u2605'.repeat(count)}
      {'\u2606'.repeat(5 - count)}
    </span>
  )
}

function PlaceholderArt({ small = false }) {
  return (
    <div className={small ? styles.thumbArt : styles.mainArt}>
      <span className={styles.shapeCircle} />
      <span className={styles.shapeTriangle} />
      <span className={styles.shapeSmallCircle} />
    </div>
  )
}

function getImageSrc(imagePath = "") {
  if (!imagePath) return "";
  return imagePath.startsWith("./") ? imagePath.slice(1) : imagePath;
}


export default function ItemDetails() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const deleteFromWishlist = useWishlistStore((state) => state.deleteFromWishlist);
  const addItemsToWishlist = useWishlistStore((state) => state.addItemsToWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const { allData, currentUser, togglePanel } = useContext(StylesContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const item = useMemo(() => {
    if (location.state?._id) return location.state;

    return allData.find((product) => String(product._id) === String(_id)) ?? {};
  }, [allData, _id, location.state]);

  const isWishlisted = wishlist.some((wishlistItem) => wishlistItem._id === item._id);

  const galleryImages = useMemo(() => {
    if (Array.isArray(item.images) && item.images.length > 0) return item.images;
    if (item.image) return [item.image];
    return [];
  }, [item.image, item.images]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [item._id, galleryImages.length]);

  const hasGalleryImages = galleryImages.length > 0;

  function handlePrevImage() {
    if (galleryImages.length <= 1) return;
    setSelectedIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  }

  function handleNextImage() {
    if (galleryImages.length <= 1) return;
    setSelectedIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  }

  const relatedProducts = allData.filter((product) => {return product.style === item.style && product._id !== item._id});

  useEffect(() => {
    if (!currentUser) return;

    saveWishlist(currentUser.accessToken, wishlist);
  }, [wishlist]);

  if (!item._id && allData.length === 0) {
    return (
      <div className={styles.page}>
        <main className={styles.content}>Loading...</main>
      </div>
    );
  }

  if (!item._id) {
    return (
      <div className={styles.page}>
        <main className={styles.content}>
          <p>Product details are unavailable for this URL.</p>
          <button type="button" onClick={() => navigate(-1)}>
            Go back
          </button>
        </main>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (item.quantity <= 0){
      setErrorMessage("This product is out of stock");
      return;
    }

    if (!selectedSize || !selectedColor) {
      setErrorMessage("Please select a size and color.");
      return;
    }

    if(!currentUser) {
      togglePanel("login");
      setErrorMessage("");
      return;
    }

    setErrorMessage("");

    addToCart({
      ...item,
      selectedSize,
      selectedColor,
    })

    if (currentUser) {
      const updatedCart = useCartStore.getState().cartItems;
      await saveCart(currentUser.accessToken, updatedCart);
    };
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((wishlistItem) => wishlistItem._id === product._id);
    if (exists) {
      deleteFromWishlist(product._id);
    } else {
      addItemsToWishlist(product);
    }
  }

  return (
    <div className={styles.page}>
          <main className={styles.content}>
            <section className={styles.productSection}>
              <div className={styles.gallery}>
                <div className={styles.thumbs}>
                  {hasGalleryImages ? (
                    galleryImages.map((image, index) => (
                      <button
                        key={index}
                        className={`${styles.thumb} ${
                          index === selectedIndex ? styles.thumbActive : ""
                        }`}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <img
                          src={getImageSrc(image)}
                          alt={`${item.style ?? "Product"} thumbnail ${index + 1}`}
                          className={styles.thumbImage}
                          loading="eager"
                          decoding="async"
                        />
                      </button>
                    ))
                  ) : (
                    <button className={styles.thumb} aria-label="No image available">
                      <PlaceholderArt small />
                    </button>
                  )}
                </div>
                <div className={styles.mainImage}>
                  <button className={styles.wishlistButton}
                   onClick={() => toggleWishlist(item)}>
                    <FaHeart color={isWishlisted ? "red" : "white"} />
                  </button>
                  {hasGalleryImages ? (
                    <div
                      className={styles.sliderTrack}
                      style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                    >
                      {galleryImages.map((image, index) => (
                        <img
                          key={`${image}-main-${index}`}
                          src={getImageSrc(image)}
                          alt={`${item.style ?? "Product"} image ${index + 1}`}
                          className={styles.mainProductImage}
                          loading="eager"
                          decoding="async"
                        />
                      ))}
                    </div>
                  ) : (
                    <PlaceholderArt />
                  )}
                  <button
                    className={styles.imageArrowLeft}
                    aria-label="Previous image"
                    onClick={handlePrevImage}
                    disabled={galleryImages.length <= 1}
                  >
                    &lt;
                  </button>
                  <button
                    className={styles.imageArrowRight}
                    aria-label="Next image"
                    onClick={handleNextImage}
                    disabled={galleryImages.length <= 1}
                  >
                    &gt;
                  </button>
                </div>
              </div>
    
              <div className={styles.productDetails}>
                <p className={styles.breadcrumbs}>{item?.gender} / {item.brand} / {item.style}</p>
                <h1 className={styles.title}>{item.type}</h1>
                <p className={styles.price}>${item.price}</p>
                <p className={styles.summary}>
                  A versatile puffer built for transitional weather with soft insulation, light shell fabric, and a clean silhouette.
                </p>

                <div className={styles.sizes1}>
                  <p className={styles.sizeHeading}>Sizes</p>

                  <div className={styles.sizes2}>
                  <div className={styles.sizeContainer} >
                    {item.size.map((size) => ( <button key={size} onClick={() => setSelectedSize(size)} 
                    className={styles.sizes3}
                   style={{backgroundColor: selectedSize === size ? "black" : "transparent", color: selectedSize === size ? "white" : "black"}} >
                    {size}
                    </button>))}
                  </div>
                  <div>
                  <p className={styles.sizeGudide} onClick={() => setShowSizeGuide(!showSizeGuide)}>
                    SIZE GUIDE 
                  </p> <hr className={styles.sizeHr}/>
                  </div>
                  </div>
                </div>
                <br />
                <div className={styles.color1}>
                  <p className={styles.colorHeading}>Colors</p>
                <div className={styles.color2}>
                 {item.color.map((color) => (
                  <button key={color} title={color} onClick={() => setSelectedColor(color)}
                  className={styles.color3} 
                  style={{backgroundColor:color.toLowerCase(), 
                    border: selectedColor === color ? "2px solid black" : "2px solid #ccc"}}>
                    </button>
                 ))}</div>
                </div> <br />
                <div>
                  <p className={styles.stockStatus}>{item.quantity > 0
                    ? "In Stock" : "Out of Stock"
                    }</p>
                </div>
                <div className={styles.buyRow}>      
                  <BlackButton text={item.quantity > 0 ? "Add to Cart" : "Out of Stock"} disabled={item.quantity === 0} onClick={handleAddToCart}>Add to Cart</BlackButton>
                </div>                                    
                {errorMessage && ( <p className={styles.errorMessage}>{errorMessage}</p> )}
                <div className={styles.meta}>
                  <p>
                    <strong>SKU:</strong> UOM-7784
                  </p>
                  <p>
                    <strong>Category:</strong> {item.gender}, {item.brand}
                  </p>
                  <p>
                    <strong>Tags:</strong> Hooded, Lightweight, New
                  </p>
                </div>
              </div>
            </section>
    
            <section className={styles.tabsSection}>      
              <div className={styles.tabs}>                   
                <p className={styles.tabActive}>Description</p>
              </div>    
              <div className={styles.description}>        
                <h2>Light and weather-ready made for movement</h2>
                <p>
                  Designed for city commutes and weekend travel, this jacket uses high-loft insulation with a breathable shell and adjustable hood.
                  The finish is matte and minimal, giving it an elevated everyday look.
                </p>
                <div className={styles.bullets}>
                  <div>
                    <h3>Why you will love it</h3>
                    <ul>
                      <li>Soft lightweight shell</li>
                      <li>Insulated core without bulk</li>
                      <li>Hidden zip hand pockets</li>
                    </ul>
                  </div>     
                  <div>
                    <h3>Fabric and care</h3>  
                    <ul>
                      <li>Shell: 100% nylon</li> 
                      <li>Lining: 100% polyester</li>
                      <li>Machine wash cold, tumble dry low</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
    
            <section className={styles.infoSection}>
              <p className={styles.tabActive}>Additional Information</p>
              <div className={styles.infoTable}>
                {detailsRows.map((row) => (
                  <div className={styles.infoRow} key={row.label}>
                    <span>{row.label}</span>                           
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            </section>
    
            <section className={styles.reviewSection}>
              <p className={styles.tabActive}>Reviews</p>
              <div className={styles.reviews}> 
                {reviews.map((review) => (
                  <article key={review.name} className={styles.reviewCard}>
                    <div className={styles.avatar}>{review.name.charAt(0)}</div>
                    <div>      
                      <h3>{review.name}</h3>
                      <Stars count={review.rating} />
                      <p>{review.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
    
            <section className={styles.relatedSection}>
              <h2 className={styles.relatedProducts1}>Related Products</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts?.map((item) => (
                  <article key={item._id} className={styles.relatedCard}>
                    <button className={styles.relatedItems} 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}>
                     <FaHeart color={wishlist.some((wishlistedItem) => wishlistedItem._id === item._id) ? "red" : "white"}/> </button>
                    <img src={item.image} alt={item.style} />
                    <h3>{item.style}</h3>
                    <p>{item.description}</p>
                    <p className={styles.itemPrice}>
                    ${item.price}</p>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
  );
}
