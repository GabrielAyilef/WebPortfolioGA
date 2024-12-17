import React, { useState , useEffect, useRef} from 'react';
import pic from "../../assets/portfoliosidebar.png";
import "./sidebar.css";
import { Link } from 'react-router-dom';
import { useSlider } from "../main/projects/Context/SliderContext";
import { useLayout } from "../main/projects/Context/Layout";
import { useMobile } from "../main/projects/Context/Mobile"
import { useDarkMode } from '../main/projects/Context/DarkMode';
import abouticon from "../../assets/abouticon.png"
import contacticon from "../../assets/contacticon.png"
import yogaicon from "../../assets/grid.png"

const sections = ["profile", "about", "project", "contact"]

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth',
      block: 'start' });
  }
}

function Sidebar({ onSidebarToggle, className, isCollapsed }) {
  const { isMobile } = useMobile()
  const [isClose, setIsClose] = useState(isCollapsed);
  const [isDropdown, setIsDropdown] = useState(false);
  const [mouseState, setMouseState] = useState({});
  const classes = useSlider();
  const { updateContextLayout, projects } = useLayout();
  const sidebarRef = useRef(null)
  const [tooltip, setTooltip] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const { darkPortfolio, toggleDarkPortfolio } = useDarkMode()
  
// hovering each list element from dropdown appears the icons options
  

  function useActiveSection(sections, setActiveSection) {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.observe(element);
      });

      return () => {
        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) observer.unobserve(element);
        });
      };
    }, [sections, setActiveSection]);
  }
  useActiveSection(sections, setActiveSection);
  // mouse event listener for Dropdown
  function handleMouseEnter(item) {
    setMouseState((prevState) => ({ ...prevState, [item]: true }));
  }

  function handleMouseLeave(item) {
    setMouseState((prevState) => ({ ...prevState, [item]: false }));
  }
 

  function handleDropdown() {
    setIsDropdown(!isDropdown);
  }
  function handleDarkModeToggle() {
    toggleDarkPortfolio()
  }
  function handleLayout(layout) {
    updateContextLayout(layout);
  }

  /////////////////////////////////////////////
  function handleToggle() {
    const nextState = !isClose; 
    setIsClose(nextState);

    if (isDropdown) {
      setIsDropdown(false)
      setTimeout(() => {
        onSidebarToggle(nextState)
      }, 300)
    } else{
      onSidebarToggle(nextState)
    }
  }
