import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, Cart } from '@/types';
import servicesConfig from '@/config/services-config.json';

interface CartItem {
  service: Service;
  quantity: number;
  addedViaModal?: boolean; // Track if item was added via hot deals modal
}

interface CartStore extends Cart {
  items: CartItem[];
  addItem: (service: Service, viaModal?: boolean) => void;
  removeItem: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getDiscountedTotal: () => number;
  hasHotDealCombo: () => boolean;
  getHotDealDiscount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (service: Service, viaModal = false) => {
        const { items } = get();
        const existingItem = items.find(item => item.service.id === service.id);
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.service.id === service.id
                ? { ...item, quantity: item.quantity + 1, addedViaModal: item.addedViaModal || viaModal }
                : item
            ),
            total: state.total + service.price
          }));
        } else {
          set(state => ({
            items: [...state.items, { service, quantity: 1, addedViaModal: viaModal }],
            total: state.total + service.price
          }));
        }
      },
      
      removeItem: (serviceId: string) => {
        const { items } = get();
        const item = items.find(item => item.service.id === serviceId);
        if (item) {
          set(state => ({
            items: state.items.filter(item => item.service.id !== serviceId),
            total: state.total - (item.service.price * item.quantity)
          }));
        }
      },
      
      updateQuantity: (serviceId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(serviceId);
          return;
        }
        
        const { items } = get();
        const item = items.find(item => item.service.id === serviceId);
        if (item) {
          const priceDiff = (quantity - item.quantity) * item.service.price;
          set(state => ({
            items: state.items.map(item =>
              item.service.id === serviceId
                ? { ...item, quantity }
                : item
            ),
            total: state.total + priceDiff
          }));
        }
      },
      
      clearCart: () => set({ items: [], total: 0 }),
      
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      hasHotDealCombo: () => {
        const { items } = get();
        const netflixItem = items.find(item => 
          item.service.id === '2' && item.addedViaModal
        );
        const spotifyItem = items.find(item => 
          item.service.id === '1' && item.addedViaModal
        );
        
        return !!(netflixItem && spotifyItem);
      },

      getHotDealDiscount: () => {
        const { hasHotDealCombo, items } = get();
        if (hasHotDealCombo()) {
          // Calculate discount based on the difference between original prices and current prices
          const netflixItem = items.find(item => item.service.id === '2');
          const spotifyItem = items.find(item => item.service.id === '1');
          
          if (netflixItem && spotifyItem) {
            const netflixOriginal = netflixItem.service.originalPrice || netflixItem.service.price;
            const spotifyOriginal = spotifyItem.service.originalPrice || spotifyItem.service.price;
            const currentNetflixPrice = netflixItem.service.price * netflixItem.quantity;
            const currentSpotifyPrice = spotifyItem.service.price * spotifyItem.quantity;
            const originalTotal = (netflixOriginal * netflixItem.quantity) + (spotifyOriginal * spotifyItem.quantity);
            const currentTotal = currentNetflixPrice + currentSpotifyPrice;
            
            // Return the savings (original - current)
            return Math.max(0, originalTotal - currentTotal);
          }
        }
        return 0;
      },

      getDiscountedTotal: () => {
        const { total } = get();
        // The total already includes discounted prices, so just return it
        return total;
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);