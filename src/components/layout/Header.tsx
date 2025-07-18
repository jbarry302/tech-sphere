import { useCartStore } from '@/store/cartStore';
import { Cpu, User, ShoppingCart, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

type HeaderProps = {
  cartCount: any;
  onNavigate: any;
};
const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <Cpu className="w-8 h-8 mr-2 text-blue-500" /> TechSphere
          </Link>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/home" className="text-2xl font-bold text-white flex items-center">
              Home
            </Link>
            <Link to="/shop" className="text-2xl font-bold text-white flex items-center">
              Shop
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" onClick={() => navigate('/account')}>
              <User className="w-6 h-6" />
            </button>
            <button className="relative p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center ring-2 ring-gray-900">
                  {cartItems.length}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Shop
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
