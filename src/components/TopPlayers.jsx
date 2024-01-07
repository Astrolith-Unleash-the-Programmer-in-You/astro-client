/* eslint-disable react/jsx-key */
// import { Diamond, player1 } from "../assets";
// import { useRef, useState } from "react";
// import { topPlayers } from "../constants";

// const TopPlayers = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const currentRef = useRef(null);

//   const handleScroll = () => {
//     if (currentRef.current) {
//       setScrollPosition(currentRef.current);
//     }
//   };
//   return (
//     <div
//       className=" scroll-container "
//       ref={currentRef}
//       onScroll={handleScroll}
//     >
//       {topPlayers.map((player) => (
//         <div className="content">
//           <img
//             className=" h-[50vh] w-[100%] absolute my-20 m-auto"
//             src={player.img}
//           />

//           <div className=" bg-[#434343] w-[50%] text-center rounded-xl">
//             <p>{player.handle}</p>
//             sss
//             <p></p>
//             <div>
//               {/* <img className="rounded-full" src={Diamond} /> */}

//               <div>
//                 <h3></h3>
//                 <small></small>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TopPlayers;
import React from "react";

import { topPlayers } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
// import { Link } from "react-router-dom";
// import { pers1 } from "../assets";

const TopPlayers = () => {
  return (
    <div>
      {/* mobile view */}
      <div className="p-5 lg:hidden mb-10">
        <h1 className="text-center my-10 font-bold text-[30px]">Top Players</h1>
        <Swiper
          cssMode={true}
          // navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className=" pb-10 "
        >
          {topPlayers.map((player) => (
            // eslint-disable-next-line react/jsx-key
            <div className="">
              <SwiperSlide>
                <img className="" src={player.img} />

                <div className="flex justify-between gap-4 items-center bg-[#434343] px-8 text-center rounded-xl">
                  <p>{player.handle}</p>

                  <div className=" w-[10px] h-[70px] border-2 bg-red-200"></div>

                  <div className="flex flex-col items-start gap-2">
                    {/* <img className="rounded-full" src={Diamond} /> */}

                    <h3>{player.userName}</h3>
                    <small>{player.exp}</small>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>

      {/* laptop view */}
      <div className="p-5 m-5 hidden lg:block mb-10">
        <h1 className="text-center my-10 font-bold text-[30px]">Top Players</h1>
        <div className="flex pb-10 justify-center gap-10">
          {topPlayers.map((player) => (
            // eslint-disable-next-line react/jsx-key
            <div className="w-[30%] h-[30%]">
              <div>
                <img className="" src={player.img} />

                <div className="flex  justify-between gap-4 items-center bg-[#434343] px-3 text-center rounded-xl">
                  <p className="">{player.handle}</p>

                  <div className=" w-[10px] h-[70px] border-2 bg-red-200"></div>

                  <div className="flex flex-col items-start gap-2">
                    {/* <img className="rounded-full" src={Diamond} /> */}

                    <h3>{player.userName}</h3>
                    <small>{player.exp}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlayers;
