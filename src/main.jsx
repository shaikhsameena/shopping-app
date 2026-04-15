import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // ✅ Tailwind styles loaded


import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
