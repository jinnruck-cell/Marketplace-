import React from 'react';
import { Seller, Item } from '../types';
import Icon from '../components/Icon';
import ItemCard from '../components/ItemCard';

interface SellerProfilePageProps {
  seller: Seller;
  items: Item[];
  onBack: () => void;
  onItemSelect: (item: Item) => void;
}

const SellerProfilePage: React.FC<SellerProfilePageProps> = ({ seller, items, onBack, onItemSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white bg-opacity-80 backdrop-blur-sm border-b">
        <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold truncate">{seller.name}'s Profile</h1>
      </header>

      <main className="pt-20 p-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center">
          <img src={seller.avatarUrl} alt={seller.name} className="w-20 h-20 rounded-full border-4 border-white -mt-14" />
          <h2 className="mt-2 text-xl font-bold">{seller.name}</h2>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-600 ml-2">({seller.reviews} reviews)</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Member since {seller.memberSince}</p>
          <button className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
            Follow
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Items from {seller.name} ({items.length})</h3>
          <div className="grid grid-cols-2 gap-4">
            {items.map(item => (
              <ItemCard key={item.id} item={item} onClick={onItemSelect} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerProfilePage;