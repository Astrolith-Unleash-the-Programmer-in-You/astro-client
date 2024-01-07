import { certImg } from "../assets/Landing page";
import React from "react";
import { cert } from "../assets/marketplace";

const Certificate = () => {
  return (
    <div className="ml-[15rem] mt-10">
      <div className="cert">
        <img className="w-[60vh]  h-[60vh]" src={cert} alt="cert" />
      </div>
    </div>
  );
};

export default Certificate;
