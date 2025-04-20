import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizes = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : '';

  return (
    <div className={containerClass}>
      <div className={`animate-spin rounded-full ${sizes[size]} border-t-2 border-b-2 border-purple-500`}></div>
    </div>
  );
};

export default LoadingSpinner;