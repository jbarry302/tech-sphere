import type React from 'react';
import type { Product } from '@/types/products/products';
import { Tag, Zap } from 'lucide-react';
import StarRating from '@/components/ui/StarRating/StarRating';
import { useCartStore } from '@/store/cartStore';

type ProductCardProps = {
    product: Product;
}
const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);
    const { product } = props;
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const handleAddToCart = (product: Product) => {
        addItem(product);
    }

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
            onClick={() => handleAddToCart(product)}
            className="mt-auto w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform transition-all duration-300 group-hover:scale-105"
            >
            Add to Cart
            </button>
        </div>
        </div>
    );
}

export default ProductCard;