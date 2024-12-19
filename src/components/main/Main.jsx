import React, { useState, useEffect } from 'react'
import "./main.css"
import Profile from './profile/Profile'
import About from './about/About'
import Contact from './contact/Contact'
import Footer from "./footer/Footer"
import { Outlet } from "react-router-dom";
import { useDarkMode } from './projects/Context/DarkMode'
import { useMobile } from "./projects/Context/Mobile"




function Main({ className, isCollapsed }) {
  const { darkPortfolio } = useDarkMode()
  const { isMobile } = useMobile()
  const [pointerEvents, setPointerEvents] = useState("auto")
  
  
  useEffect(() => {
    if (isMobile) {  
      const timeout = setTimeout(() => {
        setPointerEvents(isCollapsed ? 'auto' : 'none');
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isCollapsed, isMobile]);
    
return (
      <div
      className={`${className} ${darkPortfolio ? "dark" : ""}`}
      style={isMobile ? { pointerEvents } : {}} 
      >
        {isMobile && <div className="blur-overlay"></div> }
          <div className="project-wrapper-scale" >
              <Profile />
              <About />
              <div id="project">
                <Outlet />
              </div>
              <Contact />
              <Footer />
          </div>
      </div>
    );
}

export default Main

