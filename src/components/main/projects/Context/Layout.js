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
    title: "30-Day Challenge",
    titleArray: ["30-Day", "Challenge"],
    component: <Challenge />,
    path: "/layout/challengeGallery",
    paths: [`/layout/challengeGallery`, `/layout/favorites`],
    type: "layout",
    legend:
      "This project is designed to create the most complex section of the app: a 30-day yoga practice plan. The app retrieves information from a yoga API, including different categories of poses. Using this data, custom logic generates the practice sequences, randomly selecting poses from each category for different days. It saves the user's favorite days on their device for later access. Once the user enters the section, they are guided through the practice for each day's sequence. The project is built with React Router 6.",
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
      "This is a guided yoga practice tool offering 5 thematic sessions, with information retrieved from an API. Just like the 30-Day Challenge project, before the session begins, the user can preview the sequence and access detailed descriptions of each pose. The practice flows through each pose, guided by timers. In the original app, the slider seen in the portfolio gallery provides direct access to individual classes, allowing users to jump straight to specific session.This project is designed with React Router 6.",
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
      "This functionality was initially added as a fallback in case of potential API response delays in other sections. As the app evolved, it became clear that integrating a breathing exercise tool would add value to the practice section, offering users a simple yet effective way to do yoga. Given the importance of breath control, this feature is currently expanding by customizing the code to include well-known techniques that involve adjusting stages or their timings, all while maintaining the current visual simplicity.",
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
