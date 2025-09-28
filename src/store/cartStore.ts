import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Service, Cart } from '@/types';

interface CartStore extends Cart {
  addItem: (service: Service) => void;
  removeItem: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (service: Service) => {
        const { items } = get();
        const existingItem = items.find(item => item.service.id === service.id);
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.service.id === service.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: state.total + service.price
          }));
        } else {
          set(state => ({
            items: [...state.items, { service, quantity: 1 }],
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
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);