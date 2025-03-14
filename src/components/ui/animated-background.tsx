
import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, className = '' }) => {

  return (
    <div 
      className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundColor: '#ffffff', // White background
      }}
    >
      {/* Animated dots background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/animated-dots-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
        }}
      />
      
      {/* Content container */}
      <div className="z-10 w-full relative">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
