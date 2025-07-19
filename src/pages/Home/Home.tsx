import type React from 'react';
import type { Product } from '@/types/products/products';
import ProductCard from '../Products/components/ProductCard';
import { mockProducts } from '@/data/mock';

type HomeProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const Home: React.FC = () => {
  const product = mockProducts[0];
  const onAddToCart = (product: Product) => {};
  
  return (
    <>
      <section className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-50 z-10"></div>
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
          <source src="https://cdn.pixabay.com/video/2019/07/20/25380-350507864_large.mp4" type="video/mp4" />
        </video>
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tighter">Build Your Ultimate Rig</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">Highest quality components, IoT devices, and gaming gear. Shipped fast, built to last.</p>
          <button onClick={() => document.getElementById('products')?.scrollIntoView()} className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105">Shop Now</button>
        </div>
      </section>
      <section id="products" className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockProducts.slice(0, 4).map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
