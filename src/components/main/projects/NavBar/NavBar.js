import { useState, useRef, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import asana from "../../../../assets/asana.png";
import book from "../../../../assets/book.png";
import home from "../../../../assets/home.png";
import account from "../../../../assets/account.png";
import asanadark from "../../../../assets/asanadark.png";
import bookdark from "../../../../assets/bookdark.png";
import homedark from "../../../../assets/homedark.png";
import accountdark from "../../../../assets/accountdark.png";
import { useDarkMode } from "../Context/DarkMode";
import { useSlider } from "../Context/SliderContext";
import { useLayout } from "../Context/Layout";

function NavBar({ handleModal }) {
  const classes = useSlider();
  const [isOpenLessons, setIsOpenLessons] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { darkProject } = useDarkMode();
  const menuInfoRef = useRef(null);
  const menuLessonRef = useRef(null);
  const lessonRef = useRef(null);
  const infoRef = useRef(null);
  const { desktop } = useLayout();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpenLessons &&
        menuLessonRef.current &&
        !menuLessonRef.current.contains(e.target) &&
        e.target !== lessonRef.current
      ) {
        setIsOpenLessons(false);
      }
      if (
        isOpenInfo &&
        menuInfoRef.current &&
        !menuInfoRef.current.contains(e.target) &&
        e.target !== infoRef.current
      ) {
        setIsOpenInfo(false);
      }
    }
    if (isOpenInfo || isOpenLessons) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenInfo, isOpenLessons]);

  return (
    <div
      className={`NavBar ${darkProject ? "dark" : ""} ${
        desktop ? "desktop" : ""
      }`}
    >
      <div className="icons">
        <div
          className="icon-container icon-container-link icon-home shrink"
          onClick={handleModal}
        >
          <img
            src={darkProject ? homedark : home}
            className="icon shrink"
            alt="icon home"
          />
          <p>Home</p>
        </div>
        <div
          onClick={() => setIsOpenLessons(!isOpenLessons)}
          className="icon-container"
        >
          <img
            src={darkProject ? asanadark : asana}
            className="icon"
            alt="icon lessons"
            ref={lessonRef}
          />
          <p>Practice</p>
          {isOpenLessons && (
            <div ref={menuLessonRef} className="practice-dropdown">
              <ul>
                <li>
                  <Link to="/layout/slider/gallery" state={{ classes }}>
                    Classes
                  </Link>
                </li>
                <li>
                  <Link to="/layout/challengeGallery">Challenge</Link>
                </li>
                <li>
                  <Link to="/layout/breathe">Just breath</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          onClick={() => setIsOpenInfo(!isOpenInfo)}
          className="icon-container"
        >
          <div></div>
          <img
            src={darkProject ? bookdark : book}
            className="icon"
            alt="icon info"
            ref={infoRef}
          />
          <p>Info</p>
          {isOpenInfo && (
            <div ref={menuInfoRef} className="info-dropdown">
              <ul>
                <li>
                  <Link to="/layout/favorites">Favorites</Link>
                </li>
                <li className="link-shrink">
                  <Link
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleModal();
                    }}
                  >
                    Poses
                  </Link>
                </li>
                <li className="link-shrink">
                  <Link
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleModal();
                    }}
                  >
                    Program
                  </Link>
                </li>
                <li className="link-shrink">
                  <Link
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleModal();
                    }}
                  >
                    App Info
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="icon-container icon-container-link shrink"
          onClick={handleModal}
        >
          <img
            src={darkProject ? accountdark : account}
            alt="icon login"
            className="icon shrink"
          />
          <p>Log In</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
