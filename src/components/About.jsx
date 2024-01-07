import { aboutImg, hiw } from "../assets"



const About = () => {
  return (
    <div>

    {/* <div className="m-10 border-2 items-center gap-10 p-10 flex rounded-2xl bg-[#25242454]">
      
      <div className="flex flex-col gap-7">
        <h1 className="text-3xl capitalize font-bold">about astrolith</h1>

        <p className="  font-medium text-[#ebe8e891]">
We merge an immersive gameplay with coding proficiency. Powered with Three.js, we aims to teach programming concepts through an interactive and dynamic gaming experience. 

Unlike conventional learning methods, we leverage pre-rendered video sequences to simulate player movements, allowing users to focus on coding logic rather than real-time rendering complexities.</p>
      </div>

      <div>
        <img src={aboutImg}/>
      </div>

      
    </div> */}

    <img src={aboutImg}/>

    <div></div>

    <img src={hiw}/>
    </div>

  )
}

export default About
