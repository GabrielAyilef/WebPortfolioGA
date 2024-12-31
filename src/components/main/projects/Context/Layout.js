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
      "This project is designed to create a 30-day yoga practice plan. It saves the user's favorite days on their device, allowing access later. The app retrieves information from a yoga API, which includes different categories of poses. Using this data, custom logic is applied to generate the practice sequences, randomly selecting poses from each category for different days. The project is built with React Router 6.",
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
      "This is a guided yoga practice tool offering 5 thematic sessions, with information retrieved from an API. Before the session begins, the user can preview the sequence and access detailed descriptions of each pose. The practice flows through each pose, guided by timers. This project is designed with React Router 6",
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
      "Initially added as a fallback in case of potential API response delays, this breathing exercise tool was integrated into the practice section of the app offering visual and textual guidance. The project is now expanding to include customizable breathing options.",
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
