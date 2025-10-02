import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, Cart } from '@/types';

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
  syncWithDatabase: (latestServices: Service[]) => void;
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
          // Apply 25% off Netflix when combo added via Hot Deals
          const netflixItem = items.find(item => item.service.id === '2' && item.addedViaModal);
          if (netflixItem) {
            const discountPerUnit = netflixItem.service.price * 0.25;
            return discountPerUnit * netflixItem.quantity;
          }
        }
        return 0;
      },

      getDiscountedTotal: () => {
        const { total } = get();
        // Subtract hot deal discount from subtotal for final total
        return total - get().getHotDealDiscount();
      },

      // Sync cart item prices and original prices with latest services from database
      syncWithDatabase: (latestServices: Service[]) => {
        const updatedItems = get().items.map(item => {
          const latest = latestServices.find(s => s.id === item.service.id);
          if (!latest) return item;
          return {
            ...item,
            service: {
              ...item.service,
              ...latest
            }
          };
        });

        const newTotal = updatedItems.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);

        set({ items: updatedItems, total: newTotal });
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);