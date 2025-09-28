'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import HotDealsModal from './HotDealsModal';
import FloatingHotDealsButton from './FloatingHotDealsButton';

interface HotDealsContextType {
  showModal: () => void;
  hideModal: () => void;
  isModalOpen: boolean;
}

const HotDealsContext = createContext<HotDealsContextType | undefined>(undefined);

export const useHotDeals = () => {
  const context = useContext(HotDealsContext);
  if (!context) {
    throw new Error('useHotDeals must be used within a HotDealsProvider');
  }
  return context;
};

interface HotDealsProviderProps {
  children: ReactNode;
}

export default function HotDealsProvider({ children }: HotDealsProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Always show the floating button after 3 seconds
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(buttonTimer);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    sessionStorage.setItem('hotDealsShown', 'true');
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HotDealsContext.Provider value={{ showModal, hideModal, isModalOpen }}>
      {children}
      {showButton && (
        <FloatingHotDealsButton onClick={showModal} />
      )}
      <HotDealsModal isOpen={isModalOpen} onClose={hideModal} />
    </HotDealsContext.Provider>
  );
}