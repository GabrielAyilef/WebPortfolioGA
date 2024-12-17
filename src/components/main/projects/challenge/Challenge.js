import React, { useRef, useEffect } from "react";
import play from "../../../../assets/challengetablet.PNG";
import "./challenge.css";

function Challenge() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (sectionRef.current && entry.isIntersecting) {
          sectionRef.current.classList.add("visible");
        } else if (sectionRef.current) {
          sectionRef.current.classList.remove("visible");
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
    <div className="container-challenge">
      <div className="challenge-background">
        <div className="img-challenge-container" ref={sectionRef}>
          <img src={play} alt="Yoga Challenge" />
        </div>
      </div>
    </div>
  );
}

export default Challenge;
