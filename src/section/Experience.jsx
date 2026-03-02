import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "B.Tech in Computer Science & Engineering (CGPA: 9.01/10)",
    school: "Haldia Institute of Technology, Haldia",
    duration: "2023 - 2027",
    description: "Focused on Web Development, GanAI, DSA, and real-world projects."
  },
  {
    role: "Higher Secondary Education(12th) (Percentage: 79.2%)",
    school: "Siulipur Paschimbar High School, Purba Medinipur",
    duration: "2023",
    description: "Science stream (PCMB)."
  },
  {
    role: "Secondary Education(10th) (Percentage: 86.43%)",
    school: "Siulipur Paschimbar High School, Purba Medinipur",
    duration: "2021",
    description: ""
  }
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [0, start, end], [0, 0, 1]);
  const opacity = useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, start, end, 1], [0, 0, 1, 1]);

  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if(layout === 'desktop') {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]" style={{ scale, opacity }}> 
        </motion.div>
        <motion.div className={`absolute ${idx % 2 === 0 ? '-top-8' : '-bottom-8'} w-[3px] bg-white/40`} style={{ height: 40, opacity: lineOpacity, scaleY: scale }}>
        </motion.div>
        <motion.article className={`absolute ${idx % 2 === 0 ? 'bottom-12' : 'top-12'} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`} style={{ y, opacity, scale, maxWidth: "90vw" }} transition={{duration: 0.4, delay: idx*0.15}}>
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 md-3">{exp.school} | {exp.duration}</p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>

      </div>
    )
  }
  return (
    <div className="relative flex items-start">
      <motion.div className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]" style={{ scale, opacity }}>
      </motion.div>
      <motion.article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg" style={{opacity, x}} transition={{duration: 0.4, delay: idx*0.15}}>
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">{exp.school} | {exp.duration}</p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  )
}

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() =>{
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 400*experiences.length : 450*experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(() => {
    const totalItems = experiences.length;
    return experiences.map((_, idx) => {
      // Compress all animations into first 70% of scroll
      return ((idx + 1) / totalItems) * 0.7;
    });
  }, []);

  const lineSize = useTransform(scrollYProgress, (v)=> `${Math.min(v*100, 100)}%`);


  return (
    <section id="education" className="relative bg-black text-white">
      <div ref={sceneRef} style={{height: `${SCENE_HEIGHT_VH}vh` , minHeight: '120vh'}} className="relative">
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 mb-16 text-center">
            <span className="text-[#00bf8f]">My Educational Journey</span>
          </h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                  <motion.div className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left " style={{width: lineSize}}>

                  </motion.div>

                </div>
                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx} start={idx === 0 ? 0 : thresholds[idx-1]} end={thresholds[idx]} scrollYProgress={scrollYProgress} layout="desktop" />
                  ))}
                </div>
              </div>
            )}
            {isMobile && (
              <div className="relative w-full max-w-md">
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                    <motion.div className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top" style={{height: lineSize}}>
                    </motion.div>
                  </div>
                  <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                    {experiences.map((exp, idx) => (
                      <ExperienceItem key={idx} exp={exp} idx={idx} start={idx === 0 ? 0 : thresholds[idx-1]} end={thresholds[idx]} scrollYProgress={scrollYProgress} layout="mobile" />
                    ))}
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}