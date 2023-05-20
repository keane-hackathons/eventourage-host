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
import RacerGame from "remoteRacer/RacerGame";
import AmongUs from "remoteAmongUs/AmongUs";
import "./index.css";
import { GlobalStyle } from "./components/GlobalStyle";
import { Entry } from "./pages/Entry";
import { EntryOTP } from "./pages/EntryOTP";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Entry />}/>
      <Route path="otp" element={<EntryOTP />}/>
      <Route path=":id">
        <Route index element={<Home />}/>
        <Route path="event" element={<EventLayout />}>
          <Route path="f1-racer" element={<RacerGame />} />
          <Route path="among-us" element={<AmongUs />} />
          <Route path="ghost-generator" element={<iframe src="https://iframe-ghostgenerator-sg.heineken.com/" width="100%" height="100%" />}/>
        </Route>
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
