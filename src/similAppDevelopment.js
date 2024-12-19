// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/sidebar/Sidebar";
// import Main from "./components/main/Main";
// import { useState, useEffect } from "react";
// import SliderGallery from "./components/main/projects/slider/SliderGallery/SliderGallery";
// import ChallengeGallery from "./components/main/projects/challenge/ChallengeGallery/ChallengeGallery";
// import Breathe from "./components/main/projects/Breathe/Breather/Breathe";
// import Home from "./components/main/projects/home/Home";
// import { AudioProvider } from "./components/main/projects/Context/MusicPlayer";
// import { DarkModeProvider } from "./components/main/projects/Context/DarkMode";
// import { SliderProvider } from "./components/main/projects/Context/SliderContext";
// import { useLayout } from "./components/main/projects/Context/Layout";
// import { useMobile } from "./components/main/projects/Context/Mobile";
// import ProjectWrapper from "./components/main/projects/projectWrapper/ProjectWrapper";
// import SharedLayout from "./components/main/projects/sharedLayout/SharedLayout";

// function similApp() {
//   const { isMobile } = useMobile(true);
//   const [isCollapsed, setIsCollapsed] = useState(isMobile);
//   const { updateCollapse } = useLayout();

//   useEffect(() => {
//     updateCollapse(isCollapsed);
//   }, [isCollapsed]);

//   function handleSidebarToggle(isCollapsed) {
//     setIsCollapsed(isCollapsed);
//     updateCollapse(isCollapsed);
//   }

//   return (
//     <DarkModeProvider>
//       <AudioProvider>
//         <SliderProvider>
//           <Router>
//             <div>
//               <Sidebar
//                 isCollapsed={isCollapsed}
//                 className={isCollapsed ? "sidebar sidebar-closed" : "sidebar"}
//                 onSidebarToggle={handleSidebarToggle}
//               />
//               <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <Main
//                       isCollapsed={isCollapsed}
//                       className={
//                         isCollapsed
//                           ? "main-portfolio sidebar-closed"
//                           : "main-portfolio"
//                       }
//                     />
//                   }
//                 >
//                   <Route path="/" element={<Home />} />
//                   <Route path="layout" element={<ProjectWrapper />}>
//                     <Route element={<SharedLayout />}>
//                       <Route
//                         path="slider/gallery"
//                         element={<SliderGallery />}
//                       />
//                       <Route
//                         path="challengeGallery"
//                         element={<ChallengeGallery />}
//                       />
//                       <Route path="breathe" element={<Breathe />} />
//                     </Route>
//                   </Route>
//                 </Route>
//               </Routes>
//             </div>
//           </Router>
//         </SliderProvider>
//       </AudioProvider>
//     </DarkModeProvider>
//   );
// }
// export default similApp;
