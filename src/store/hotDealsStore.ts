import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HotDealsStore {
  isModalOpen: boolean;
  hasSeenModal: boolean;
  lastShownDate: string | null;
  openModal: () => void;
  closeModal: () => void;
  markAsSeen: () => void;
  shouldShowModal: () => boolean;
}

export const useHotDealsStore = create<HotDealsStore>()(
  persist(
    (set, get) => ({
      isModalOpen: false,
      hasSeenModal: false,
      lastShownDate: null,

      openModal: () => set({ isModalOpen: true }),
      
      closeModal: () => set({ isModalOpen: false }),
      
      markAsSeen: () => {
        const today = new Date().toDateString();
        set({ 
          hasSeenModal: true, 
          lastShownDate: today,
          isModalOpen: false 
        });
      },
      
      shouldShowModal: () => {
        const { hasSeenModal, lastShownDate } = get();
        const today = new Date().toDateString();
        
        // Show modal if user hasn't seen it today
        if (!hasSeenModal || lastShownDate !== today) {
          return true;
        }
        
        return false;
      }
    }),
    {
      name: 'hot-deals-storage',
      partialize: (state) => ({
        hasSeenModal: state.hasSeenModal,
        lastShownDate: state.lastShownDate
      })
    }
  )
);