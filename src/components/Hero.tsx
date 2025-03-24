
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-green-50 flex items-center justify-center overflow-hidden">
      {/* Abstract curved shapes and gradient bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right gradient swirl */}
        <motion.div 
          className="absolute -top-24 right-0 w-96 h-96 bg-gradient-to-br from-flex-green-light/20 to-flex-green/30 rounded-full filter blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 15 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Bottom left gradient */}
        <motion.div 
          className="absolute -bottom-48 -left-48 w-[40rem] h-[40rem] bg-gradient-to-tr from-flex-yellow/20 to-flex-orange/20 rounded-full filter blur-3xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
        
        {/* Small decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-12 h-12 bg-flex-green/40 rounded-full filter blur-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-flex-yellow/40 rounded-full filter blur-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
        />
        
        {/* Organic swirl behind chameleon */}
        <motion.div 
          className="absolute top-1/2 right-1/3 transform -translate-y-1/2 w-[35rem] h-[35rem] bg-gradient-to-r from-flex-green-light/10 via-flex-yellow/10 to-flex-orange/10 rounded-full filter blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
        />
        
        {/* Dynamic curved line */}
        <svg className="absolute top-1/2 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M0,500 Q250,300 500,500 T1000,500"
            stroke="#4CAF50"
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Second dynamic curved line */}
        <svg className="absolute top-1/3 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M0,300 Q400,600 800,350 T1000,400"
            stroke="#FFC107"
            strokeWidth="6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-28 md:py-40 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-flex-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Adapt, Evolve, <br/>
              <span className="bg-clip-text text-transparent bg-flex-gradient">
                Flourish.
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The AI-powered productivity app that adapts to your workflow and helps you achieve your goals through personalized task management.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/ai-planner" className="cta-button">
                Start Your Journey
              </Link>
              <Link to="/dashboard" className="flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
                See Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2 relative">
            <motion.div
              className="relative z-10 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Enhanced Chameleon Image with organic shadow and aura */}
              <motion.div 
                className="w-full max-w-[130%] md:max-w-[150%] -mr-8 md:-mr-16"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100 
                }}
              >
                {/* Subtle glow behind chameleon */}
                <div className="absolute inset-0 bg-gradient-to-r from-flex-green-light/30 via-flex-yellow/20 to-flex-orange/20 rounded-full filter blur-3xl transform scale-90 -z-10"></div>
                
                <img 
                  src="/lovable-uploads/e1cb6a1f-60f1-4bb8-8d81-cf7ad0476d86.png" 
                  alt="Flex Chameleon" 
                  className="w-full h-auto relative z-10" 
                  style={{ 
                    filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25))",
                  }}
                />
                
                {/* Small floating elements around chameleon */}
                <motion.div 
                  className="absolute top-1/4 -right-4 w-8 h-8 bg-flex-green/60 rounded-full filter blur-md"
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.div 
                  className="absolute bottom-1/3 -left-2 w-6 h-6 bg-flex-yellow/60 rounded-full filter blur-md"
                  animate={{ 
                    y: [0, 8, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            </motion.div>
            
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-flex-orange/15 rounded-full filter blur-3xl" />
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-flex-green/15 rounded-full filter blur-3xl" />
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-flex-yellow/25 rounded-full filter blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-36 h-36 bg-flex-green/25 rounded-full filter blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-flex-orange/25 rounded-full filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Hero;
