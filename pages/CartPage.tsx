import React from 'react';
// Fix: Corrected import path for types
import { Item } from '../types';
import Icon from '../components/Icon';

interface CartPageProps {
  cartItems: Item[];
  onBack: () => void;
  onRemoveItem: (itemId: number) => void;
  onSelectItem: (item: Item) => void;
}

const CartItemCard: React.FC<{ item: Item; onRemove: () => void; onSelect: () => void; }> = ({ item, onRemove, onSelect }) => (
    <div className="flex bg-white p-4 rounded-lg shadow-sm border items-center">
        <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-md object-cover cursor-pointer" onClick={onSelect} />
        <div className="ml-4 flex-1">
            <h3 className="font-bold text-gray-800 cursor-pointer" onClick={onSelect}>{item.title}</h3>
            <p className="text-indigo-600 font-semibold mt-1">{item.price}</p>
        </div>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    </div>
);


const CartPage: React.FC<CartPageProps> = ({ cartItems, onBack, onRemoveItem, onSelectItem }) => {
    const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price;
    }, 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Shopping Cart</h1>
            </header>
            
            <main className="flex-1 pt-20 pb-40">
                {cartItems.length > 0 ? (
                    <div className="p-4 space-y-4">
                        {cartItems.map(item => (
                            <CartItemCard 
                                key={item.id} 
                                item={item} 
                                onRemove={() => onRemoveItem(item.id)} 
                                onSelect={() => onSelectItem(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10 mt-16 text-gray-500 flex flex-col items-center justify-center">
                        <Icon name="cart" className="w-20 h-20 text-gray-300 mb-4" />
                        <h2 className="text-xl font-semibold">Your cart is empty</h2>
                        <p className="text-sm mt-2">Looks like you haven't added anything to your cart yet.</p>
                    </div>
                )}
            </main>

            {cartItems.length > 0 && (
                <footer className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-white border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-600">Subtotal</span>
                        <span className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800">
                        Proceed to Checkout
                    </button>
                </footer>
            )}
        </div>
    );
};

export default CartPage;