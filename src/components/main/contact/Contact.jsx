import React, { useRef, useEffect } from 'react'
import linkedin from "../../../assets/linkedinicon.png"
import email from "../../../assets/emailicon.png"
import "./contact.css"
import { useDarkMode } from '../projects/Context/DarkMode'

function Contact() {
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
  return (
    <>
      <div id="contact" className={`${darkPortfolio ? "dark" : ""}`}>
        <p className="section-header">Get in Touch</p>
        <h1 className="title">Contact Me</h1>
        <div className="contact-info-upper-container" ref={sectionRef}>
          <div className="contact-info-container">
            <div className='icon-container-contact email-icon'>
              <img
                src={email}
                alt="Email icon"
              />
            </div>
            <p><a href="mailto:examplemail@gmail.com">gabriel.ayilef.1@gmail.com</a></p>
          </div>
          <div className="contact-info-container">
            <div className='icon-container-contact linkedin'>
              <img
                src={linkedin}
                alt="LinkedIn icon"
              />
            </div>
            
            <p><a href="https://linkedin.com/in/gabriel-ayilef-8324472b4">LinkedIn</a></p>
          </div>
        </div>
 
    </div>
    
    </>
    
  )
}

export default Contact
