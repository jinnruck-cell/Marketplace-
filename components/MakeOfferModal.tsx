import React, { useState } from 'react';

interface MakeOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (price: string) => void;
    itemPrice?: string;
}

const MakeOfferModal: React.FC<MakeOfferModalProps> = ({ isOpen, onClose, onSubmit, itemPrice }) => {
    const [offerPrice, setOfferPrice] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (offerPrice.trim()) {
            onSubmit(offerPrice);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Make an Offer</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    {itemPrice 
                        ? <>The listing price is <span className="font-bold">{itemPrice}</span>. Enter your best offer below.</>
                        : "Enter your best offer below."
                    }
                </p>
                <div>
                    <label htmlFor="offer-price" className="block text-sm font-medium text-gray-700">Your Offer</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            type="number"
                            id="offer-price"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="block w-full rounded-md border-gray-300 pl-7 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!offerPrice.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                    >
                        Submit Offer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakeOfferModal;