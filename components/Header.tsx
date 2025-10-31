
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 text-center">
        <h1 style={{fontFamily: "'Teko', sans-serif"}} className="text-4xl md:text-5xl font-semibold text-amber-400 tracking-wider">
          Chitrashilpi
        </h1>
        <p className="text-gray-400 text-sm md:text-base">The AI Image Artisan</p>
      </div>
    </header>
  );
};
