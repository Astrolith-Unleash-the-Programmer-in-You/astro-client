import { Link } from "react-router-dom";
import { Diamond, coin, magicPotion } from "../assets";

const Profile = () => {
  return (
    <div>
      {/* top */}
      <div className="flex  w-full  border-b-[0.1px] p-3 items-center justify-between">
        <Link to="/" className="logo">
          Astrolith
        </Link>

        <ul className="flex gap-2">
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

      {/* bottom */}
      <div className="m-20 w-[90%]">
        <div className="bg-[#232323] ">
          <div className="w-full h-[0.9rem] bg-[#2E2E2E]"></div>
          <div className="flex p-5 gap-5 items-center">
            <img
              src={Diamond}
              className="rounded-full object-cover w-[3rem] h-[3rem]"
              alt="prof"
            />
            <div>
              <h1 className="text-2xl font-semibold mb-3">Adam john</h1>
              <h1 className="flex border-[1px] rounded-2xl p-1 text-center">
                <img src={coin} alt="coin" className="w-[1.4rem] h-[1.4rem]" />
                <p>Golden level</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
