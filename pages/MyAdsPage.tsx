
import React from 'react';
import Icon from '../components/Icon';
// Fix: Corrected import path for types
import { Ad } from '../types';

interface MyAdsPageProps {
    ads: Ad[];
    onEditAd: (ad: Ad) => void;
    onPromoteAd: (ad: Ad) => void;
}

const AdCard: React.FC<{ ad: Ad; onEdit: (ad: Ad) => void; onPromote: (ad: Ad) => void }> = ({ ad, onEdit, onPromote }) => {
    const isSold = ad.status === 'Sold';
    const statusColor = ad.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-200';
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border">
            <div className="flex">
                <div className="relative w-28 h-28 flex-shrink-0">
                    <img src={ad.imageUrl} alt={ad.title} className={`w-full h-full object-cover ${isSold ? 'grayscale' : ''}`} />
                    {isSold && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                            <span className="transform -rotate-12 select-none rounded border-2 border-white px-4 py-1 text-lg font-bold uppercase tracking-wider text-white">
                                Sold
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="font-bold text-md truncate">{ad.title}</h3>
                        <p className="text-indigo-600 font-semibold mt-1">{ad.price}</p>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${statusColor}`}>{ad.status}</span>
                    </div>
                </div>
            </div>
            <div className="border-t p-2 flex items-center justify-between">
                 <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <span>Views: {ad.views}</span>
                    <span>Likes: {ad.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onEdit(ad)} disabled={isSold} className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 p-1 disabled:cursor-not-allowed disabled:text-gray-400">
                        <Icon name="edit" className="w-4 h-4 mr-1"/>
                        Edit
                    </button>
                    {ad.isPromoted ? (
                         <button disabled className="text-sm font-medium text-white bg-purple-600 px-3 py-1 rounded-md disabled:cursor-not-allowed">
                            Promoted
                        </button>
                    ) : (
                        <button onClick={() => onPromote(ad)} disabled={isSold} className="text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300">
                            Promote
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const MyAdsPage: React.FC<MyAdsPageProps> = ({ ads, onEditAd, onPromoteAd }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white p-4 border-b sticky top-0 z-10">
                <h1 className="text-xl font-bold text-center">My Ads</h1>
            </header>
            <div className="p-4 space-y-4">
                {ads.map(ad => <AdCard key={ad.id} ad={ad} onEdit={onEditAd} onPromote={onPromoteAd} />)}
            </div>
        </div>
    );
};

export default MyAdsPage;