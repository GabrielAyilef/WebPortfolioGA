import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import HeaderBar from "../HeaderBar/HeaderBar";
import { Outlet, Link } from "react-router-dom";
import "./sharedLayout.css";
import close from "../../../../assets/exit.png";
import home from "../../../../assets/homeproject.png";
import { useDarkMode } from "../Context/DarkMode";
import { useLayout } from "../Context/Layout";
import { useMobile } from "../Context/Mobile";

function SharedLayout() {
  const { darkProject } = useDarkMode();
  const { desktop } = useLayout();
  const { isMobile } = useMobile();
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(true);
  }

  return (
    <div
      id="wrapper"
      className={`sharedLayout ${darkProject ? "dark" : ""} ${
        desktop ? "desktop" : ""
      }`}
    >
      {desktop ? (
        <>
          <div className="container-bars">
            <HeaderBar handleModal={handleModal} />
            <NavBar handleModal={handleModal} />
          </div>
          <Outlet />
        </>
      ) : (
        <>
          <HeaderBar handleModal={handleModal} />
          <Outlet />
          <NavBar handleModal={handleModal} />
        </>
      )}
      {showModal && (
        <div className="modal-layout-content">
          <img
            className="close"
            onClick={() => setShowModal(false)}
            src={close}
            alt="close message"
          />
          {isMobile ? (
            <p>
              Some features are disabled in the demo version. You can access the
              full Yoga App from the{" "}
              <Link to="/">
                <img src={home} className="modal-icon" alt="Home icon" />
              </Link>{" "}
              page.
            </p>
          ) : (
            <p>
              Some features are disabled in the demo version. They fade when you
              hover over them. You can access the full Yoga App from the{" "}
              <Link to="/">
                <img src={home} className="modal-icon" alt="Home icon" />
              </Link>{" "}
              page.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SharedLayout;
