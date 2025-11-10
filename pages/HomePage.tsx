import React from 'react';
import { Item } from '../types';
import ItemCard from '../components/ItemCard';
import Icon from '../components/Icon';

interface HomePageProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
  onShowFilters: () => void;
  onShowNotifications: () => void;
  notificationCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = ['All', 'Mobiles', 'Electronics', 'Furniture', 'Cars', 'Bikes', 'Fashion'];

const HomePage: React.FC<HomePageProps> = ({ items, onItemSelect, onShowFilters, onShowNotifications, notificationCount, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white z-10 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors">
              <Icon name="search" className="w-6 h-6" />
            </button>
            <button onClick={onShowNotifications} className="p-2 relative text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors">
              <Icon name="bell" className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
            <input 
              type="text" 
              placeholder="Search for anything..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 w-full px-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
            />
            <button onClick={onShowFilters} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                <Icon name="settings" className="w-6 h-6" />
            </button>
        </div>
      </header>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((category, index) => (
            <button key={category} className={`px-4 py-2 text-sm font-semibold rounded-full flex-shrink-0 ${index === 0 ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-800 border hover:bg-gray-50'}`}>
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <main className="p-4 pt-0">
        <h2 className="text-lg font-semibold mb-3">Fresh Recommendations</h2>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {items.map(item => (
              <ItemCard key={item.id} item={item} onClick={onItemSelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="font-semibold">No items found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;