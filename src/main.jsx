import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import EventLayout from "./pages/EventLayout";
import Button from "remoteRacer/Button";
import "./index.css";
import { GlobalStyle } from "./components/GlobalStyle";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="event" element={<EventLayout />}>
        <Route path="f1-racer" element={<Button />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle>
      <RouterProvider router={router} />
    </GlobalStyle>
  </React.StrictMode>
);
