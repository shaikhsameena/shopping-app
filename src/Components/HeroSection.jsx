import React, { useEffect, useMemo, useState } from "react";
import img1 from "../assets/s1.jpg";
import img2 from "../assets/s2.jpg";
import img3 from "../assets/s3.jpg";
import "./HeroSection.css";

const SLIDE_MS = 3000;   
const ANIM_MS  = 600;    

const HeroSection = () => {
 
  const baseImages = useMemo(() => [img1, img2, img3], []);
  
  const slides = useMemo(
    () => [baseImages[baseImages.length - 1], ...baseImages, baseImages[0]],
    [baseImages]
  );

  const [index, setIndex] = useState(1);     
  const [instant, setInstant] = useState(false); 

 
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  
  const onTransitionEnd = () => {
    if (index === slides.length - 1) {
      
      setInstant(true);
      setIndex(1);
      setTimeout(() => setInstant(false), 20);
    } else if (index === 0) {
      
      setInstant(true);
      setIndex(slides.length - 2);
      setTimeout(() => setInstant(false), 20);
    }
  };

  return (
    <section className="hero-section">
      <div
        className={`hero-slider ${instant ? "no-transition" : ""}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((src, i) => (
          <img key={i} src={src} alt={`Hero ${i + 1}`} className="hero-image" />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
