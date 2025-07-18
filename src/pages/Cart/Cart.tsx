import React, { useState, useEffect } from 'react';
import { ShoppingCart, Tag, Trash2, Plus, Minus, X, CheckCircle, Gift, Truck, ChevronDown, Frown } from 'lucide-react';

// --- MOCK DATA SIMULATION ---
// Simulate data that would come from a previous page
const initialCartItems = [
  {
    id: 1,
    name: 'QuantumCore i9 Processor',
    imageUrl: 'https://placehold.co/150x150/1a1a2e/e0e0e0?text=QuantumCore+i9',
    price: 499.99,
    originalPrice: 549.99,
    quantity: 1,
    shop: 'CPU Masters',
    vouchers: [
      { id: 'V1', code: 'CPU10', description: '10% off Processors', type: 'percentage', value: 10 },
      { id: 'V2', code: 'SHIPFREE', description: 'Free Shipping', type: 'shipping', value: 0 }
    ],
  },
  {
    id: 9,
    name: 'Geoforce RTX 4090 GPU',
    imageUrl: 'https://placehold.co/150x150/1a1a2e/e0e0e0?text=RTX+4090',
    price: 1599.99,
    originalPrice: 1799.99,
    quantity: 1,
    shop: 'GPU Galaxy',
    vouchers: [
       { id: 'V2', code: 'SHIPFREE', description: 'Free Shipping', type: 'shipping', value: 0 },
       { id: 'V3', code: 'GPU50', description: '$50 Off GPUs > $1000', type: 'fixed', value: 50, minSpend: 1000 }
    ],
  },
  {
    id: 7,
    name: 'Stealth-7 Mechanical Keyboard',
    imageUrl: 'https://placehold.co/150x150/1a1a2e/e0e0e0?text=Stealth-7',
    price: 149.99,
    originalPrice: 179.99,
    quantity: 2,
    shop: 'Gamer Gear',
    vouchers: [],
  },
];

// Vouchers available to the user for the whole order
const availablePlatformVouchers = [
    { id: 'P1', code: 'MEGA15', description: '15% off total order', type: 'percentage', value: 15, minSpend: 500 },
    { id: 'P2', code: 'SAVE100', description: '$100 off total order', type: 'fixed', value: 100, minSpend: 2000 },
];

const USER_LOYALTY_POINTS = 2500; // e.g., 2500 points = $25.00
const POINTS_TO_CURRENCY_RATIO = 100;
const SHIPPING_FEE = 15.00;

// --- HELPER COMPONENTS ---

