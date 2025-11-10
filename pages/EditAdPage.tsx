
import React, { useState } from 'react';
// Fix: Corrected import path for types
import { Ad } from '../types';

interface EditAdPageProps {
    ad: Ad;
    onBack: () => void;
    onUpdateAd: (ad: Ad) => void;
}

const EditAdPage: React.FC<EditAdPageProps> = ({ ad, onBack, onUpdateAd }) => {
    const [title, setTitle] = useState(ad.title);
    const [price, setPrice] = useState(ad.price.replace('$', ''));
    const [category, setCategory] = useState(ad.category);
    const [description, setDescription] = useState(ad.description);
    const [status, setStatus] = useState<'Active' | 'Sold' | 'Pending'>(ad.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedAd: Ad = {
            ...ad,
            title,
            price: `$${price}`,
            category,
            description,
            status,
        };
        onUpdateAd(updatedAd);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Edit Ad</h1>
            </header>

            <form className="pt-20 p-4 space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Photo</label>
                    <img src={ad.imageUrl} alt={ad.title} className="w-full h-48 object-cover rounded-lg shadow-sm" />
                </div>
                
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Mobiles</option>
                        <option>Electronics</option>
                        <option>Furniture</option>
                        <option>Cars</option>
                        <option>Bikes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                     <select id="status" value={status} onChange={(e) => setStatus(e.target.value as 'Active' | 'Sold' | 'Pending')} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Active</option>
                        <option>Sold</option>
                        <option>Pending</option>
                    </select>
                </div>
                
                <div className="pt-4">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAdPage;