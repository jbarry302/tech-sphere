import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, Menu, X, Cpu, MemoryStick, HardDrive, Gamepad2, Router, Tag, Zap, Star, ChevronDown, ChevronUp } from 'lucide-react';

// Mock Product Data - Expanded with more details for filtering
const mockProducts = [
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

const categories = [
    { name: 'All Categories', slug: 'all' },
    { name: 'CPUs', slug: 'CPUs' },
    { name: 'GPUs', slug: 'GPUs' },
    { name: 'Memory', slug: 'Memory' },
    { name: 'Storage', slug: 'Storage' },
    { name: 'Gears', slug: 'Gears' },
    { name: 'IOT', slug: 'IOT' },
];

// Helper component for star ratings
const StarRating = ({ rating, size = 'w-4 h-4' }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`${size} ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Enhanced Product Card for Shop Page
const ProductCard = ({ product, onAddToCart }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-blue-500/20">
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.onSale && discount > 0 && 
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag size={12}/> {discount}% OFF
                </span>
            }
            {product.limitedDeal && 
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Zap size={12}/> Limited Deal
                </span>
            }
            {product.isNew && 
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            }
        </div>
      </div>
      <div className="p-5 flex flex-col h-[calc(100%-14rem)]">
        <h3 className="text-lg font-bold text-gray-100 truncate group-hover:text-blue-400 transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-3">{product.category}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-extrabold text-white">${product.price}</p>
            {product.originalPrice && <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>}
          </div>
          <StarRating rating={product.rating} />
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform transition-all duration-300 group-hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};


// Header Component
const Header = ({ cartCount, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" onClick={() => handleNavClick('home')} className="text-2xl font-bold text-white flex items-center">
            <Cpu className="w-8 h-8 mr-2 text-blue-500" /> TechSphere
          </a>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <a href="#home" onClick={() => handleNavClick('home')} className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Home</a>
            <a href="#shop" onClick={() => handleNavClick('shop')} className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Shop</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"><User className="w-6 h-6" /></button>
            <button className="relative p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center ring-2 ring-gray-900">{cartCount}</span>}
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" onClick={() => handleNavClick('home')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Home</a>
            <a href="#shop" onClick={() => handleNavClick('shop')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Shop</a>
          </div>
        </div>
      )}
    </header>
  );
};

// Home Page Component
const HomePage = ({ products, onAddToCart }) => (
  <>
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 opacity-50 z-10"></div>
      <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
        <source src="https://cdn.pixabay.com/video/2020/12/11/56997-481923485_large.mp4" type="video/mp4" />
      </video>
      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tighter">Build Your Ultimate Rig</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">Highest quality components, IoT devices, and gaming gear. Shipped fast, built to last.</p>
        <a href="#products" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105">Shop Now</a>
      </div>
    </section>
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}
        </div>
      </div>
    </section>
  </>
);

// Filter Sidebar Section for Shop Page
const FilterSidebar = ({ filters, setFilters, maxPrice }) => {
    const [openSections, setOpenSections] = useState({ category: true, price: true, status: true });

    const handleCategoryChange = (slug) => {
        setFilters(prev => ({ ...prev, category: slug }));
    };

    const handlePriceChange = (e) => {
        setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)]}));
    };
    
    const handleStatusChange = (status) => {
        setFilters(prev => ({...prev, status: prev.status.includes(status) ? prev.status.filter(s => s !== status) : [...prev.status, status]}));
    };

    const toggleSection = (section) => {
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


// Shop Page Component
const ShopPage = ({ products, onAddToCart }) => {
    const maxPrice = Math.ceil(Math.max(...products.map(p => p.originalPrice || p.price)) / 100) * 100;
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({
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
            tempProducts = tempProducts.filter(p => filters.status.every(s => p[s]));
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

// Footer Component
const Footer = () => (
    <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 py-12">
            <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} TechSphere. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [products] = useState(mockProducts);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const notificationTimeoutRef = useRef(null);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setNotificationText(`${product.name} added to cart!`);
    setShowNotification(true);
    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    notificationTimeoutRef.current = setTimeout(() => setShowNotification(false), 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage products={products} onAddToCart={handleAddToCart} />;
      case 'home':
      default:
        return <HomePage products={products} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white font-sans selection:bg-blue-500/30">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10">
            <Header cartCount={cart.length} onNavigate={setCurrentPage} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
        <div className={`fixed bottom-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transition-transform duration-300 ${showNotification ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'}`}>
            {notificationText}
        </div>
    </div>
  );
}
