import React, { useState, useEffect, useRef } from "react";
import "./projectWrapper.css";
import { useLayout } from "../Context/Layout";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useMobile } from "../Context/Mobile";
import home from "../../../../assets/homeproject.png";
import info from "../../../../assets/infoproject.png";
import laptop from "../../../../assets/desktop-monitor.png";
import mobile from "../../../../assets/smartphone.png";
import close from "../../../../assets/exit.png";
import homemobile from "../../../../assets/gridmobile.png";
import infomobile from "../../../../assets/infomobile.png";
import { useDarkMode } from "../Context/DarkMode";

function ProjectWrapper() {
  const { projects, updateContextLayout, desktop, isCollapsed } = useLayout();
  const { isMobile } = useMobile();
  const { darkPortfolio } = useDarkMode();
  const [isModal, setIsModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const { pathname } = useLocation();
  const [currentTitle, setCurrentTitle] = useState("");

  const currentProject = projects.find((project) =>
    project.paths?.some((pathStart) => pathname.startsWith(pathStart))
  );
  const titleSpan = currentProject.titleArray.map((word, index) => (
    <span key={index}>{word}</span>
  ));
  useEffect(() => {
    if (currentProject) {
      setCurrentTitle(currentProject.title);
    }
  }, [currentProject]);

  function handleClick(layout) {
    updateContextLayout(layout);
  }

  function handleModal() {
    setIsModal((prev) => !prev);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      isCollapsed && setShowBubble(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isCollapsed]);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 1200);
    return () => clearTimeout(timeout);
  }, [currentTitle, desktop]);

  return (
    <div
      className={`project-wrapper ${desktop ? "desktop" : ""} ${
        darkPortfolio ? "dark" : ""
      }`}
    >
      {isMobile ? (
        <div className="wrapper-outlet-mobile">
          <div
            className={`bubble ${showBubble ? "show-bubble" : ""}`}
            onClick={() => setShowBubble((prev) => !prev)}
          >
            <button>
              <Link to="/">
                <img src={homemobile} alt="home" />
              </Link>
            </button>
            <div className="mobile-title">{titleSpan}</div>
            <button onClick={handleModal}>
              <img src={infomobile} alt="info" />
            </button>
          </div>
          <div
            className={`project-outlet-mobile ${showBubble ? "shrink" : ""}`}
          >
            <Outlet />
          </div>
        </div>
      ) : (
        <>
          <div className="project-wrapper-buttons">
            <button>
              <Link to="/">
                <img src={home} alt="home" />
              </Link>
            </button>
            <button onClick={() => handleClick("desktop")}>
              <img src={laptop} alt="laptop" />
            </button>
            <button onClick={() => handleClick("mobile")}>
              <img src={mobile} alt="mobile" />
            </button>
            <button onClick={handleModal}>
              <img src={info} alt="info" />
            </button>
          </div>
          <div className={`project-title ${isAnimating ? "animating" : ""}`}>
            {titleSpan}
          </div>
          <div className="project-frame">
            <div className="project-outlet">
              <Outlet />
            </div>
          </div>
        </>
      )}

      {isModal && (
        <div className="modal-project-content">
          <img
            className="close"
            onClick={handleModal}
            src={close}
            alt="close message"
          />
          <p>{currentProject.legend}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectWrapper;
