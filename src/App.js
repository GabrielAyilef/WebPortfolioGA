import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import { useState, useEffect } from "react";
import SliderInfo from "./components/main/projects/slider/SliderInfo/SliderInfo";
import SliderGallery from "./components/main/projects/slider/SliderGallery/SliderGallery";
import ChallengeGallery from "./components/main/projects/challenge/ChallengeGallery/ChallengeGallery";
import ChallengeDay from "./components/main/projects/challenge/ChallengeDay/ChallengeDay";
import Favorites from "./components/main/projects/NavBar/Favorites/Favorites";
import PoseDetail from "./components/main/projects/NavBar/asanas/PoseDetail";
import Breathe from "./components/main/projects/Breathe/Breather/Breathe";
import SliderPlay from "./components/main/projects/slider/SliderPlay/SliderPlay";
import ChallengePlay from "./components/main/projects/challenge/ChallengePlay/ChallengePlay";
import Home from "./components/main/projects/home/Home";
import { AudioProvider } from "./components/main/projects/Context/MusicPlayer";
import { DarkModeProvider } from "./components/main/projects/Context/DarkMode";
import { SliderProvider } from "./components/main/projects/Context/SliderContext";
import { useLayout } from "./components/main/projects/Context/Layout";
import { useMobile } from "./components/main/projects/Context/Mobile";
import ProjectWrapper from "./components/main/projects/projectWrapper/ProjectWrapper";
import SharedLayout from "./components/main/projects/sharedLayout/SharedLayout";
console.log(window.innerWidth, window.innerHeight);

function App() {
  const { isMobile } = useMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const { updateCollapse } = useLayout();

  useEffect(() => {
    updateCollapse(isCollapsed);
  }, [isCollapsed]);

  function handleSidebarToggle(isCollapsed) {
    setIsCollapsed(isCollapsed);
    updateCollapse(isCollapsed);
  }

  return (
    <DarkModeProvider>
      <AudioProvider>
        <SliderProvider>
          <Router>
            <div>
              <Sidebar
                isCollapsed={isCollapsed}
                className={isCollapsed ? "sidebar sidebar-closed" : "sidebar"}
                onSidebarToggle={handleSidebarToggle}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      isCollapsed={isCollapsed}
                      className={
                        isCollapsed
                          ? "main-portfolio sidebar-closed"
                          : "main-portfolio"
                      }
                    />
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="layout" element={<ProjectWrapper />}>
                    <Route element={<SharedLayout />}>
                      <Route
                        path="slider/info/:index"
                        element={<SliderInfo />}
                      />
                      <Route
                        path="slider/gallery"
                        element={<SliderGallery />}
                      />
                      <Route
                        path="challengeGallery"
                        element={<ChallengeGallery />}
                      />
                      <Route
                        path="challengeGallery/:dia"
                        element={<ChallengeDay />}
                      />
                      <Route path="favorites" element={<Favorites />} />
                      <Route path="poses-list/:name" element={<PoseDetail />} />
                      <Route path="breathe" element={<Breathe />} />
                    </Route>

                    <Route
                      path="slider/info/:index/play"
                      element={<SliderPlay />}
                    />
                    <Route
                      path="challengeGallery/:dia/play"
                      element={<ChallengePlay />}
                    />
                  </Route>
                </Route>
              </Routes>
            </div>
          </Router>
        </SliderProvider>
      </AudioProvider>
    </DarkModeProvider>
  );
}
export default App;
