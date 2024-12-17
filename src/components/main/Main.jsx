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
        <div className={`${className} ${darkPortfolio ? "dark" : ""} ${isMobile ? "mobile" : ""}`}>
          <div className={` project-wrapper-scale ${isMobile ? "mobile" : ""}`}>
            <Profile />
            <About />
            <div id="project">
              <Outlet />
            </div>
            <Contact />
            <Footer />
        </div>
        {isMobile && (
        <div className="mobile-overlay" />
      )}
        </div>
       );
}

export default Main
