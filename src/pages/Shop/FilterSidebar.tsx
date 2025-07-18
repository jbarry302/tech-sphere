import { categories } from '@/data/mock';
import type { Category, Filter } from '@/types/products/products';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

type FilterSidebarProps = {
    filters: Filter,
    setFilters: React.Dispatch<React.SetStateAction<Filter>>,
    maxPrice: number,
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, maxPrice }) => {
    const [openSections, setOpenSections] = useState({ category: true, price: true, status: true });

    const handleCategoryChange = (slug: Category['slug']) => {
        setFilters(prev => ({ ...prev, category: slug }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)]}));
    };
    
    const handleStatusChange = (status: string) => {
        setFilters(prev => ({...prev, status: prev.status.includes(status) ? prev.status.filter(s => s !== status) : [...prev.status, status]}));
    };

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({...prev, [section]: !prev[section]}));
    }

    return (
        <div className="w-full lg:w-1/4 xl:w-1/5 space-y-6">
            {/* Search */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
                <div className="flex items-center bg-gray-700/50 rounded-full px-4 py-2 border border-gray-600">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search products..." value={filters.searchTerm} onChange={e => setFilters(prev => ({...prev, searchTerm: e.target.value}))} className="bg-transparent text-white placeholder-gray-500 focus:outline-none ml-3 w-full"/>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 p-4 rounded-xl">
                {/* Category Filter */}
                <div>
                    <button onClick={() => toggleSection('category')} className="w-full flex justify-between items-center text-lg font-bold text-white mb-4">
                        Categories {openSections.category ? <ChevronUp/> : <ChevronDown/>}
                    </button>
                    {openSections.category && <div className="space-y-2">
                        {categories.map(cat => (
                            <button key={cat.slug} onClick={() => handleCategoryChange(cat.slug)} className={`w-full text-left px-3 py-1 rounded-md transition-colors ${filters.category === cat.slug ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                                {cat.name}
                            </button>
                        ))}
                    </div>}
                </div>
                
                <hr className="border-gray-700 my-6"/>

                {/* Price Filter */}
                <div>
                    <button onClick={() => toggleSection('price')} className="w-full flex justify-between items-center text-lg font-bold text-white mb-4">
                        Price Range {openSections.price ? <ChevronUp/> : <ChevronDown/>}
                    </button>
                    {openSections.price && <div>
                        <input type="range" min="0" max={maxPrice} value={filters.priceRange[1]} onChange={handlePriceChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"/>
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                            <span>$0</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>}
                </div>

                <hr className="border-gray-700 my-6"/>

                {/* Status Filter */}
                <div>
                    <button onClick={() => toggleSection('status')} className="w-full flex justify-between items-center text-lg font-bold text-white mb-4">
                        Status {openSections.status ? <ChevronUp/> : <ChevronDown/>}
                    </button>
                    {openSections.status && <div className="space-y-3">
                        {['onSale', 'isNew', 'limitedDeal'].map(statusKey => (
                             <label key={statusKey} className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" checked={filters.status.includes(statusKey)} onChange={() => handleStatusChange(statusKey)} className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"/>
                                <span className="text-gray-300 capitalize">{statusKey.replace('is', '')}</span>
                            </label>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;