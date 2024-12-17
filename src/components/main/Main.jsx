import React from 'react'
import "./main.css"
import Profile from './profile/Profile'
import About from './about/About'
import Contact from './contact/Contact'
import Footer from "./footer/Footer"
import { Outlet } from "react-router-dom";
import { useDarkMode } from './projects/Context/DarkMode'
import { useMobile } from './projects/Context/Mobile'


function Main({ className }) {
    const { darkPortfolio } = useDarkMode()
    const {isMobile} = useMobile()

  function handleClick(e) {
    if (isMobile) {

      e.stopPropagation();
    }
}
 
   
    return (
        isMobile ? (
        <div className={`${className} ${darkPortfolio ? "dark" : ""}`}
        onClick={isMobile ? handleClick : null} 
        >
            <Profile />
            <About />
            <div id="project">
              <Outlet />
            </div>
            <Contact />
            <Footer />
          </div>
        ) : (
          <div className={`${className} ${darkPortfolio ? "dark" : ""}`}>
            <div className="project-wrapper-scale">
              <Profile />
              <About />
              <div id="project">
                <Outlet />
              </div>
              <Contact />
              <Footer />
            </div>
          </div>
        )
      );
}

export default Main
