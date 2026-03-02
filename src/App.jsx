import Navbar from "./components/Navbar";
import Home from "./section/Home";
import About from "./section/About";
import Skills from "./section/Skills";
import Projects from "./section/Projects";
import Experience from "./section/Experience";
import Contact from "./section/Contact";
import Footer from "./section/Footer";
//import ParticlesBackground from './components/ParticlesBackground';
import CustomCursor from "./components/CustomCursor";
import MusicPlayer from "./components/MusicPlayer";
import React from "react";
import IntroAnimation from "./components/IntroAnimation";



export default function App(){
  const [introDone, setIntroDone] = React.useState(false);
  return(
<>
    {!introDone && <IntroAnimation onFinish={()=> setIntroDone(true)}/>}
    {introDone && (
    <div className="relative gradient text-white">
      <CustomCursor/>
      <MusicPlayer/>
      {/* <ParticlesBackground/> */}
      <Navbar/>
      <Home/>
      <About/>
      <Experience/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
    )}
    </>
  )
}