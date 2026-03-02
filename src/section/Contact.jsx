import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import Astra from "../assets/Astra.png"
import { motion } from "framer-motion";


const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;



export default function Contact(){
  const [fromData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handelChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(errors[name]){
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }))
    }
  }

  const validateFrom = () =>{
    const required = ["name", "email", "message"];
    const newErrors = {};
    required.forEach((field) => {
      if(!fromData[field].trim()){
        newErrors[field] = "This field is required";
      }
    });
    
    if(fromData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromData.email)){
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  }

  const handelSubmit = async (e) =>{
    e.preventDefault();
    if(!validateFrom()) return;
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {...fromData, from_name: fromData.name, reply_to: fromData.email}, PUBLIC_KEY);
      setStatus("success");
      setFormData({name: "", email: "", message: ""});
  }catch(err){
    console.error("EmailJS Error:", err);
    setStatus("error");
  }
}


  return (
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col items-center gap-10">
      <ParticlesBackground />
      <motion.h2 className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] relative z-10" initial={{opacity: 0, y: -30}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.6}}>Contact Me</motion.h2>
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div className="w-full md:w-1/2 flex justify-center" initial={{opacity: 0, x: -50}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.6}}>
          <motion.img src={Astra} alt="Contact" className="w-72 md:w-140 rounded-2xl shadow-lg object-cover" animate={{y: [0,-10,0]}} transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}/>
        </motion.div>

        {/* right side form */}

        <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10" initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.6}}>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <form className="flex flex-col gap-5" onSubmit={handelSubmit}>
            <div className="flex flex-col">
              <label className="mb-1">Your Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" placeholder="Kousik Maity" value={fromData.name} onChange={handelChange} className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray/500"} text-white focus:outline-none focus:border-blue-500`} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Your Email<span className="text-red-500">*</span></label>
              <input type="text" name="email" placeholder="Write Your Email" value={fromData.email} onChange={handelChange} className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "border-gray/500"} text-white focus:outline-none focus:border-blue-500`}/>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Your Message<span className="text-red-500">*</span></label>
              <textarea name="message" placeholder="Write Your Message" rows={5} value={fromData.message} onChange={handelChange} className={`p-3 rounded-md bg-white/10 border ${errors.message ? "border-red-500" : "border-gray/500"} text-white focus:outline-none focus:border-blue-500`}></textarea>
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
            </div>
                {status && (
                  <p className={`text-sm mt-2 ${status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : "text-yellow-400"}`}>
                    {status === "sending" ? "sending..." : status === "success" ? "Message sent successfully✅" : "❌Failed to send message. Please try again."}
                  </p>
                )}
            <motion.button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition" whileHover={{scale:1.05}} whileTap={{scale:0.95}} disabled={status === "sending"} type="submit">
                  {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

        </motion.div>

      </div>
    </section>
  )
}