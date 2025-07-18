import React, { useState } from 'react';
import { User, ShoppingBag, Tag, Settings, Edit, MapPin, Mail, Phone, Eye, EyeOff } from 'lucide-react';

// --- MOCK DATA SIMULATION ---
const mockUser = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: '2023-05-15',
  address: {
    street: '123 Tech Avenue',
    city: 'Silicon Valley',
    state: 'CA',
    zip: '94043',
    country: 'USA'
  }
};

const mockOrders = [
  { id: 'ORD-2024-001', date: '2024-07-15', total: 1749.98, status: 'Delivered', items: [{ name: 'Geoforce RTX 4090 GPU', quantity: 1 }, { name: 'CryoFreeze CPU Cooler', quantity: 1 }] },
  { id: 'ORD-2024-002', date: '2024-07-18', total: 299.98, status: 'Shipped', items: [{ name: 'Stealth-7 Keyboard', quantity: 2 }] },
  { id: 'ORD-2024-003', date: '2024-07-20', total: 49.99, status: 'Processing', items: [{ name: 'AuraGlow Smart RGB Strip', quantity: 1 }] },
];

const mockVouchers = [
  { id: 'V1', code: 'CPU10', description: '10% off Processors', expiry: '2024-12-31', used: false },
  { id: 'V3', code: 'GPU50', description: '$50 Off GPUs > $1000', expiry: '2024-08-31', used: true },
  { id: 'P1', code: 'MEGA15', description: '15% off total order', expiry: '2024-07-30', used: false },
  { id: 'P2', code: 'SAVE100', description: '$100 off total order', expiry: '2024-09-15', used: false },
];


// --- PAGE COMPONENTS ---

const ProfilePage = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedUser(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
        } else {
            setEditedUser(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">My Profile</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    <Edit size={16} /> {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
            {isEditing ? (
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm text-gray-400">Full Name</label><input type="text" name="name" value={editedUser.name} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded-lg mt-1"/></div>
                        <div><label className="text-sm text-gray-400">Email Address</label><input type="email" name="email" value={editedUser.email} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded-lg mt-1"/></div>
                    </div>
                    <div><label className="text-sm text-gray-400">Street Address</label><input type="text" name="address.street" value={editedUser.address.street} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded-lg mt-1"/></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className="text-sm text-gray-400">City</label><input type="text" name="address.city" value={editedUser.address.city} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded-lg mt-1"/></div>
                        <div><label className="text-sm text-gray-400">State</label><input type="text" name="address.state" value={editedUser.address.state} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded-lg mt-1"/></div>
                        <div><label className="text-sm text-gray-400">ZIP Code</label><input type="text" name="address.zip" value={editedUser.address.zip} onChange={handleInputChange} className="w-full bg-gray-700 p-2 rounded-lg mt-1"/></div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="submit" onClick={(e) => { e.preventDefault(); setIsEditing(false); /* In real app, save here */ }} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">Save Changes</button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <p className="text-xl font-semibold">{user.name}</p>
                    <div className="flex items-center gap-4 text-gray-300"><Mail size={18} className="text-blue-400"/><span>{user.email}</span></div>
                    <div className="flex items-center gap-4 text-gray-300"><Phone size={18} className="text-blue-400"/><span>{user.phone}</span></div>
                    <div className="flex items-start gap-4 text-gray-300 pt-2 border-t border-gray-700 mt-4">
                        <MapPin size={18} className="text-blue-400 mt-1"/>
                        <div>
                            <p className="font-semibold">Shipping Address</p>
                            <p>{user.address.street}</p>
                            <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const OrdersPage = ({ orders }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-900 text-green-300';
            case 'Shipped': return 'bg-blue-900 text-blue-300';
            case 'Processing': return 'bg-yellow-900 text-yellow-300';
            default: return 'bg-gray-700 text-gray-300';
        }
    };
    return (
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-white">{order.id}</p>
                                <p className="text-sm text-gray-400">Date: {order.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-white">${order.total.toFixed(2)}</p>
                                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-700">
                            <p className="text-sm text-gray-300">{order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VouchersPage = ({ vouchers }) => (
    <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">My Vouchers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vouchers.map(voucher => (
                <div key={voucher.id} className={`p-4 rounded-lg border-l-4 ${voucher.used ? 'bg-gray-700/50 border-gray-600 opacity-60' : 'bg-blue-900/30 border-blue-500'}`}>
                    <p className="font-bold text-white">{voucher.code}</p>
                    <p className="text-sm text-gray-300">{voucher.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Expires: {voucher.expiry}</p>
                    {voucher.used && <p className="text-xs font-bold text-red-400 mt-1">USED</p>}
                </div>
            ))}
        </div>
    </div>
);

const SettingsPage = () => {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    return (
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
            <div className="max-w-md">
                <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                <form className="space-y-4">
                    <div className="relative">
                        <label className="text-sm text-gray-400">Old Password</label>
                        <input type={showOld ? "text" : "password"} className="w-full bg-gray-700 p-2 rounded-lg mt-1 pr-10"/>
                        <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-9 text-gray-400">{showOld ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                    </div>
                     <div className="relative">
                        <label className="text-sm text-gray-400">New Password</label>
                        <input type={showNew ? "text" : "password"} className="w-full bg-gray-700 p-2 rounded-lg mt-1 pr-10"/>
                        <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-9 text-gray-400">{showNew ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                    </div>
                    <div className="pt-2">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function Account() {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch(activeTab) {
            case 'profile': return <ProfilePage user={mockUser} />;
            case 'orders': return <OrdersPage orders={mockOrders} />;
            case 'vouchers': return <VouchersPage vouchers={mockVouchers} />;
            case 'settings': return <SettingsPage />;
            default: return <ProfilePage user={mockUser} />;
        }
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 w-full p-4 rounded-lg text-left transition-colors ${activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'}`}
        >
            <Icon size={20} />
            <span className="font-semibold">{label}</span>
        </button>
    );

    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Account</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="w-full lg:w-1/4">
                        <div className="bg-gray-800/50 p-4 rounded-2xl space-y-2 border border-gray-700">
                           <TabButton id="profile" label="Profile" icon={User} />
                           <TabButton id="orders" label="Orders" icon={ShoppingBag} />
                           <TabButton id="vouchers" label="My Vouchers" icon={Tag} />
                           <TabButton id="settings" label="Settings" icon={Settings} />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
}
