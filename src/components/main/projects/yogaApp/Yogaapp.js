import "./yogaapp.css";
import mobile from "../../../../assets/blanco.PNG";
import { useRef, useEffect } from "react";

function Yogaapp() {
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
    <div className="yogaapp-img" ref={sectionRef}>
      <img src={mobile} alt="mobile device" className="project-overlay" />
      <div className="animated-text">
        <span>Explore it</span>
        <span>on your</span>
        <span>device</span>
      </div>
    </div>
  );
}

export default Yogaapp;
