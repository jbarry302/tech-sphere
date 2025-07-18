import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { useRef, useState } from 'react';
import { mockProducts } from '@/data/mock';
import type { Product } from '@/types/products/products';

const RootLayout = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [products] = useState<Product[]>(mockProducts);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationText, setNotificationText] = useState<string>('');
  const notificationTimeoutRef = useRef<any>(null);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setNotificationText(`${product.name} added to cart!`);
    setShowNotification(true);
    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    notificationTimeoutRef.current = setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="bg-gray-900 text-white font-sans selection:bg-blue-500/30">
      <div className="relative z-10">
        <Header />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <div
        className={`fixed bottom-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transition-transform duration-300 ${
          showNotification ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'
        }`}
      >
        {notificationText}
      </div>
    </div>
  );
};

export default RootLayout;
