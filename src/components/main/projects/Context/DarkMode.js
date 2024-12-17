import React, { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkPortfolio, setDarkPortfolio] = useState(true);
  const [darkProject, setDarkProject] = useState(true);

  function toggleDarkProject() {
    setDarkProject((prev) => !prev);
  }
  function toggleDarkPortfolio() {
    if (darkPortfolio && darkProject) {
      setDarkProject(false);
      setDarkPortfolio(false);
    } else if (darkPortfolio && !darkProject) {
      setDarkPortfolio(false);
    } else if (!darkPortfolio && darkProject) {
      setDarkPortfolio(true);
    } else {
      setDarkProject(true);
      setDarkPortfolio(true);
    }
  }

  return (
    <DarkModeContext.Provider
      value={{
        darkPortfolio,
        darkProject,
        toggleDarkPortfolio,
        toggleDarkProject,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
export function useDarkMode() {
  return useContext(DarkModeContext);
}
