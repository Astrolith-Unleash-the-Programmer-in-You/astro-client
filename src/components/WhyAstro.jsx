import { whyAstro } from "../assets";
import { left1, left2, right1a, right1b, right2 } from "../assets/Landing page";
import React from "react";

const WhyAstro = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center my-5 items-center">
        {/* <h1 className="font-bold text-3xl">Why astrolith</h1> */}
        <img className="w-[80%] " src={whyAstro} alt="head" />

        <p className=" why_p ">
          Revolutionizing Programming Education through Immersive Gamification
        </p>
      </div>

      <div>
        {/* top */}
        <div className="hidden lg:flex m-10 gap-9 justify-center">
          <img className="" src={left1} alt="img" />

          <div className="flex flex-col gap-10 ">
            <img className="" src={right1a} alt="img" />
            <img className="" src={right1b} alt="img" />
          </div>
        </div>

        {/* mobile    */}
        <div className="flex m-5 gap-9 justify-center lg:hidden">
          <img className="w-full" src={left1} alt="img" />
        </div>

        {/* bottom */}

        {/* mobile screen */}
        <div className="lg:hidden m-5">
          <img className=" my-2" src={left2} alt="img" />
          <img className="my-2" src={right2} alt="img" />
        </div>

        {/* large screen */}
        <div className=" gap-5 m-10 hidden lg:flex">
          <img className="w-[50%] my-2 mb-5" src={left2} alt="img" />
          <img className="w-[50%] my-2" src={right2} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default WhyAstro;
