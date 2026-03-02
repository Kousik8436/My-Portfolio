import OverlayMenu from './OverlayMenu'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { IoMenu } from "react-icons/io5";
import { HiHome, HiUser, HiLightningBolt, HiBriefcase, HiAcademicCap, HiMail } from "react-icons/hi";
import { FaCode } from "react-icons/fa";
import { motion } from 'framer-motion';

export default function Navbar (){

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  const navLinks = [
    { name: 'Home', icon: HiHome },
    { name: 'About', icon: HiUser },
    { name: 'Education', icon: HiAcademicCap },
    { name: 'Skills', icon: FaCode },
    { name: 'Projects', icon: HiBriefcase },
    { name: 'Contact', icon: HiMail }
  ];

  useEffect(()=>{
    const handleScroll = () =>{
      const currentScrollY = window.scrollY;

      if(currentScrollY < 100){
        setVisible(true);
        setScrolled(false);
      } else if(currentScrollY > lastScrollY.current && currentScrollY > 100){
        setVisible(false);
      } else if(currentScrollY < lastScrollY.current){
        setVisible(true);
        setScrolled(true);
      }
      
      lastScrollY.current = currentScrollY;

      // Hide navbar after 3 seconds of no scrolling
      if(scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if(window.scrollY > 100) setVisible(false);
      }, 3000);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if(scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);
  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-[100] transition-all duration-500 ${
          scrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onMouseEnter={() => setVisible(true)}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: menuOpen ? 0 : 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ pointerEvents: menuOpen ? 'none' : 'auto' }}
        >
          <Logo />
        </motion.div>
        
        {/* Desktop Navigation Icons */}
        <motion.div
          className='hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 relative'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={`#${link.name.toLowerCase()}`}
                className='relative group p-3 rounded-xl overflow-visible'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.3, y: -5 }}
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-[#1cd8d2]/20 via-[#00bf8f]/20 to-[#302b63]/20 border border-white/20 rounded-xl'
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 180 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <Icon className='relative z-10 text-2xl text-white/70 group-hover:text-[#1cd8d2] transition-colors duration-300' />
                <span className='absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 z-50'>
                  {link.name}
                  <span className='absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10' />
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div 
          className='block lg:hidden'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {!menuOpen && (
            <motion.button
              onClick={()=> setMenuOpen(true)} 
              className='relative text-white text-3xl focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300' 
              aria-label='open Menu'
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoMenu />
            </motion.button>
          )}
        </motion.div>
        
        {/* Desktop CTA Button */}
        <motion.div 
          className='hidden lg:block'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href='#contact' 
            className='bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'
          >
            Hire Me
          </a>
        </motion.div>
      </motion.nav>
      <OverlayMenu isOpen = {menuOpen} onClose={()=> setMenuOpen(false)}/>
    </>
  )
}
