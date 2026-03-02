import {motion, AnimatePresence} from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({isOpen, onClose}){

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 flex items-center justify-center z-[100]" initial={{clipPath: `circle(0% at ${origin})`}} animate={{clipPath: `circle(150% at ${origin})`}} exit={{clipPath: `circle(0% at ${origin})`}} transition={{duration: 0.7, ease: [0.4, 0, 0.2, 1]}} style={{background: "rgba(0,0,0,0.95)"}}>

          <button 
            onClick={handleClose} 
            className="absolute top-6 right-6 text-white text-5xl p-4 rounded-lg hover:bg-white/20 transition-all z-[110] cursor-pointer bg-white/10" 
            aria-label="Close Menu"
            style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
          >
            <FiX />
          </button>
          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Education",
              "Skills",
              "Projects",
              "Contact",
            ].map((item, index)=>(
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a href={`#${item.toLowerCase()}`} className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300" onClick={handleClose}>{item}</a>
              </motion.li>
            
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}