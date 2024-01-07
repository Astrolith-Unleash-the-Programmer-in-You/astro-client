import React from "react";

import {
  aboutImg,
  aboutMobile,
  footer,
  footerMobile,
  hiw,
  hiwMobile,
  tech,
  techMobile,
  title,
} from "../assets";
import { WhyAstro } from "../components";
// import About from '../components/About'
import Hero from "../components/Hero";
import TopPlayers from "../components/TopPlayers";

const Home = () => {
  return (
    <div>
      <Hero />

      <div className="">
        <WhyAstro />
      </div>

      {/* laptop view */}
      <div className="hidden lg:block md:block">
        <img src={aboutImg} />

        <img className="m-auto mt-20" src={hiw} />

        <img className="m-auto mt-20" src={title} />

        <TopPlayers />

        <img className="m-auto mt-20" src={tech} />

        <img className="m-auto mt-20" src={footer} />
      </div>

      {/* mobile view */}
      <div className=" lg:hidden md:hidden">
        <img className="m-auto mt-20" src={aboutMobile} />

        <img className="m-auto mt-20" src={hiwMobile} />

        <img className="m-auto mt-20" src={title} />

        <TopPlayers />

        <img className="m-auto mt-[3rem]" src={techMobile} />

        <img className="m-auto mt-20" src={footerMobile} />
      </div>
    </div>
  );
};

export default Home;
