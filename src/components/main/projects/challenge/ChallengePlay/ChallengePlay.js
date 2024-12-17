import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../../slider/SliderPlay/sliderPlay.css";
import nextIcon from "../../../../../assets/nextPlay.png";
import backIcon from "../../../../../assets/backPlay.png";
import nextIcondark from "../../../../../assets/nextPlaydark.png";
import backIcondark from "../../../../../assets/backPlaydark.png";
import pause from "../../../../../assets/pause.png";
import pausedark from "../../../../../assets/pausedark.png";
import play from "../../../../../assets/play.png";
import playdark from "../../../../../assets/playdark.png";
import exit from "../../../../../assets/exit.png";
import ConfirmModal from "../../Modal/ConfirmModal";
import { useDarkMode } from "../../Context/DarkMode";
import Confetti from "react-confetti";
import bell from "../../../../../assets/bell.wav";
import { useLayout } from "../../Context/Layout";

const bellAudio = new Audio(bell);

const asanaDuration = 30;

const asanasToRepeat = [
  "Crescent Lunge",
  "Eagle",
  "Extended Side Angle",
  "Half-Moon",
  "King Pigeon",
  "Pyramid",
  "Reverse Warrior",
  "Side Plank",
  "Tree",
  "Wild Thing",
  "Low Lunge",
  "Triangle",
  "Warrior One",
  "Warrior Two",
];

function ChallengePlay() {
  const { darkProject } = useDarkMode();
  const containerRef = useRef(null);
  const location = useLocation();
  const { asanaLinks } = location.state;
  const [isPaused, setIsPaused] = useState(false);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [prepTime, setPrepTime] = useState(5);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { desktop } = useLayout();

  // Modal
  function goBack() {
    setShowModal(true);
  }

  function handleConfirm() {
    setShowModal(false);
    navigate(-1);
  }

  function handleCancel() {
    setShowModal(false);
  }

  const processedAsanas = asanaLinks
    .map((asana) => {
      if (asanasToRepeat.includes(asana.english_name)) {
        return [
          { ...asana, side: "Right side" },
          { ...asana, side: "Left side" },
        ];
      } else {
        return asana;
      }
    })
    .flat();

  useEffect(() => {
    function breathAnimation() {
      if (containerRef.current) {
        containerRef.current.className = "sliderplay-image grow";

        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.className = "sliderplay-image shrink";
          }
        }, 3000);
      }
    }

    const interval = setInterval(breathAnimation, 6000);

    breathAnimation();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (isPreparing && !isPaused) {
      if (prepTime > 0) {
        timer = setTimeout(() => {
          setPrepTime(prepTime - 1);
        }, 1000);
      } else {
        setIsPreparing(false);
        setPrepTime(5);
      }
    }
    return () => clearTimeout(timer);
  }, [isPreparing, prepTime, isPaused]);

  const currentAsana = processedAsanas[currentAsanaIndex];
  const isFirstAsana = currentAsanaIndex === 0;
  const isLastAsana = currentAsanaIndex === processedAsanas.length - 1;

  function handleTimerExpire() {
    bellAudio.play();
    if (!isPreparing && !isLastAsana) {
      setTimeout(() => {
        handleNext();
      }, 2000);
    } else {
      setIsFinished(true);

      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  }

  function handleBack() {
    if (!isFirstAsana) {
      setCurrentAsanaIndex(currentAsanaIndex - 1);
      setIsPreparing(true);
      setPrepTime(5);
      setKey((prevKey) => prevKey + 1);
    }
  }

  function handleNext() {
    if (!isLastAsana) {
      setCurrentAsanaIndex(currentAsanaIndex + 1);
      setIsPreparing(true);
      setPrepTime(5);
      setKey((prevKey) => prevKey + 1);
    }
  }

  function handlePause() {
    setIsPaused(!isPaused);
  }

  if (asanaLinks.length === 0) {
    return (
      <div className="challenge-play-container">
        Sequence to play was not found
      </div>
    );
  }

  return (
    <div
      className={`wood ${darkProject ? "dark" : ""} ${
        desktop ? "desktop" : ""
      }`}
    >
      <div
        className={`sliderplay-container ${darkProject ? "dark" : ""} ${
          desktop ? "desktop" : ""
        }`}
      >
        {isFinished && <Confetti />}
        <div className="sliderPlay-header">
          <img
            src={exit}
            alt="Back"
            className="sliderplay-exit"
            onClick={goBack}
          />
          <span className="sliderplay-name">
            {currentAsana.english_name}{" "}
            {currentAsana.side && `(${currentAsana.side})`}
          </span>
        </div>
        <div className="sliderplay-main">
          {!isFirstAsana && (
            <img
              src={darkProject ? backIcondark : backIcon}
              alt="Back"
              className="sliderplay-icon sliderplay-icon-left"
              onClick={handleBack}
            />
          )}
          {!isLastAsana && (
            <img
              src={darkProject ? nextIcondark : nextIcon}
              alt="Next"
              className="sliderplay-icon sliderplay-icon-right"
              onClick={handleNext}
            />
          )}
          <img
            ref={containerRef}
            src={currentAsana.url_png}
            alt={`Asana ${currentAsanaIndex + 1}`}
            className="sliderplay-image"
          />
        </div>
        <div className="sliderplay-counter">
          <div>
            {isPreparing ? (
              <div className="sliderplay-preparation-timer">{prepTime}</div>
            ) : (
              <div className="sliderplay-cowntdown-wrapper">
                <CountdownCircleTimer
                  key={key}
                  isPlaying={!isPaused}
                  duration={asanaDuration}
                  colors={["#01497c", "#2c7da0", "#468faf", "#61a5c2"]}
                  colorsTime={[asanaDuration, 0]}
                  onComplete={handleTimerExpire}
                  size={desktop ? 45 : 70}
                  strokeWidth={desktop ? 7 : 10}
                >
                  {({ remainingTime }) => (
                    <div className="sliderplay-countdown-text">
                      {remainingTime}
                    </div>
                  )}
                </CountdownCircleTimer>
              </div>
            )}
          </div>
          <div className="sliderplay-icon-pause">
            <img
              src={
                isPaused
                  ? darkProject
                    ? playdark
                    : play
                  : darkProject
                  ? pausedark
                  : pause
              }
              alt={isPaused ? "Play" : "Pause"}
              onClick={handlePause}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default ChallengePlay;
