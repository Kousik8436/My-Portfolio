import React from 'react'
import { motion } from 'framer-motion'
import { SkillsInfo } from '../components/constants';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "backOut"
      }
    })
  };

  return (
    <section id='skills' className='w-full min-h-screen py-20 flex flex-col items-center justify-center relative bg-black text-white overflow-x-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse' />
        <div className='absolute -bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300 rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse' />
      </div>
      <div className='text-center mb-12 relative z-10'>
        <motion.h2 className='text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] mb-4' initial={{opacity: 0, y: -30}} whileInView={{opacity:1, y:0}} transition={{duration:0.5, delay:0.1}}>MY SKILLS</motion.h2>
        <motion.p className='mt-2 text-white/70 text-base sm:text-lg max-w-3xl mx-auto px-4' initial={{opacity: 0, y: -10}} whileInView={{opacity:1, y:0}} transition={{duration:0.5, delay:0.1}}>A collection of my technical skills and expertise honed through various projects and experiences</motion.p>
      </div>
      <motion.div 
        className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl px-4 z-10'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SkillsInfo.map((category, categoryIndex) => (
          <motion.div 
            key={category.title} 
            className='relative group flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-[#0a1628]/90 to-[#0d1b2a]/90 backdrop-blur-md border-2 border-[#1cd8d2]/20 overflow-hidden'
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02, 
              borderColor: 'rgba(28, 216, 210, 0.5)',
              boxShadow: '0 0 30px rgba(28, 216, 210, 0.2)',
              transition: { duration: 0.3 }
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-[#1cd8d2]/5 via-transparent to-[#00bf8f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <h3 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] relative z-10'>{category.title}</h3>
            <div className='flex flex-wrap justify-center gap-3 w-full relative z-10'>
              {category.skills.map((skill, skillIndex) => (
                <motion.div 
                  key={skillIndex} 
                  className='flex items-center gap-3 px-5 py-3 rounded-full bg-[#0a1628]/80 border border-[#1cd8d2]/30 hover:border-[#1cd8d2] hover:bg-[#1cd8d2]/10 transition-all duration-300'
                  custom={skillIndex}
                  variants={skillVariants}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img 
                    src={skill.logo} 
                    alt={skill.name} 
                    className='w-6 h-6 object-contain'
                  />
                  <span className='text-sm text-gray-300 font-medium whitespace-nowrap'>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Skills