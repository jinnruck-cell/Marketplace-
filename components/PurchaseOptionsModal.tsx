import React, { useState } from 'react';
import { Item } from '../types';

interface PurchaseOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item;
    onAddToCart: (item: Item) => void;
    onBuyNow: (item: Item) => void;
}

const PurchaseOptionsModal: React.FC<PurchaseOptionsModalProps> = ({ isOpen, onClose, item, onAddToCart, onBuyNow }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(item.sizes?.[0] || null);
    const [selectedColor, setSelectedColor] = useState<string | null>(item.colors?.[0] || null);

    if (!isOpen) return null;

    const handleAddToCart = () => {
        onAddToCart(item);
        onClose();
    };

    const handleBuyNow = () => {
        onBuyNow(item);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end" onClick={onClose}>
            <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-lg animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b">
                    <div className="flex items-start">
                        <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-lg object-cover" />
                        <div className="ml-4">
                            <h2 className="text-xl font-bold text-indigo-600">{item.price}</h2>
                            <p className="text-sm text-gray-500">Stock available</p>
                        </div>
                        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-800 p-1 rounded-full">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </div>
                
                {item.sizes && item.sizes.length > 0 && (
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-3 text-gray-800">Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {item.sizes.map(size => (
                                <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {item.colors && item.colors.length > 0 && (
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-3 text-gray-800">Color</h3>
                        <div className="flex flex-wrap gap-2">
                             {item.colors.map(color => (
                                <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${selectedColor === color ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="p-3 flex items-center space-x-3 bg-gray-50">
                    <button onClick={handleAddToCart} className="flex-1 px-6 py-3 text-sm font-bold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50">
                        Add to Cart
                    </button>
                    <button onClick={handleBuyNow} className="flex-1 px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                        Buy Now
                    </button>
                </div>
                <style>{`
                    @keyframes slide-up {
                        from { transform: translateY(100%); }
                        to { transform: translateY(0); }
                    }
                    .animate-slide-up { animation: slide-up 0.3s ease-out; }
                `}</style>
            </div>
        </div>
    );
};

export default PurchaseOptionsModal;
