import React, { useRef, useEffect } from 'react'
import linkedin from "../../../assets/linkedinicon.png"
import github from "../../../assets/githubicon.png"
import pic from "../../../assets/portfolio.png"
import resume from "../../../assets/resume.pdf"
import "./profile.css"
import { useDarkMode } from '../projects/Context/DarkMode'

function Profile() {
  const { darkPortfolio } = useDarkMode()
  const sectionRef = useRef(null)
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (sectionRef.current && entry.isIntersecting) {
            sectionRef.current.classList.add("visible");
          } else if (sectionRef.current) {
            sectionRef.current.classList.remove("visible");
          }
        },
        { threshold: 0.2 }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);
  

  function handleDownloadCV(){
    window.open(resume, "_blank");
  };

  function handleNavigateContact() {
    window.location.href = "./#contact";
  };

  function handleNavigateLinkedIn() {
    window.open("https://linkedin.com/in/gabriel-ayilef-8324472b4", "_blank");
  };
  
  function handleNavigateGitHub() {
    window.open("https://github.com/GabrielAyilef", "_blank");
  };
  return (
    <div id="profile" className={`${darkPortfolio ? "dark" : ""}`}>
      <div className="profile-pic">
        <img src={pic} alt="Gabriel"/>
      </div>
      <div className="text-section">
        <p className="section-header">Hello, I'm</p>
        <h1 className="title">Gabriel Ayilef</h1>
        <p className="subtitle">Frontend Developer</p>
        <div className="btn-container">
          <button className="btn-cv" onClick={handleDownloadCV} >Download CV</button>
          <button className="btn-info" onClick={handleNavigateContact} >Contact Info</button>
        </div>
        <div className="social-container" ref={sectionRef}>
          <button>
            <img src={linkedin}
              alt="LinkedIn"
              className="icon"
              onClick={handleNavigateLinkedIn}
              role="button" />
          </button>
          <button>
            <img src={github}
              alt="GitHub"
              className="icon"
              onClick={handleNavigateGitHub}
              role="button" />
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Profile
