import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Phase 7 · Bug Group 2 — force every load to start at the top.
// Browsers default to history.scrollRestoration = "auto", which restores the
// previous scroll position on reload/HMR (site was opening mid-page/near the
// footer). Opt out and explicitly pin to the top before first paint.
if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
