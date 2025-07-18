import type { Product } from '@/types/products/products';
import { create } from 'zustand';

type CartState = {
    items: Product[];
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item: Product) => {
        set((state: CartState) => ({
            items: [...state.items, item]
        }))
    },
    removeItem: (id: number) => {
        set((state: CartState) => ({
            items: state.items.filter((item) => item.id !== id)
        }))
    },
    clearCart: () => set({ items: [] }),
}));