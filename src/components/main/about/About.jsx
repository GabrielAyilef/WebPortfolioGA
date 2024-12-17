import React, { useRef,useEffect } from 'react';
import about from "../../../assets/about.jpg";
import checkmark from "../../../assets/checkmarkicon.png";
import experience from "../../../assets/experienceicon.png";
import education from "../../../assets/educationicon.png";
import "./about.css";
import { useDarkMode } from '../projects/Context/DarkMode';

function About() {
  
  const { darkPortfolio } = useDarkMode()
  const textRef = useRef(null)
  const iconRef = useRef(null)
  
  useEffect(() => {
    const createObserver = (targetRef, className) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (targetRef.current) {
              targetRef.current.classList.add(className);
            }
          } else {
            if (targetRef.current) {
              targetRef.current.classList.remove(className);
            }
          }
        },
        { threshold: 0.2 }
      );

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return observer;
    };

    const textObserver = createObserver(textRef, "visible");
    const iconObserver = createObserver(iconRef, "visible");

    return () => {
      // Limpiar los observers cuando el componente se desmonte
      if (textRef.current) {
        textObserver.unobserve(textRef.current);
      }
      if (iconRef.current) {
        iconObserver.unobserve(iconRef.current);
      }
    };
  }, []);

  return (
    <div id="about" className={`${darkPortfolio ? "dark" : ""}`}>
      <p className="section-header">Get to Know More</p>
      <h1 className="title">About me</h1>
      <div className="section-about-container">
        <div className="about-pic">
          <img src={about} alt="laptop on yoga mat" />
        </div>
        <div className="about-text-container">
        <div className= "text-container" ref={textRef}>
            <p>
              After years in the yoga scene, I’m making the move to frontend development, particularly excited by 
              the ability to <span>bring ideas to life</span> through interactive interfaces. Now, my attention to detail, {} 
              <span> creativity</span>, and adaptability are focused on <span>user experiences</span>. Frontend draws me because of the <span>endless 
              possibilities</span> and tools available to navigate challenges and create effective solutions.
            </p>
          </div>
          <div className="about-containers" ref={iconRef}>
            <div className="details">
              <div className='icon-about-container'>
                 <img src={experience}  alt=""/>  
              </div>
              <h2>Experience</h2>
              <div className="article-container">
                <article >
                  <div className='icon-about-container'>
                    <img src={checkmark} alt="" />
                  </div>
                  <div className="article-text">
                    <h3>HTML</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article>
                <div className='icon-about-container'>
                  <img src={checkmark} alt=""/>
                </div>
                <div className="article-text">
                    <h3>CSS</h3>
                    <p>Intermediate</p>
                </div>
                </article>
              </div>
              <div className="article-container">
                <article >
                  <div className='icon-about-container'>
                    <img src={checkmark} alt=""  />
                  </div>
                  <div className="article-text">
                    <h3>Javascript</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article >
                  <div className='icon-about-container'>
                    <img src={checkmark} alt="" />
                  </div>
                  <div className="article-text">
                    <h3>React.js</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
              </div>
            </div>
            <div className="details">
            <div className='icon-about-container'>
               <img src={education}  alt="Education Icon" />    
            </div>
            <h2>Education</h2>
              <div className="article-container">
                <article >
                <div className='icon-about-container'>
                  <img src={checkmark} alt="" />
                </div>
                 <div className="article-text">
                  <h3>B.Sc. in Accounting</h3>
                </div>
                </article>
                <article>
                <div className='icon-about-container'>
                  <img src={checkmark} alt=""/>
                </div>
                <div className="article-text">
                    <h3>Frontend Developer Career Path <br />by Scrimba</h3>
                  </div>
                </article>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default About;
