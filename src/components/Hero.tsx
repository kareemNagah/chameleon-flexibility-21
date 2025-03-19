
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const chameleonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const chameleon = chameleonRef.current;
    if (!chameleon) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = chameleon.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const eyeLeft = chameleon.querySelector('.eye-left') as HTMLElement;
      const eyeRight = chameleon.querySelector('.eye-right') as HTMLElement;
      
      if (eyeLeft && eyeRight) {
        const maxMove = 3;
        const centerX = width / 2;
        const centerY = height / 2;
        
        const moveX = ((x - centerX) / centerX) * maxMove;
        const moveY = ((y - centerY) / centerY) * maxMove;
        
        eyeLeft.style.transform = `translate(${moveX}px, ${moveY}px)`;
        eyeRight.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-chameleon-light opacity-50"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-64 w-64 rounded-full bg-chameleon-green/10 -top-20 -left-20 animate-float"></div>
        <div className="absolute h-48 w-48 rounded-full bg-chameleon-yellow/10 top-1/4 -right-10 animate-float animate-delay-300"></div>
        <div className="absolute h-56 w-56 rounded-full bg-chameleon-orange/10 bottom-10 left-1/3 animate-float animate-delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center relative z-10">
        {/* Left column - Text content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 pt-10 lg:pt-0 reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-chameleon
-green/10 text-chameleon-green-dark rounded-full animate-fade-in">
            Introducing Flex
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-chameleon-gradient">
            Adapt. Grow. <span className="relative">
              Flex
              <span className="absolute bottom-0 left-0 w-full h-1 bg-chameleon-gradient"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto lg:mx-0 animate-fade-in animate-delay-200">
            The adaptive habit building platform that evolves with you. Transform your routines and achieve your goals with personalized guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-fade-in animate-delay-300">
            <Link to="/signup" className="cta-button w-full sm:w-auto text-center">
              Start Your Journey
            </Link>
            <Link to="/features" className="px-6 py-3 rounded-full border border-chameleon-green/30 text-foreground/80 hover:text-foreground hover:border-chameleon-green/70 transition-all duration-300 w-full sm:w-auto text-center">
              Learn More
            </Link>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start space-x-8 pt-6 animate-fade-in animate-delay-400">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-2xl font-bold text-chameleon-green">1M+</span>
              <span className="text-sm text-foreground/60">Users</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-2xl font-bold text-chameleon-yellow">15K+</span>
              <span className="text-sm text-foreground/60">Reviews</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-2xl font-bold text-chameleon-orange">98%</span>
              <span className="text-sm text-foreground/60">Satisfaction</span>
            </div>
          </div>
        </div>
        
        {/* Right column - Chameleon illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end reveal">
          <div 
            ref={chameleonRef}
            className="relative w-[280px] md:w-[400px] h-[280px] md:h-[400px] animate-float"
          >
            {/* Simple chameleon illustration */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-chameleon-green to-chameleon-green-light opacity-20 blur-xl"></div>
            <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-chameleon-green rounded-full transform rotate-45 opacity-30"></div>
            
            {/* Body */}
            <div className="absolute top-[30%] left-[20%] w-[60%] h-[40%] bg-chameleon-green rounded-3xl"></div>
            
            {/* Head */}
            <div className="absolute top-[25%] left-[10%] w-[35%] h-[30%] bg-chameleon-green rounded-3xl"></div>
            
            {/* Tail */}
            <div className="absolute top-[35%] right-[5%] w-[35%] h-[20%] bg-chameleon-green rounded-full transform origin-left rotate-12"></div>
            <div className="absolute top-[38%] right-[5%] w-[25%] h-[14%] bg-chameleon-green rounded-full transform origin-left -rotate-12"></div>
            
            {/* Eyes */}
            <div className="absolute top-[28%] left-[15%] w-[9%] h-[9%] bg-white rounded-full">
              <div className="eye-left absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"></div>
            </div>
            <div className="absolute top-[25%] left-[25%] w-[9%] h-[9%] bg-white rounded-full">
              <div className="eye-right absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"></div>
            </div>
            
            {/* Legs */}
            <div className="absolute top-[60%] left-[25%] w-[8%] h-[20%] bg-chameleon-green rounded-full transform origin-top rotate-12"></div>
            <div className="absolute top-[60%] left-[45%] w-[8%] h-[20%] bg-chameleon-green rounded-full transform origin-top -rotate-12"></div>
            <div className="absolute top-[60%] left-[65%] w-[8%] h-[20%] bg-chameleon-green rounded-full transform origin-top rotate-12"></div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
