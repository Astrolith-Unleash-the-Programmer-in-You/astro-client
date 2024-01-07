import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { logo, menuIcon, xIcon } from "../assets";
import React from "react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [menuItems, setMenuItems] = useState(false);

  return (
    <div className="">
      {menuItems ? (
        <nav
          className=" w-full fixed bg-black  top-0
        z-20   justify-between  rounded-lg shadow-xl"
        >
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="ml-10"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} />
            </Link>
            <div
              onClick={() => setMenuItems(!menuItems)}
              className="m-10 lg:hidden"
            >
              <img src={xIcon} alt="menu" />
            </div>
          </div>
          <ul className=" flex flex-col justify-center  mx-10 p-2 list-none gap-10">
            {navLinks.map((Link) => (
              <li
                key={Link.id}
                className={`${
                  active === Link.title ? "text-secondary" : "text-white"
                }
                    hover:text-white text-[18px] font-medium cursor-pointer `}
                onClick={() => setActive(Link.title)}
              >
                <a href={`${Link.id}`}>
                  <img src={Link.img} alt="menu" />
                </a>
              </li>
            ))}
          </ul>

          <h1 className=" cursor-pointer text-center py-3 capitalize text-xl m-10 rounded-3xl border-2">
            connect
          </h1>
        </nav>
      ) : (
        <nav
          className="fixed  flex items-center py-3  top-0
      z-20 bg lg:w-[80%] my-3 w-full mx-0 lg:mx-20 lg:my-5 justify-between  rounded-lg "
        >
          <Link
            to="/"
            className="ml-10"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} />
          </Link>

          <ul className="hidden lg:flex list-none gap-10">
            {navLinks.map((Link) => (
              <li
                key={Link.id}
                className={`${
                  active === Link.title ? "text-secondary" : "text-white"
                }
              hover:text-white text-[18px] font-medium cursor-pointer `}
                onClick={() => setActive(Link.title)}
              >
                <a href={`${Link.id}`}>
                  <img src={Link.img} alt="menu" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex mx-7 items-center gap-3">
            <h1 className=" px-5  py-1 rounded-3xl border-2">connect</h1>

            <div onClick={() => setMenuItems(!menuItems)} className="lg:hidden">
              <img src={menuIcon} alt="menu" />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
