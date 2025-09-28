'use client';

import { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface FloatingHotDealsButtonProps {
  onClick: () => void;
}

export default function FloatingHotDealsButton({ onClick }: FloatingHotDealsButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 group"
    >
      {/* Main Button */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Button Content */}
        <div className="relative bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110">
          <div className="flex items-center space-x-2 text-white">
            <Flame className="w-6 h-6 animate-bounce" />
            <span className="font-bold text-sm whitespace-nowrap">HOT DEALS</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-ping delay-300"></div>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-fade-in">
            🔥 25% OFF Netflix + Spotify!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </button>
  );
}