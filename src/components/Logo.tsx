import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'dark' | 'gradient' | 'brand';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'default', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'text-xl', // 1.5rem
    medium: 'text-4xl', // 2.2rem  
    large: 'text-5xl' // 3rem
  };

  const paddingClasses = {
    small: 'pl-6', // 25px
    medium: 'pl-9', // 35px
    large: 'pl-10' // 40px
  };

  const dotSizes = {
    small: { main: 'w-4 h-4', secondary: 'w-2.5 h-2.5' },
    medium: { main: 'w-5 h-5', secondary: 'w-3.5 h-3.5' },
    large: { main: 'w-6 h-6', secondary: 'w-4 h-4' }
  };

  const dotPositions = {
    small: { main: '-left-2 top-0.5', secondary: '-left-3 bottom-0.5' },
    medium: { main: '-left-3 top-0.5', secondary: '-left-4 bottom-0.5' },
    large: { main: '-left-4 top-1', secondary: '-left-5 bottom-1' }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'dark':
        return {
          container: 'text-white',
          dataText: 'text-white',
          smartText: 'text-green-300'
        };
      case 'gradient':
        return {
          container: 'text-white',
          dataText: 'text-white', 
          smartText: 'text-green-300'
        };
      case 'brand':
        return {
          container: 'text-gray-800',
          dataText: 'text-gray-800',
          smartText: 'text-blue-800'
        };
      default:
        return {
          container: 'text-blue-600',
          dataText: 'text-blue-600',
          smartText: 'text-green-600'
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`
      ${sizeClasses[size]} 
      ${paddingClasses[size]}
      ${variantClasses.container}
      font-bold relative inline-flex items-center
      ${className}
    `}>
      {/* Punto principal (verde claro) */}
      <div className={`
        ${dotSizes[size].main}
        ${dotPositions[size].main}
        bg-green-300 rounded-full absolute
        animate-pulse
      `} style={{
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }} />
      
      {/* Punto secundario (azul claro) */}
      <div className={`
        ${dotSizes[size].secondary}
        ${dotPositions[size].secondary}
        bg-blue-300 rounded-full absolute
        animate-pulse
      `} style={{
        animationDuration: '2s',
        animationDelay: '1s',
        animationIterationCount: 'infinite'
      }} />
      
      {/* Texto del logo */}
      <span className={variantClasses.dataText}>Data</span>
      <span className={variantClasses.smartText}>Smart</span>
    </div>
  );
};

export default Logo; 