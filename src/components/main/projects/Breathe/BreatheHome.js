import React, { useRef, useEffect } from "react";
import "./breatheHome.css";

function CircleQuarter() {
  const sectionRef = useRef(null);
  const pointerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (sectionRef.current) {
            sectionRef.current.classList.add("grow-home");
          }
          if (pointerRef.current) {
            pointerRef.current.classList.add("grow-home");
          }
        } else {
          if (sectionRef.current) {
            sectionRef.current.classList.remove("grow-home");
          }
          if (pointerRef.current) {
            pointerRef.current.classList.remove("grow-home");
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div className="body-breath-home">
      <div className="body-breath-home">
        <div className="container-breathe-home" ref={sectionRef}>
          <div className="circle-home"></div>
          <p className="breathe-home-text">Breath In</p>
          <div className="pointer-container-home" ref={pointerRef}>
            <div className="pointer-wrapper-home">
              <span className="pointer-home"></span>
            </div>
          </div>
          <div className="gradient-circle-home"></div>
        </div>
      </div>
    </div>
  );
}

export default CircleQuarter;
