import React from 'react';
import { Item } from '../types';
import Icon from './Icon';

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const isSold = item.status === 'sold';

  const Badge = () => {
    if (item.isPromoted) {
      return (
        <div className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold rounded bg-amber-500 text-white z-10">
          Promoted
        </div>
      );
    }
    if (!item.badge || isSold) return null;
    const badgeColor = item.badge === 'Featured' 
      ? 'bg-purple-600 text-white' 
      : 'bg-green-500 text-white';
    
    return (
      <div className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-bold rounded ${badgeColor} z-10`}>
        {item.badge}
      </div>
    );
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group flex flex-col ${isSold ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
      onClick={() => !isSold && onClick(item)}
    >
      <div className="relative">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className={`w-full h-40 object-cover group-hover:opacity-90 transition-opacity ${isSold ? 'grayscale' : ''}`} 
        />
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <span className="transform -rotate-12 select-none rounded border-2 border-white px-4 py-1 text-lg font-bold uppercase tracking-wider text-white">
              Sold
            </span>
          </div>
        )}
        <Badge />
        {!isSold && (
          <button className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-80 rounded-full text-gray-600 hover:text-red-500 hover:bg-opacity-100 transition-colors z-10">
            <Icon name="heart" className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className={`p-3 flex flex-col flex-1 ${isSold ? 'opacity-60' : ''}`}>
        <div className="flex items-center text-xs text-gray-500 mb-1">
            <Icon name="tag" className="w-3 h-3 mr-1.5" />
            <span>{item.category}</span>
        </div>
        <h3 className="font-bold text-gray-800 truncate flex-grow leading-tight mb-2">{item.title}</h3>
        <p className="text-indigo-600 font-semibold">{item.price}</p>
        
        <div className="mt-auto pt-2 text-xs text-gray-500 space-y-1">
            <div className="flex items-center">
                <Icon name="location" className="w-4 h-4 mr-1 flex-shrink-0" />
                <p className="truncate">{item.location}</p>
            </div>
            {item.seller.reviews > 0 && (
                <div className="flex items-center">
                    <Icon name="feedback" className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{item.seller.reviews} reviews</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;