
import React, { useEffect, useState } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
}

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, className = '' }) => {
  const [dots, setDots] = useState<Dot[]>([]);
  
  useEffect(() => {
    // Create initial dots
    const initialDots: Dot[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // % of viewport width
      y: Math.random() * 100, // % of viewport height
      z: Math.random() * 100 - 50, // -50 to 50 (negative is "behind", positive is "in front")
      size: Math.random() * 2 + 1, // 1-3px base size
      opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0 opacity
      speed: Math.random() * 0.5 + 0.2, // Movement speed
    }));
    
    setDots(initialDots);

    // Animation loop
    const animateDots = () => {
      setDots(prevDots => 
        prevDots.map(dot => {
          // Move dot toward viewer (increasing z)
          let newZ = dot.z + dot.speed;
          
          // Reset dot if it moves too close to viewer
          if (newZ > 50) {
            return {
              ...dot,
              x: Math.random() * 100,
              y: Math.random() * 100,
              z: -50, // Start from far away
              size: Math.random() * 2 + 1,
              opacity: Math.random() * 0.7 + 0.3,
              speed: Math.random() * 0.5 + 0.2,
            };
          }
          
          // Calculate visual size based on z position (perspective effect)
          const visualSize = dot.size * (1 + (newZ + 50) / 50); // Grow larger as z increases
          
          // Calculate visual opacity based on z (more visible as it comes closer)
          const visualOpacity = Math.min(1, dot.opacity * (1 + newZ / 30));
          
          return {
            ...dot,
            z: newZ,
            size: visualSize,
            opacity: visualOpacity,
          };
        })
      );
    };

    const interval = setInterval(animateDots, 50); // Update every 50ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
        backgroundImage: 'radial-gradient(circle at center, rgba(24, 24, 27, 0.9) 0%, rgba(12, 12, 14, 1) 100%)',
        backgroundColor: '#0c0c0e',
      }}
    >
      {/* Animated dots */}
      <div className="absolute inset-0 z-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              transform: `translateZ(${dot.z}px)`,
              zIndex: dot.z > 20 ? 20 : 0, // Dots with z > 20 will appear above content
              filter: `blur(${Math.max(0, (1 - dot.z / 50) * 1)}px)`, // More blur for distant dots
            }}
          />
        ))}
      </div>
      
      {/* Content container with glass effect */}
      <div className="z-10 w-full relative">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
