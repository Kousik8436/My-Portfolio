import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "Kousik's Food Studio",
    description: "A real-time food delivery app with live order tracking and interactive maps.",
    tech: "React • MongoDB • Express • Node.js",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Resturant-Application-Backend.git",
    live: "https://resturant-application-frontend.vercel.app/"
  },
  {
    id: 2,
    title: "Product Cart Web Site",
    description: "A dynamic e-commerce platform with AI-powered product recommendations.",
    tech: "React • MongoDB • Express • Node.js",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/TechCart.git",
    live: "https://techcart-2.onrender.com/"
  },
  {
    id: 3,
    title: "J.A.R.V.I.S AI Desktop Assistant",
    description: "An AI-powered desktop assistant with voice recognition and task automation.",
    tech: "Python • SpeechRecognition • pyttsx3 • OpenAI API • LLM Integration • Prompt Engineering",
    category: "GenAI",
    image: "https://www.codewithrandom.com/wp-content/uploads/2024/04/image-2-1024x621.png",
    github: "https://github.com/Kousik8436/J.A.R.V.I.S-Ai-Desktop-Assistant.git",
    live: "https://drive.google.com/file/d/1ulZwID8uMUWT8dYJcefzLRXaUMl9Kl6w/view?usp=drivesdk"
  },
  {
    id: 4,
    title: "Gamified Learning Platform",
    description: "An interactive learning platform that gamifies education with quizzes, badges, and leaderboards.",
    tech: "React • MongoDB • Express • Node.js",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436",
    live: "https://saheb20004.github.io/Edu-App/"
  },
  {
    id: 5,
    title: "ThinkBoard Note App",
    description: "A note-taking app with CRUD operations and user authentication.",
    tech: "React • MongoDB • Express • Node.js",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/ThinkBoard.git",
    live: "https://thinkboard-frontend-i348.onrender.com/"
  },
  {
    id: 6,
    title: "Customer Churn Prediction with ANN",
    description: "A machine learning model to predict customer churn using an Artificial Neural Network.",
    tech: "Python • TensorFlow • Keras • Scikit-learn • Data Visualization • ANN",
    category: "GenAI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/ANN-Churn-Probability.git",
    live: "https://ann-churn-probability.onrender.com/"
  },
  {
    id: 7,
    title: "Food Delivery E-Commerce Platform",
    description: "A food delivery platform with AI-powered chat support and real-time order tracking.",
    tech: "React • MongoDB • Express • Node.js • Stripe • Cloudinary",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Farm2Home-Grocery-App.git",
    live: "https://farm2home-grocery-app.onrender.com/"
  },
  {
    id: 8,
    title: "KOSMOSAI Assistant",
    description: "An AI assistant that provides weather updates, news summaries, and personalized recommendations.",
    tech: "• React • Gemini API • Axios",
    category: "React",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/KosmosAI-chatbot.git",
    live: "https://kosmosai.netlify.app/"
  },
  {
    id: 9,
    title: "Brutal Startup Idea Validator",
    description: "An AI-powered tool that evaluates startup ideas based on market trends, competition, and potential profitability.",
    tech: "Python • Streamlit • OpenAI API • LLM Integration • Prompt Engineering",
    category: "GenAI",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    github: "https://github.com/arnab06082004/StartUp_Validator.git",
    live: "https://startupvalidator.streamlit.app/"
  },
  {
    id: 10,
    title: "Typing Speed Tester",
    description: "A web app to test and improve your typing speed with real-time feedback.",
    tech: "React • Hooks • Tailwind CSS",
    category: "React",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Typing-Speed-Tester.git",
    live: "https://typingspeedkousik.netlify.app/"
  },
  {
    id: 11,
    title: "LSTM Sentiment Analysis - IMDB Reviews",
    description: "A sentiment analysis model that classifies movie reviews as positive or negative using a Long Short-Term Memory (LSTM) network.",
    tech: "Python • TensorFlow • Keras • Scikit-learn • Data Visualization • LSTM • Natural Language Processing",
    category: "GenAI",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/LSTM-Sentiment-Analysis.git",
    live: "https://lstm-sentiment-analysis-yjbz.onrender.com/"
  },
  {
    id: 12,
    title: "Queue Management System",
    description: "A web app to manage queues in real-time with features like ticket generation and estimated wait times.",
    tech: "React • WebSockets • Node.js • Express",
    category: "React",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Queue-Management-System.git",
    live: "https://queuemanagebykousik.netlify.app/"
  },
  {
    id: 13,
    title: "IMDB Sentiment Analysis with RNN",
    description: "A sentiment analysis model that classifies movie reviews as positive or negative using a Recurrent Neural Network.",
    tech: "Python • TensorFlow • Keras • Scikit-learn • Data Visualization • RNN • Natural Language Processing",
    category: "GenAI",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/RNN-Project.git",
    live: "https://rnn-project.onrender.com/"
  },
  {
    id: 14,
    title: "Mood-Based Music Player",
    description: "A music player that recommends songs based on the user's current mood using AI algorithms.",
    tech: "React • Hooks • Tailwind CSS",
    category: "React",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Mood-Based-Music-Page.git",
    live: "https://moodbasedmusickousik.netlify.app/"
  },
  {
    id: 15,
    title: "Digital Clock",
    description: "A sleek digital clock web app that displays the current time with customizable themes and formats.",
    tech: "React • Hooks • Tailwind CSS",
    category: "React",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Digital-Clock-.git",
    live: "https://digitalclockbykousik.netlify.app/"
  },
  {
    id: 16,
    title: "Advanced To Do List",
    description: "An advanced to-do list app with features like task prioritization, deadlines, and progress tracking.",
    tech: "HTML • CSS • JavaScript",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Advanced-ToDo-List-App.git",
    live: "https://advancedtodolistbykousik.netlify.app/"
  },
  {
    id: 17,
    title: "Career Suggestion App",
    description: "An AI-powered career suggestion app that provides personalized career recommendations based on user input and preferences.",
    tech: "React • Hooks • Tailwind CSS",
    category: "React",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    github: "https://github.com/Kousik8436/Career-Suggestion-Page.git",
    live: "https://careersuggestionkousik.netlify.app/"
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = activeFilter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="min-h-screen bg-black py-20 px-4 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">Featured</span>
          {" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]">Projects</span>
        </motion.h2>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["All", "Full Stack", "React", "GenAI"].map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setCurrentIndex(0); }}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '2000px' }}>
            {filteredProjects.map((project, index) => {
              const position = (index - currentIndex + filteredProjects.length) % filteredProjects.length;
              return (
                <motion.div
                  key={project.id}
                  className="absolute w-full max-w-[400px]"
                  style={{
                    zIndex: filteredProjects.length - position,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    y: position * 40,
                    scale: 1 - position * 0.08,
                    opacity: position < 3 ? 1 - position * 0.25 : 0,
                    rotateY: position * -15,
                    rotateZ: position * -5,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative cursor-pointer" onClick={() => window.open(project.live, '_blank')}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] rounded-3xl opacity-20 blur-2xl"></div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="relative w-full h-[450px] object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-4">{filteredProjects[currentIndex].title}</h3>
                <p className="text-lg text-[#1cd8d2] mb-6">{filteredProjects[currentIndex].tech}</p>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">{filteredProjects[currentIndex].description}</p>
                <motion.a 
                  href={filteredProjects[currentIndex].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-gray-800 px-6 py-3 rounded-full hover:bg-gray-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-2xl" />
                  View Code
                </motion.a>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all"
              >
                <FaChevronLeft className="text-xl" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all"
              >
                <FaChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}