/////////////////////////////////////////
 
  useEffect(() => {
    function handleClickOutside(e) {
      if (
       sidebarRef.current &&
        !sidebarRef.current.contains(e.target) 
      ) {
        
        handleToggle()
      }
    }

    if (isMobile && !isClose ) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClose]);

 // Hovering Sidebar
  useEffect(() => {
    if (!isClose || !sidebarRef.current) return;
  
    const sidebarElement = sidebarRef.current;
    
    function handleMouseEnter() {
      onSidebarToggle(false);
    }
  
    function handleMouseLeave() {
      if (isDropdown) {
        setIsDropdown(false);
        setTimeout(() => {
          onSidebarToggle(true);
        }, 300); 
      } else {
        onSidebarToggle(true);
      }
    }
  
    sidebarElement.addEventListener('mouseenter', handleMouseEnter);
    sidebarElement.addEventListener('mouseleave', handleMouseLeave);
  
    return () => {
      sidebarElement.removeEventListener('mouseenter', handleMouseEnter);
      sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClose, isDropdown]);
  




  return (
    <div className={`${className} ${darkPortfolio ? "dark" : ""}`} ref={sidebarRef}>
      <i className='bx bx-menu'
        onClick={handleToggle}
        {...(isClose && {
          onMouseEnter: () => setTooltip(true),
          onMouseLeave: () => setTooltip(false),
        })}
        // onMouseEnter={() => isClose && setTooltip(true)} 
        // onMouseLeave={() => isClose && setTooltip(false)} 
      ></i>
      <span className={`tooltip-menu ${isClose && !isCollapsed && tooltip && !isMobile ? "tooltip-active": ""}`}>keep Sidebar open</span>
      <div className="sidebar-header">
          <div className="user-img" onClick={() => scrollToSection('profile')}>
            <img src={pic} alt='Gabriel'/>
          </div>
          <span className={`user-name  ${activeSection === "profile" ? "active" : ""}`}>Gabriel Ayilef </span>
      </div>
      <ul className="list-container">
        <li className={`list-item  ${activeSection === "about" ? "active" : ""}`}
            onClick={() => scrollToSection('about')}>
          <img  src={abouticon} alt='about' />
          <span>About</span>  
        </li>
        <li  className={`list-item-dropdown  ${activeSection === "project" ? "active" : ""}`}>
          <div className='project' onClick={handleDropdown}>
              <Link to={"/"}  className='link-dropdown'  onClick={() => scrollToSection('project')}>
                <img src={yogaicon} alt='yoga app'/>
                <span>Yoga App Project</span>
              </Link>
              <i className={`bx bx-chevron-down ${isDropdown ? 'rotate' : ''}`}></i>
          </div>
          <ul className={`sidebar-dropdown ${isDropdown ? 'sidebar-open' : ''}`}>
            {projects && projects.map(item => {
                    if (item.type === "layout") {
                        return (
                            <li
                                key={item.name}
                                className='dropdown-item'
                                onClick={() => scrollToSection('project')}
                                onMouseEnter={() => handleMouseEnter(item.name)}
                                onMouseLeave={() => handleMouseLeave(item.name)}
                          >
                             {isMobile ? (
                              <Link
                                  to={item.path}
                                  state={
                                    item.name === "slider"
                                        ? { layout: "mobile", classes }
                                        : { layout: "mobile" }
                                }

                              >
                                  <div className="dropdown-item-fixed" onClick={() => handleLayout("mobile")}>
                                  <img src={item.icon} alt={item.name} />
                                     <span>{item.title}</span>
                                  </div>
                              </Link>
                              ) : (
                                  <>
                                      <div className="dropdown-item-fixed">
                                          <img  src={item.icon} alt={item.name}/>
                                          <span>{item.title}</span>
                                      </div>
                                      <div
                                          className={`sidebar-dropdown-buttons ${
                                              mouseState[item.name] ? "mouse-active" : ""
                                          }`}
                                          style={{ display: isMobile ? "none" : "flex" }}
                                      >
                                          <Link
                                              to={item.path}
                                              state={
                                                  item.name === "slider"
                                                      ? { layout: "desktop", classes }
                                                      : { layout: "desktop" }
                                              }
                                          >
                                              <i
                                                  className="bx bx-desktop"
                                                  onClick={() => handleLayout("desktop")}
                                              ></i>
                                          </Link>
                                          <Link
                                              to={item.path}
                                              state={
                                                  item.name === "slider"
                                                      ? { layout: "mobile", classes }
                                                      : { layout: "mobile" }
                                              }
                                          >
                                              <i
                                                  className="bx bx-mobile"
                                                  onClick={() => handleLayout("mobile")}
                                              ></i>
                                          </Link>
                                      </div>
                                  </>
                                  )}
                            </li>
                      );
                  }else if (item.type === "link") {
                        return (
                            <li key={item.name}
                                className='dropdown-item'
                                onMouseEnter={() => handleMouseEnter(item.name)}
                                onMouseLeave={() => handleMouseLeave(item.name)}>
                                  <a  
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='dropdown-link'
                                  >
                                    <div className='dropdown-item-fixed'>
                                       <img  src={item.icon} alt={item.name}/>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className={`sidebar-dropdown-buttons ${mouseState[item.name] ? "mouse-active" : ""}`}>
                                        <span>{item.legend}</span>
                                    </div> 
                                </a>
                            </li>
                            
                        );
                    }
                })}
            
          </ul>
        </li>
        <li className={`list-item  ${activeSection === "contact" ? "active" : ""}`}
          onClick={() => scrollToSection('contact')}>
          <img src={contacticon} alt='contact' />
          <span>Contact</span> 
        </li> 
      </ul>
      <div className='sidebar-footer' onClick={handleDarkModeToggle}>
        {darkPortfolio ? <i className='bx bx-sun'></i> : < i className='bx bx-moon' ></i >}
      </div>
    </div>
  );
}

export default Sidebar;
   