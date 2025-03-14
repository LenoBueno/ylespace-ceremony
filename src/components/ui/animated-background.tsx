
import React, { useState, useEffect } from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  animationSpeed?: number;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600">Something went wrong with the background animation.</div>;
    }
    return this.props.children;
  }
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = '',
  backgroundColor = '#ffffff',
  animationSpeed = 1
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/animated-dots-bg.svg';
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setImageError(true);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div 
        className={`min-h-screen w-full relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          backgroundColor,
        }}
      >
        {/* Animated dots background */}
        {!imageError ? (
          <div 
            className={`absolute inset-0 z-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{
              backgroundImage: 'url(/animated-dots-bg.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: `backgroundMove ${20 / animationSpeed}s linear infinite`,
            }}
          />
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-100 to-gray-200" />
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
          </div>
        )}
        
        {/* Content container */}
        <div className="z-10 w-full relative">
          {children}
        </div>

        <style jsx>{`
          @keyframes backgroundMove {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default AnimatedBackground;
