import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./components/main/projects/Context/Layout";
import { MobileProvider } from "./components/main/projects/Context/Mobile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MobileProvider>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </MobileProvider>
);
