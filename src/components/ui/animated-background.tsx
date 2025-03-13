
import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`min-h-screen w-full relative flex items-center justify-center ${className}`}
      style={{
        backgroundImage: 'url(/animated-dots-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedBackground;
