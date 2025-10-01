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
      className="fixed bottom-6 right-4 sm:right-20 z-40 group"
    >
      {/* Main Button */}
      <div className="relative">
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-full blur-lg opacity-60 group-hover:opacity-90 transition-all duration-300"
          style={{ 
            background: 'linear-gradient(135deg, #2596be 0%, #1e7ba8 50%, #165a7a 100%)'
          }}
        ></div>
        
        {/* Button Content */}
        <div 
          className="relative rounded-full p-3 sm:p-4 shadow-xl transform transition-all duration-300 group-hover:scale-105 border border-white/20"
          style={{ 
            background: 'linear-gradient(135deg, #2596be 0%, #1e7ba8 100%)'
          }}
        >
          <div className="flex items-center space-x-2 text-white">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
            <span className="font-semibold text-xs sm:text-sm whitespace-nowrap tracking-wide">HOT DEALS</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 drop-shadow-sm" />
          </div>
        </div>

        {/* Floating Sparkles - Updated colors */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-80"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-ping delay-500 opacity-70"></div>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
            <div className="flex items-center space-x-1">
              <span>🔥</span>
              <span className="font-medium">25% OFF Netflix + Spotify!</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
          </div>
        )}
      </div>
    </button>
  );
}