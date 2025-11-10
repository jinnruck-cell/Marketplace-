import React from 'react';
import { Item, Seller, User, Review } from '../types';
import Icon from '../components/Icon';
import { sellerReviews } from '../data';

interface ItemDetailPageProps {
  item: Item;
  currentUser: User;
  onBack: () => void;
  onSellerSelect: (seller: Seller) => void;
  onStartChat: () => void;
  onBuyNow: (item: Item) => void;
  onEditItem: (item: Item) => void;
}

const DetailRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex justify-between items-center py-2">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-800 text-right">{children}</span>
    </div>
);

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ item, currentUser, onBack, onSellerSelect, onStartChat, onBuyNow, onEditItem }) => {
    
    const isOwner = item.seller.id === currentUser.id;
    const reviews = sellerReviews[item.seller.id] || [];

    const handleShare = async () => {
        const shareData = {
            title: item.title,
            text: `Check out this listing on Marketplace: ${item.title}`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert('Share feature is not supported on your browser.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // Don't alert on abort
            if ((error as Error).name !== 'AbortError') {
                alert('An error occurred while trying to share.');
            }
        }
    };

    return (
        <div className="bg-gray-50 min-h-full relative">

            <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white bg-opacity-80 backdrop-blur-sm">
                <button onClick={onBack} className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                 <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors">
                      <Icon name="heart" className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <img src={item.imageUrl} alt={item.title} className="w-full h-72 object-cover" />

            <main className="p-4 pb-24">
                <div className="bg-white p-4 rounded-lg shadow-sm -mt-12 relative z-0">
                    <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>
                    <p className="text-3xl font-extrabold text-indigo-600 mt-2">{item.price}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                        <Icon name="location" className="w-4 h-4 mr-1"/>
                        <span>{item.location}</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                    <h2 className="font-bold text-lg mb-2">Description</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
                
                 {(item.colors || item.sizes || item.material) && (
                    <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                        <h2 className="font-bold text-lg mb-2">Item Details</h2>
                        <div className="divide-y divide-gray-100">
                            {item.colors && item.colors.length > 0 && (
                                <DetailRow label="Color">{item.colors.join(', ')}</DetailRow>
                            )}
                            {item.sizes && item.sizes.length > 0 && (
                                <DetailRow label="Size">{item.sizes.join(', ')}</DetailRow>
                            )}
                            {item.material && <DetailRow label="Material">{item.material}</DetailRow>}
                        </div>
                    </div>
                )}
                
                 <div className="bg-white p-4 rounded-lg shadow-sm mt-4 cursor-pointer hover:bg-gray-50" onClick={() => onSellerSelect(item.seller)}>
                    <h2 className="font-bold text-lg mb-3">About the Seller</h2>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center">
                           <img src={item.seller.avatarUrl} alt={item.seller.name} className="w-12 h-12 rounded-full object-cover" />
                           <div className="ml-3">
                               <p className="font-bold text-gray-800">{item.seller.name}</p>
                               <div className="flex items-center mt-1">
                                   <span className="text-xs text-gray-500">({item.seller.reviews} reviews)</span>
                               </div>
                           </div>
                       </div>
                       <Icon name="chevronRight" className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                    <h2 className="font-bold text-lg mb-3">Seller Reviews ({reviews.length})</h2>
                     {reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review, index) => (
                                <div key={review.id} className={index > 0 ? 'border-t border-gray-100 pt-4' : ''}>
                                    <div className="flex items-start">
                                        <img src={review.authorAvatarUrl} alt={review.authorName} className="w-10 h-10 rounded-full object-cover"/>
                                        <div className="ml-3 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm text-gray-800">{review.authorName}</p>
                                                <span className="text-xs text-gray-400">{review.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 ml-13 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No reviews yet for this seller.</p>
                    )}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-20 p-3 bg-white border-t flex items-center space-x-3">
                {isOwner ? (
                    <>
                        <button 
                            onClick={() => onEditItem(item)}
                            className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-bold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50"
                        >
                            <Icon name="edit" className="w-5 h-5 mr-2"/>
                            <span>Edit Ad</span>
                        </button>
                        <button 
                            onClick={handleShare}
                            className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            <Icon name="share" className="w-5 h-5 mr-2"/>
                            <span>Share</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={onStartChat}
                            className="flex-1 px-6 py-3 text-sm font-bold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50"
                        >
                            Chat with Seller
                        </button>
                        <button 
                            onClick={() => onBuyNow(item)} 
                            className="flex-1 px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            Buy Now
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default ItemDetailPage;