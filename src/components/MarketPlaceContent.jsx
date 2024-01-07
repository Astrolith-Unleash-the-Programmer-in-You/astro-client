/* eslint-disable react/jsx-key */
import { marketItems } from "../constants";
import React from "react";

const MarketPlaceContent = () => {
  return (
    <div className=" m-10">
      <h1 className="bg-[#232323] text p-3 rounded-lg lg:w-[100vh]  my-10">
        Weapons and potions (230){" "}
      </h1>

      <div className="flex gap-3 flex-wrap">
        {marketItems.map((item) => (
          <div className="rounded-xl p-[1.7rem] border-[1px] bg-[#232323] lg:w-[15%] w-[30%] flex flex-col justify-center items-center">
            <img className="w-[5rem] h-[5rem] border-b-2 mb-3" src={item.img} />

            <h1 className="capitalize font-semibold">{item.name}</h1>

            <div className="flex  justify-center items-center">
              <img
                className="w-[2rem] h-[2rem]"
                src={item.coinImg}
                alt="coin"
              />
              <h1> {item.coinNo}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlaceContent;
