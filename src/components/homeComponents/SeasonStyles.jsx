import { Link } from "react-router-dom";
import styles from "./SeasonStyles.module.css";
import useHomeProducts from "../../apis/homeProducts";
import { useContext, useEffect, useRef, useState } from "react";
import { StylesContext } from "../../contexts/StylesContext";

const SLIDE_TRANSITION_MS = 800;

export default function SeasonStyles({ season }) {
  const { data } = useHomeProducts()
  const slides = season === "Summer" ? data?.categories || [] : data?.winterstyles || [];
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const resetTimerRef = useRef(null);

  const hasMany = slides.length > 1;

  const [position, setPosition] = useState(1);
  const [resetAutoplayTimer, setResetAutoplayTimer] = useState(false);
  const [noTransition, setNoTransition] = useState(false);

  const extendedSlides = hasMany
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : [...slides];
  const firstSlidePosition = hasMany ? 1 : 0;
  const lastSlidePosition = hasMany ? slides.length : 0;
  const firstClonePosition = hasMany ? extendedSlides.length - 1 : 0;
  const lastClonePosition = 0;

  useEffect(() => {
    setPosition(firstSlidePosition);
  }, [season, slides.length, firstSlidePosition]);

  useEffect(() => {
    if (!noTransition) return undefined;

    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        setNoTransition(false);
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [noTransition]);

  const handleDotClick = (slideIndex) => {
    setPosition(hasMany ? slideIndex + 1 : 0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setResetAutoplayTimer(true);
  };

  useEffect(() => {
    if (!hasMany || slides.length === 0) return undefined;

    if (resetAutoplayTimer) {
      return undefined;
    }

    function next() {
      setPosition((p) => Math.min(p + 1, firstClonePosition));
    }

    intervalRef.current = setInterval(next, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasMany, slides.length, resetAutoplayTimer, firstClonePosition]);

  useEffect(() => {
    if (!resetAutoplayTimer) return;

    const pauseTimer = setTimeout(() => {
      setResetAutoplayTimer(false);
    }, 5000);

    return () => clearTimeout(pauseTimer);
  }, [resetAutoplayTimer]);

  const resetClonedSlide = () => {
    if (!hasMany) return;
    clearTimeout(resetTimerRef.current);

    if (position === extendedSlides.length - 1) {
      setNoTransition(true);
      setPosition(firstSlidePosition);
    } else if (position === lastClonePosition) {
      setNoTransition(true);
      setPosition(lastSlidePosition);
    }
  };

  useEffect(() => {
    if (
      !hasMany ||
      (position !== firstClonePosition && position !== lastClonePosition)
    ) {
      return undefined;
    }

    resetTimerRef.current = setTimeout(resetClonedSlide, SLIDE_TRANSITION_MS + 100);

    return () => clearTimeout(resetTimerRef.current);
  }, [hasMany, position, firstClonePosition, lastClonePosition]);

  const handleTransitionEnd = (e) => {
    if (!hasMany || e.target !== sliderRef.current) return;

    resetClonedSlide();
  };

  const goPrev = () => {
    setPosition((p) => Math.max(p - 1, lastClonePosition));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setResetAutoplayTimer(true);
  };

  const goNext = () => {
    setPosition((p) => Math.min(p + 1, firstClonePosition));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setResetAutoplayTimer(true);
  };

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  if (!slides.length) return null;

  const actualIndex = hasMany
    ? (position - 1 + slides.length) % slides.length
    : 0;
  const currentSlide = slides[actualIndex];

  const translatePercent = hasMany ? position * 100 : 0;

  const content = (
    <div
      className={`${styles.slider} ${season !== "Summer" ? styles.small  : ""} `}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      <div
        ref={sliderRef}
        className={styles.sliderInner}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${translatePercent}%)`,
          transition: noTransition
            ? "none"
            : "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {extendedSlides.map((style, i) => (
          <div className={styles.slide} key={`${style.id || style.image}-${i}`}>
            <img
              src={style.image}
              alt={style.style || style.category || `Slide ${i + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.season}>
        {season === "Summer" ? (
          <>
          <div className={styles.seasonLabel}>
            <hr className={styles.seasonDivider} />
            <span>NEW TREND</span>
          </div>
            <p>{`${currentSlide?.style || ""}`}</p>
              <strong>{`${currentSlide?.category || ""}`}</strong>
              <br></br>
              <Link to="/category/men">
                <button className={styles.button}>DISCOVER MORE</button>
              </Link>
          </>
        ) : (
          <>
            <div className={styles.seasonLabel}>
              <hr className={styles.seasonDivider} />
              <span>DEAL OF THE WEEK</span>
            </div>

            <p>
              <b>SPRING</b> COLLECTION
            </p>
            <p>{`${currentSlide?.category || ""}`}</p>
            <Link to={`${currentSlide?.path || ""}`}>
              <button className={styles.span}>SHOP NOW</button>
            </Link>
          </>
        )}
      </div>

      <button onClick={goPrev} className={styles.prevButton} type="button" />
      <button onClick={goNext} className={styles.nextButton} type="button" />
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={
              i === actualIndex
                ? `${styles.dot} ${styles.activeDot}`
                : styles.dot
            }
            onClick={() => handleDotClick(i)}
            type="button"
          />
        ))}
      </div>
    </div>
  );

  return content;
}


