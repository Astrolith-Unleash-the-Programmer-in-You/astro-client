import { whyAstro } from "../assets";
import { left1, left2, right1a, right1b, right2 } from "../assets/Landing page";
import React from "react";

const WhyAstro = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center my-5 items-center">
        {/* <h1 className="font-bold text-3xl">Why astrolith</h1> */}
        <img src={whyAstro} alt="head" />

        <p className=" why_p ">
          Revolutionizing Programming Education through Immersive Gamification
        </p>
      </div>

      <div>
        {/* top */}
        <div className="flex m-10 gap-9 justify-center">
          <img className="" src={left1} alt="img" />

          <div className="flex flex-col gap-10 ">
            <img className="" src={right1a} alt="img" />
            <img className="" src={right1b} alt="img" />
          </div>
        </div>

        {/* bottom */}
        <div className="flex gap-5 m-10">
          <img className="w-[50%]" src={left2} alt="img" />
          <img src={right2} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default WhyAstro;
