import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import EventLayout from "./pages/EventLayout";
import "./index.css";
import { GlobalStyle } from "./components/GlobalStyle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="event" element={<EventLayout />} />
        </Routes>
      </Router>
    </GlobalStyle>
  </React.StrictMode>
);
