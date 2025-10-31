
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700/50 mt-8 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p className="text-sm">Made By Arunima Dutta</p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <p className="text-xs">&copy; {new Date().getFullYear()} Chitrashilpi</p>
          <a href="#" className="text-xs hover:text-amber-400 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs hover:text-amber-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
