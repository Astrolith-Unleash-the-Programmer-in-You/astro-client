/* eslint-disable react/jsx-key */
import { boss1 } from "../assets";
import { achievements } from "../constants";
import React from "react";

const DashboardContent = () => {
  return (
    <div className="">
      <div className=" m-10">
        <h1 className="bg-[#232323] text p-3 rounded-lg lg:w-[100vh] w-[90%]  my-10">
          Humanoid bosses won (3)
        </h1>
        <img className="w-[15rem] h-[15rem]" src={boss1} />
        <h1 className="bg-[#232323] text p-3 rounded-lg text-center my-3 w-[30vh]">
          claim reward
        </h1>
      </div>

      <div className=" m-10">
        <h1 className="bg-[#232323] w-[90%] text p-3 rounded-lg lg:w-[100vh]  my-10">
          Achivements (12)
        </h1>

        <div className="flex gap-3 lg:flex-nowrap flex-wrap">
          {achievements.map((ach) => (
            <div className="rounded-xl p-5 bg-[#232323] w-[30%] flex flex-col items-center">
              <img className="w-[5rem] h-[5rem]" src={ach.img} />
              <div className="flex flex-col justify-center items-center">
                <img src={ach.text} alt="img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
