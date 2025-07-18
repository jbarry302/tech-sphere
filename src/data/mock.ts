import type { Product, Category } from '@/types/products/products';

export const mockProducts: Product[] = [
  { id: 1, name: 'QuantumCore i9 Processor', category: 'CPUs', price: 499.99, originalPrice: 549.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=QuantumCore+i9', rating: 5, isNew: true, onSale: true, limitedDeal: false },
  { id: 2, name: 'HyperX Fury 32GB DDR5 RAM', category: 'Memory', price: 189.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=HyperX+32GB', rating: 4, isNew: false, onSale: false, limitedDeal: false },
  { id: 3, name: 'Corsair NVMe 2TB SSD', category: 'Storage', price: 229.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=Corsair+2TB', rating: 5, isNew: false, onSale: false, limitedDeal: false },
  { id: 4, name: 'AuraGlow Smart RGB Strip', category: 'IOT', price: 49.99, originalPrice: 69.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=AuraGlow+Strip', rating: 4, isNew: true, onSale: true, limitedDeal: true },
  { id: 5, name: 'Raptor Pro Gaming Mouse', category: 'Gears', price: 79.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=Raptor+Mouse', rating: 5, isNew: false, onSale: false, limitedDeal: false },
  { id: 6, name: 'NetGuardian WiFi 6E Router', category: 'IOT', price: 299.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=WiFi+6E+Router', rating: 5, isNew: true, onSale: false, limitedDeal: false },
  { id: 7, name: 'Stealth-7 Mechanical Keyboard', category: 'Gears', price: 149.99, originalPrice: 179.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=Stealth-7+Keyboard', rating: 4, isNew: false, onSale: true, limitedDeal: false },
  { id: 8, name: 'CryoFreeze CPU Cooler', category: 'CPUs', price: 129.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=CryoFreeze+Cooler', rating: 5, isNew: false, onSale: false, limitedDeal: false },
  { id: 9, name: 'Geoforce RTX 4090 GPU', category: 'GPUs', price: 1599.99, originalPrice: 1799.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=RTX+4090', rating: 5, isNew: true, onSale: true, limitedDeal: true },
  { id: 10, name: 'Patriot Viper 64GB DDR5 Kit', category: 'Memory', price: 259.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=Patriot+64GB', rating: 4, isNew: false, onSale: false, limitedDeal: false },
  { id: 11, name: 'FireCuda 4TB Gaming SSD', category: 'Storage', price: 349.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=FireCuda+4TB', rating: 5, isNew: true, onSale: false, limitedDeal: false },
  { id: 12, name: 'SmartHome Hub Pro', category: 'IOT', price: 129.99, originalPrice: 149.99, imageUrl: 'https://placehold.co/400x400/1a1a2e/e0e0e0?text=SmartHome+Hub', rating: 4, isNew: false, onSale: true, limitedDeal: false },
];

export const categories: Category[] = [
    { name: 'All Categories', slug: 'all' },
    { name: 'CPUs', slug: 'CPUs' },
    { name: 'GPUs', slug: 'GPUs' },
    { name: 'Memory', slug: 'Memory' },
    { name: 'Storage', slug: 'Storage' },
    { name: 'Gears', slug: 'Gears' },
    { name: 'IOT', slug: 'IOT' },
];