const VoucherTag = ({ voucher, onSelect, isSelected, onRemove, isApplicable }) => (
    <div className={`flex items-center justify-between p-2 rounded-lg border-2 ${isSelected ? 'border-blue-500 bg-blue-900/50' : 'border-dashed border-gray-600 bg-gray-800/50'} ${!isApplicable && !isSelected ? 'opacity-50' : ''}`}>
        <div className="flex items-center gap-2">
            <Tag className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`} />
            <div>
                <p className="font-semibold text-sm text-white">{voucher.description}</p>
                {voucher.minSpend && <p className="text-xs text-gray-400">Min. spend ${voucher.minSpend}</p>}
            </div>
        </div>
        <button 
            onClick={() => {
                if(isSelected) onRemove(voucher);
                else if(isApplicable) onSelect(voucher);
            }} 
            className={`w-6 h-6 flex items-center justify-center rounded-full text-white transition-all ${isSelected ? 'bg-red-500 hover:bg-red-600' : isApplicable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={!isApplicable && !isSelected}
        >
            {isSelected ? <X size={16} /> : <Plus size={16} />}
        </button>
    </div>
);

const Modal = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- MAIN CART COMPONENT ---

export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [selectedVouchers, setSelectedVouchers] = useState([]);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
    const [voucherCodeInput, setVoucherCodeInput] = useState('');
    const [voucherError, setVoucherError] = useState('');

    // --- CALCULATIONS ---
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const allAvailableVouchers = [...new Map([...cartItems.flatMap(i => i.vouchers), ...availablePlatformVouchers].map(item => [item.id, item])).values()];

    // --- CART LOGIC ---
    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(id);
            return;
        }
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveItem = (id) => {
        const removedItem = cartItems.find(item => item.id === id);
        if (removedItem) {
            // Also remove any selected vouchers specific to this item
            const itemVoucherIds = removedItem.vouchers.map(v => v.id);
            setSelectedVouchers(prev => prev.filter(sv => !itemVoucherIds.includes(sv.id)));
        }
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const checkVoucherApplicability = (voucher) => {
        if (voucher.minSpend && subtotal < voucher.minSpend) {
            return false;
        }
        // Add other conditions here if needed
        return true;
    };

    const handleSelectVoucher = (voucher) => {
        if (!checkVoucherApplicability(voucher)) {
            setVoucherError(`Minimum spend of $${voucher.minSpend} not met.`);
            return;
        }
        
        // Allow only one platform voucher at a time
        if(availablePlatformVouchers.some(pv => pv.id === voucher.id)) {
            const otherPlatformVouchers = availablePlatformVouchers.map(pv => pv.id).filter(pid => pid !== voucher.id);
            setSelectedVouchers(prev => [...prev.filter(v => !otherPlatformVouchers.includes(v.id)), voucher]);
        } else {
             setSelectedVouchers(prev => [...new Map([...prev, voucher].map(item => [item.id, item])).values()]);
        }
        setVoucherError('');
        setIsVoucherModalOpen(false);
    };

    const handleApplyVoucherCode = () => {
        const code = voucherCodeInput.trim().toUpperCase();
        if (!code) return;

        const voucher = allAvailableVouchers.find(v => v.code.toUpperCase() === code);
        
        if (!voucher) {
            setVoucherError("Invalid voucher code.");
            return;
        }
        if (selectedVouchers.some(sv => sv.id === voucher.id)) {
            setVoucherError("Voucher already applied.");
            return;
        }
        handleSelectVoucher(voucher);
        if (checkVoucherApplicability(voucher)) {
            setVoucherCodeInput('');
        }
    };

    const handleRemoveVoucher = (voucher) => {
        setSelectedVouchers(prev => prev.filter(v => v.id !== voucher.id));
    };
    
    const itemDiscount = selectedVouchers
        .filter(v => !availablePlatformVouchers.some(pv => pv.id === v.id)) // only item-specific vouchers
        .reduce((sum, v) => {
            const item = cartItems.find(i => i.vouchers.some(iv => iv.id === v.id));
            if (!item) return sum;
            if (v.type === 'percentage') return sum + (item.price * item.quantity * (v.value / 100));
            if (v.type === 'fixed') return sum + v.value;
            return sum;
        }, 0);

    const platformVoucher = selectedVouchers.find(v => availablePlatformVouchers.some(pv => pv.id === v.id));
    let platformDiscount = 0;
    if (platformVoucher && checkVoucherApplicability(platformVoucher)) {
        if (platformVoucher.type === 'percentage') {
            platformDiscount = subtotal * (platformVoucher.value / 100);
        } else if (platformVoucher.type === 'fixed') {
            platformDiscount = platformVoucher.value;
        }
    }

    const hasFreeShippingVoucher = selectedVouchers.some(v => v.type === 'shipping');
    const finalShippingFee = hasFreeShippingVoucher ? 0 : SHIPPING_FEE;
    const shippingDiscount = hasFreeShippingVoucher ? SHIPPING_FEE : 0;

    const pointsDiscount = useLoyaltyPoints ? Math.min(subtotal, USER_LOYALTY_POINTS / POINTS_TO_CURRENCY_RATIO) : 0;

    const totalDiscount = itemDiscount + platformDiscount + pointsDiscount + shippingDiscount;
    const total = subtotal - itemDiscount - platformDiscount - pointsDiscount + finalShippingFee;

    if (cartItems.length === 0) {
        return (
            <div className="bg-gray-900 min-h-screen text-white font-sans flex items-center justify-center p-4">
                <div className="text-center">
                    <ShoppingCart size={80} className="mx-auto text-gray-600 mb-4" />
                    <h1 className="text-3xl font-bold text-white mb-2">Your Cart is Empty</h1>
                    <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <ShoppingCart size={32} className="text-blue-400" />
                    <h1 className="text-3xl font-bold">My Cart</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items & Vouchers */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="bg-gray-800/70 rounded-2xl p-4 border border-gray-700">
                                <div className="flex items-start gap-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-white">{item.name}</h3>
                                        <p className="text-gray-400 text-sm mb-2">{item.shop}</p>
                                        <div className="flex items-center gap-3 bg-gray-700/50 rounded-full p-1 w-fit">
                                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="p-2 rounded-full hover:bg-gray-600"><Minus size={16} /></button>
                                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="p-2 rounded-full hover:bg-gray-600"><Plus size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</p>
                                        {item.originalPrice && <p className="text-sm text-gray-500 line-through">${(item.originalPrice * item.quantity).toFixed(2)}</p>}
                                        <button onClick={() => handleRemoveItem(item.id)} className="mt-2 p-2 text-gray-500 hover:text-red-500"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                                {item.vouchers.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                                        {item.vouchers.map(v => (
                                            <VoucherTag key={v.id} voucher={v} onSelect={() => handleSelectVoucher(v)} onRemove={handleRemoveVoucher} isSelected={selectedVouchers.some(sv => sv.id === v.id)} isApplicable={checkVoucherApplicability(v)} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-gray-800/70 rounded-2xl p-6 space-y-4 border border-blue-500/30 sticky top-8">
                            <button onClick={() => { setIsVoucherModalOpen(true); setVoucherError(''); }} className="w-full flex justify-between items-center bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Gift className="text-blue-400" />
                                    <span className="font-semibold">Select or Enter Voucher</span>
                                </div>
                                <ChevronDown className="transform -rotate-90" />
                            </button>

                            <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center text-sm">C</div>
                                    <span className="font-semibold">Use {USER_LOYALTY_POINTS} Shopper Coins</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" checked={useLoyaltyPoints} onChange={(e) => setUseLoyaltyPoints(e.target.checked)} className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <h2 className="text-2xl font-bold text-white pt-4 border-t border-gray-700">Order Summary</h2>
                            <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between text-gray-300"><span>Shipping Fee</span><span>${finalShippingFee.toFixed(2)}</span></div>
                            {totalDiscount > 0 && <div className="flex justify-between text-green-400"><span>Total Discount</span><span>-${totalDiscount.toFixed(2)}</span></div>}
                            
                            <hr className="border-gray-700" />

                            <div className="flex justify-between text-white font-bold text-xl"><span>Total</span><span>${total.toFixed(2)}</span></div>
                            
                            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                Proceed to Checkout ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isVoucherModalOpen} onClose={() => setIsVoucherModalOpen(false)} title="Select Vouchers">
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={voucherCodeInput}
                            onChange={(e) => setVoucherCodeInput(e.target.value)}
                            placeholder="Enter voucher code"
                            className="flex-grow bg-gray-700 border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button onClick={handleApplyVoucherCode} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-lg">Apply</button>
                    </div>
                    {voucherError && <div className="flex items-center gap-2 text-red-400 bg-red-900/50 p-3 rounded-lg"><Frown size={18}/> <p>{voucherError}</p></div>}
                    <hr className="border-gray-700"/>
                    {allAvailableVouchers.map(v => (
                         <VoucherTag key={v.id} voucher={v} onSelect={() => handleSelectVoucher(v)} onRemove={handleRemoveVoucher} isSelected={selectedVouchers.some(sv => sv.id === v.id)} isApplicable={checkVoucherApplicability(v)} />
                    ))}
                </div>
            </Modal>
        </div>
    );
}
