import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { IconContext } from "react-icons";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>
);
