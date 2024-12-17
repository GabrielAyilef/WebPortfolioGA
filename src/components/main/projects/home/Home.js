import React, { useRef, useEffect } from "react";
import "./home.css";
import { useSlider } from "../Context/SliderContext";
import { Link } from "react-router-dom";
import { useLayout } from "../Context/Layout";
import { useMobile } from "../Context/Mobile";
import { useDarkMode } from "../Context/DarkMode";

function scrollToSection() {
  setTimeout(() => {
    const section = document.getElementById("project");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 100);
}
function Home() {
  const classes = useSlider();
  const { updateContextLayout, projects } = useLayout();
  const { isMobile } = useMobile();
  const homeRef = useRef(null);
  const { darkPortfolio } = useDarkMode();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (homeRef.current && entry.isIntersecting) {
          homeRef.current.classList.add("visible");
        } else if (homeRef.current) {
          homeRef.current.classList.remove("visible");
        }
      },
      { threshold: 0.2 }
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
    };
  }, []);

  function handleClick(layout) {
    updateContextLayout(layout);
  }

  return (
    <div className={`home ${darkPortfolio ? "dark" : ""}`}>
      <div className="project-text" ref={homeRef}>
        <h1 className="title">Yoga App Project</h1>
        {isMobile ? (
          <p className="project-description ">
            You can explore <span> 3 different demo sections</span> right here,
            or access the <span>Full App</span> on your device for the complete
            experience.
          </p>
        ) : (
          <p className="project-description ">
            {" "}
            You can explore <span>3 different demo sections</span> right here,
            in both mobile and desktop modes, or access the{" "}
            <span>Full App</span> on your device for the complete experience.
          </p>
        )}
      </div>
      {projects.map((item) => {
        if (item.type === "link") {
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-container"
            >
              <h3 className="project-home-title">{item.title}</h3>
              {item.component}
              {/* <span className="buttons-layout">Explore it on your device</span> */}
            </a>
          );
        }
        // Aquí comienza el bloque else
        return isMobile ? (
          <Link
            key={item.name}
            to={item.path}
            state={
              item.name === "slider"
                ? { layout: "mobile", classes }
                : { layout: "mobile" }
            }
            onClick={() => {
              handleClick("mobile"); // La acción que ya tienes
              scrollToSection(); // Llamada a la nueva función scrollToSection
            }}
            className="project-container"
          >
            <h3 className="project-home-title">{item.title}</h3>
            {item.component}
          </Link>
        ) : (
          <div key={item.name} className="project-container">
            {item.component}
            <h3 className="project-home-title">{item.title}</h3>
            <div className="buttons-layout">
              <Link
                to={item.path}
                className="link-sidebar-desktop"
                state={
                  item.name === "slider"
                    ? { layout: "desktop", classes }
                    : { layout: "desktop" }
                }
                onClick={() => {
                  handleClick("desktop");
                  scrollToSection();
                }}
              >
                <i className="bx bx-desktop"></i>
              </Link>
              <Link
                to={item.path}
                state={
                  item.name === "slider"
                    ? { layout: "mobile", classes }
                    : { layout: "mobile" }
                }
                onClick={() => {
                  handleClick("mobile");
                  scrollToSection();
                }}
              >
                <i className="bx bx-mobile"></i>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
