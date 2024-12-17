import React, { useRef, useEffect, useState } from "react";
import tools from "../../../../assets/tools.png";
import toolsdark from "../../../../assets/toolsdark.png";
import logo from "../../../../assets/logo.jpg";
import logodark from "../../../../assets/logodark.jpg";
import "./headerBar.css";
import Toggle from "./Toggle";
import { useDarkMode } from "../Context/DarkMode";
import { useAudio } from "../Context/MusicPlayer";
import { useLayout } from "../Context/Layout";

function HeaderBar({ handleModal }) {
  const { darkProject, toggleDarkProject } = useDarkMode();
  const { isPlaying, handleMusicToggle } = useAudio();
  const { desktop } = useLayout();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(); //null?
  const iconRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        e.target !== iconRef.current
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  function handleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <nav
      className={`headerbar-container ${darkProject ? "dark" : ""} ${
        desktop ? "desktop" : ""
      }`}
    >
      <div>
        <img
          src={darkProject ? logodark : logo}
          alt="Logo"
          className="icon-logo-home shrink"
          onClick={handleModal}
        />
      </div>
      <div className="headerbar-settings">
        <img
          src={darkProject ? toolsdark : tools}
          ref={iconRef}
          onClick={handleOpen}
          alt="Settings"
        />
        {isOpen && (
          <div className="tools-dropdown" ref={menuRef}>
            <ul>
              <li className="toggle-container">
                <span>Dark Mode</span>
                <Toggle
                  className="toggle"
                  checked={darkProject}
                  onChange={toggleDarkProject}
                />
              </li>
              <li className="toggle-container">
                <span>Music</span>
                <Toggle
                  className="toggle"
                  checked={isPlaying}
                  onChange={handleMusicToggle}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default HeaderBar;
