import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LaundryApp } from "./LaundryApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LaundryApp />
  </StrictMode>
);
