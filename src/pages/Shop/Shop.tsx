import { mockProducts } from '@/data/mock';
import type { Filter, Product } from '@/types/products/products';
import { ChevronDown } from 'lucide-react';
import type React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from '../Products/components/ProductCard';
import FilterSidebar from './FilterSidebar';

const Shop: React.FC = () => {
    const products = mockProducts;
    const onAddToCart = (product: Product) => {};
    const maxPrice = Math.ceil(Math.max(...products.map(p => p.originalPrice || p.price)) / 100) * 100;
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState<Filter>({
        searchTerm: '',
        category: 'all',
        priceRange: [0, maxPrice],
        status: [],
        sortBy: 'featured'
    });

    useEffect(() => {
        let tempProducts = [...products];

        // Search term
        if (filters.searchTerm) {
            tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
        }
        // Category
        if (filters.category !== 'all') {
            tempProducts = tempProducts.filter(p => p.category === filters.category);
        }
        // Price
        tempProducts = tempProducts.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
        // Status
        if(filters.status.length > 0) {
            tempProducts = tempProducts.filter(p => filters.status.every(s => p[s as keyof typeof p]));
        }
        
        // Sorting
        if (filters.sortBy === 'price-asc') {
            tempProducts.sort((a,b) => a.price - b.price);
        } else if (filters.sortBy === 'price-desc') {
            tempProducts.sort((a,b) => b.price - a.price);
        } else if (filters.sortBy === 'rating') {
            tempProducts.sort((a,b) => b.rating - a.rating);
        }

        setFilteredProducts(tempProducts);
    }, [filters, products]);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8">
                <FilterSidebar filters={filters} setFilters={setFilters} maxPrice={maxPrice} />

                {/* Product Grid */}
                <div className="w-full lg:w-3/4 xl:w-4/5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                           {filters.category === 'all' ? 'All Products' : filters.category} ({filteredProducts.length})
                        </h2>
                        <div className="relative">
                            <select value={filters.sortBy} onChange={e => setFilters(prev => ({...prev, sortBy: e.target.value}))} className="bg-gray-800 border border-gray-700 text-white rounded-lg pl-4 pr-10 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">By Rating</option>
                            </select>
                            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                        </div>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-800/50 rounded-xl">
                            <h3 className="text-2xl font-bold text-white">No Products Found</h3>
                            <p className="text-gray-400 mt-2">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;