import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VolcanoPage from "./pages/VolcanoPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MarketPlace from "./pages/MarketPlace";
// import {motion} from 'framer-motion'

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volcano" element={<VolcanoPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/marketplace" element={<MarketPlace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
