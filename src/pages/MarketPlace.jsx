/* eslint-disable react/jsx-key */
import React from "react";
import { useState } from "react";
import { Diamond, coin, magicPotion } from "../assets";
import { dashLinks } from "../constants";
import DashboardContent from "../components/DashboardContent";
import Certificate from "../components/Certificate";
import { Link } from "react-router-dom";
import MarketPlaceContent from "../components/MarketPlaceContent";
import { Navbar } from "../components";

const MarketPlace = () => {
  const [active, setActive] = useState("MarketPlace");

  return (
    <div>
      {/* top */}
      <div className="lg:flex hidden w-full  border-b-[0.1px] p-3 items-center justify-between">
        <Link to="/" className="logo">
          Astrolith
        </Link>

        <ul className="hidden lg:flex gap-2">
          <li className="flex px-2 justify-center items-center rounded-lg shadow-sm bg-[#434343]">
            <img className="w-[3rem] h-[3rem]" src={coin} />
            <p>34,678</p>
          </li>

          <li className="flex gap-2 px-2 justify-center items-center rounded-lg shadow-sm bg-[#434343]">
            <p>EXP</p>
            <p>34,678</p>
          </li>

          <li className="flex px-2 justify-center items-center rounded-lg shadow-sm bg-[#434343]">
            <img className="w-[3rem] h-[3rem]" src={magicPotion} />
            <p>34,678</p>
          </li>

          <li className="flex px-2 gap-2 justify-center items-center rounded-lg shadow-sm bg-[#434343]">
            <p>Enemies: </p>
            <p> 3</p>
          </li>
        </ul>

        <Link to="/profile" className="bg-[#434343] p-2 rounded-3xl">
          <img className="w-[3rem] h-[3rem] " src={Diamond} />
        </Link>
      </div>

      <div className="lg:hidden mb-[5rem]">
        <Navbar />
      </div>

      {/* bottom */}
      <div className="flex items-start  justify-items-start">
        {/* left */}
        <ul className="bg-[#232323] hidden lg:flex h-[120vh] flex-col justify-center p-5 w-[35vh] list-none gap-10">
          {dashLinks.map((Link) => (
            <li
              key={Link.id}
              className={`${
                active === Link.title ? " bg-rose-400" : "text-white"
              }
           ${
             Link.title
               ? "hover:text-white py-2 rounded-md text-center bg-[#2E2E2E] text-[18px] font-medium cursor-pointer"
               : ""
           }`}
              onClick={() => setActive(Link.title)}
            >
              <h1>{Link.title}</h1>
            </li>
          ))}
        </ul>

        {/* right */}
        {active === "Dashboard" && <DashboardContent />}
        {active === "MarketPlace" && <MarketPlaceContent />}
        {active === "Certificate" && <Certificate />}
      </div>
    </div>
  );
};

export default MarketPlace;
