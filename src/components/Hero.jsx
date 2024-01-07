import { Link } from "react-router-dom";
import { hb, heading, play } from "../assets";
import Navbar from "./Navbar";
import { Text, jsImg } from "../assets/Landing page";
import React from "react";

const Hero = () => {
  return (
    <div>
      {/* <img src={hb} className="absolute h-screen w-full" /> */}
      <img
        src={hb}
        className="absolute h-[80vh] lg:h-screen w-full object-cover"
      />

      <Navbar />

      {/* mobile view */}
      <div className="lg:hidden relative ml-10 lg:mt-[3rem] py-32  mb-[10rem] flex flex-col gap-3">
        {/* <h1 className="hero_logo">ASTROLITH</h1> */}
        <img className="w-[80%]" src={heading} alt="head" />

        <p className="lg:text-[1.5rem] lg:w-[60%] w-[80%] leading-7 lg:leading-8  capitalize font-poppins">
          conqure programming, defeat virtual foes and unlock the secretes of
          javascript
        </p>
        <Link
          to="/"
          className="rounded-2xl gap-2 capitalize flex items-center border-2 px-5 py-1 my-4 w-[12.1rem]"
        >
          <img src={play} alt="play" />
          <p className="w-full ">start playing</p>
        </Link>
      </div>

      {/* laptop view */}

      <div className="lg:flex hidden pt-20  relative  flex-col gap-5">
        <div className="lg:flex hidden justify-center items-center mt-[5rem] relative  mb-[10rem] flex-col gap-3">
          {/* <h1 className="hero_logo">ASTROLITH</h1> */}
          <img src={heading} alt="head" />
          <p className="lg:text-[1.5rem] font-inter text-center w-[60%] lg:leading-8  capitalize font-poppins">
            conqure programming, defeat virtual foes and unlock the secretes of
            javascript
          </p>
          <Link
            to="/"
            className="rounded-2xl gap-2 capitalize flex items-center border-2 px-5 py-1 my-4 w-[12.1rem]"
          >
            <img src={play} alt="play" />
            <p>start playing</p>
          </Link>
        </div>

        <div className="relative ml-0 mb-0">
          <img
            className="relative h-[82vh] ml-10 mt-[-30rem] opacity-[0.4]"
            src={Text}
          />
        </div>

        <div>
          <img
            className="w-[42%] relative ml-[50rem] mt-[-20rem] opacity-[0.6]"
            src={jsImg}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
