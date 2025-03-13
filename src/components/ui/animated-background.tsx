
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
        backgroundImage: 'url(/animated-dots-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 z-0"></div>
      <div className="z-10 w-full">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
