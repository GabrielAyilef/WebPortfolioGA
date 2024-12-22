import React from "react";
import Breathe from "../Breather/Breathe";
import "./breatheDelay.css";
import { useLayout } from "../../Context/Layout";

function BreatheDelay() {
  const { desktop } = useLayout();
  return (
    <div className={`breath-delay-container ${desktop ? desktop : ""}`}>
      <h1 className="delay-loading">Loading...</h1>
      <Breathe className="delay-breathe" /*delay={4000}*/ />
    </div>
  );
}

export default BreatheDelay;