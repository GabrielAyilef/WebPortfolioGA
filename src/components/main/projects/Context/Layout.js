import React, { createContext, useState, useContext, useEffect } from "react";
import SliderComponent from "../slider/Slider";
import Challenge from "../challenge/Challenge";
import BreatheHome from "../Breathe/BreatheHome";
import Yogaapp from "../yogaApp/Yogaapp";
import sequences from "../../../../assets/yogaliicon.png";
import challenge from "../../../../assets/challengeicon.png";
import yogaapp from "../../../../assets/yogaappicon.png";
import breathicon from "../../../../assets/breathicon.png";

const projects = [
  {
    name: "challenge",
    title: "30 days Challenge",
    titleArray: ["30", "Days", "Challenge"],
    component: <Challenge />,
    path: "/layout/challengeGallery",
    paths: [`/layout/challengeGallery`, `/layout/favorites`],
    type: "layout",
    legend:
      "A React Router 6 project designed to create a 30-day yoga practice plan. It features alternating rest days and allows users to save their favorite practice days for quick access. The app retrieves information from an API and uses custom logic to randomly select poses from hardcoded, categorized groups.",
    icon: challenge,
  },

  {
    name: "slider",
    title: "Choose your Class",
    titleArray: ["Choose", "Your", "Class"],
    component: <SliderComponent />,
    path: "/layout/slider/gallery",
    paths: [`/layout/slider`, `/layout/poses`],
    type: "layout",
    legend:
      "A React Router 6 project featuring 5 special yoga sequences. Asanas are imported from an API, and each sequence provides access to posture details before starting the practice, with a built-in timer. In the original app, the home slider offers quick access to each sequence.",
    icon: sequences,
  },
  {
    name: "breathe",
    title: "Just Breath",
    titleArray: ["Just", "Breath"],
    component: <BreatheHome />,
    path: "/layout/breathe",
    paths: [`/layout/breathe`],
    type: "layout",
    legend:
      "Initially added as a fallback in case of potential API response delays, this breathing exercise tool was integrated into the practice section of the app offering visual and textual guidance. It is now expanding to include customizable breathing options.",
    icon: breathicon,
  },
  {
    name: "yogaapp",
    title: "Full App",
    component: <Yogaapp />,
    url: "https://yogaapp24.netlify.app/",
    type: "link",
    legend: "Your device",
    icon: yogaapp,
  },
];

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [desktop, setDesktop] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("sharedLayout");

  function updateContextLayout(newLayout) {
    if (newLayout === "desktop") {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }
  function updateCollapse(collapse) {
    setIsCollapsed(collapse);
  }

  function updateComponent(newComponent) {
    setCurrentComponent(newComponent);
  }

  return (
    <LayoutContext.Provider
      value={{
        desktop,
        updateContextLayout,
        currentComponent,
        updateComponent,
        projects,
        updateCollapse,
        isCollapsed,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
