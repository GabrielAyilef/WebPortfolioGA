import React from 'react'
import "./footer.css"
import { useDarkMode } from '../projects/Context/DarkMode';


function scrollToSection(id) {
  
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth',
      block: 'start' });
  }
}

function Footer() {
  const {darkPortfolio} = useDarkMode()
  return (
    <div  className={` footer ${darkPortfolio ? "dark" : ""}`}>
      <nav>
        <div className="nav-links">
          <ul >
            <li onClick={() => scrollToSection('profile')}><span >Profile</span></li>
            <li onClick={() => scrollToSection('about')}><span >About</span></li>
            <li onClick={() => scrollToSection('project')}><span>Projects</span></li>
          </ul>
        </div>
      </nav>
      <p>Copyright &#169; 2024 Gabriel Ayilef. All Rights Reserved.</p>
  </div>
  )
}

export default Footer
