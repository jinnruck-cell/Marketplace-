
import React, { useState, useEffect } from 'react';
import { Page, Item, Seller, ChatItem, Ad, Conversation, FilterState, Notification, PaymentMethod, Address, User, RecentActivity } from './types';
import * as api from './api';

// Initial data is now fetched from the API service
import { initialChats, initialConversations, initialNotifications, initialPaymentMethods, initialAddresses, currentUser, categoriesWithSubcategories } from './data';

import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import SellPage from './pages/SellPage';
import MyAdsPage from './pages/MyAdsPage';
import ProfilePage from './pages/ProfilePage';
import ItemDetailPage from './pages/ItemDetailPage';
import SellerProfilePage from './pages/SellerProfilePage';
import ConversationPage from './pages/ConversationPage';
import FilterPage from './pages/FilterPage';
import NotificationsPage from './pages/NotificationsPage';
import EditAdPage from './pages/EditAdPage';
import PromotionsPage from './pages/PromotionsPage';
import PaymentPage from './pages/PaymentPage';
import AddressesPage from './pages/AddressesPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import AdminPage from './pages/AdminPage';
import BottomNav from './components/BottomNav';


const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    const [adToPromote, setAdToPromote] = useState<Ad | null>(null);
    const [previousPage, setPreviousPage] = useState<Page>(Page.Home);
    const [paymentDetails, setPaymentDetails] = useState<{item: Item, price: string} | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Data states
    const [items, setItems] = useState<Item[]>([]);
    const [chats, setChats] = useState<ChatItem[]>(initialChats);
    const [ads, setAds] = useState<Ad[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [user, setUser] = useState<User>(currentUser);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
    
    // Fetch initial data on mount, simulating a real app
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [itemsData, usersData, adsData, recentActivitiesData] = await Promise.all([
                    api.getItems(),
                    api.getUsers(),
                    api.getAds(),
                    api.getRecentActivities()
                ]);
                setItems(itemsData);
                setAllUsers(usersData);
                setAds(adsData);
                setRecentActivities(recentActivitiesData);
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
                alert("Could not load marketplace data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        subcategories: [],
        minPrice: '',
        maxPrice: '',
        conditions: [],
        location: '',
    });

    const navigate = (page: Page) => {
        setPreviousPage(currentPage);
        setCurrentPage(page);
    };

    const handleItemSelect = (item: Item) => {
        setSelectedItem(item);
        navigate(Page.ItemDetail);
    };

    const handleSellerSelect = (seller: Seller) => {
        setSelectedSeller(seller);
        navigate(Page.SellerProfile);
    }

    const handleSelectChat = (chatId: number) => {
        setSelectedChatId(chatId);
        navigate(Page.Conversation);
    };

    const handleEditAd = (ad: Ad) => {
        setSelectedAd(ad);
        navigate(Page.EditAd);
    };

    const handlePromoteAd = (ad: Ad) => {
        setAdToPromote(ad);
        navigate(Page.Promotions);
    };

    const handlePlanSelection = async () => {
        if (!adToPromote) return;
        
        await api.togglePromotionStatus(adToPromote.id);
        
        // Refetch data to reflect changes
        setAds(await api.getAds());
        setItems(await api.getItems());
        
        setAdToPromote(null);
        alert('Your ad has been successfully promoted!');
        navigate(Page.MyAds);
    };
    
    const handleEditItemFromDetailPage = (itemToEdit: Item) => {
        const adToEdit = ads.find(ad => ad.id === itemToEdit.id);
        if (adToEdit) {
            handleEditAd(adToEdit);
        } else {
            alert("We couldn't find the ad to edit. It might have been removed.");
        }
    };
    
    const handlePostAd = async (newAdData: Omit<Ad, 'id' | 'views' | 'likes' | 'status' | 'imageUrl'> & { images: string[] }) => {
        try {
            await api.postAd(newAdData);
            // Refetch ads and items to update the UI with the new persistent data
            setAds(await api.getAds());
            setItems(await api.getItems());

            alert('Ad posted successfully!');
            navigate(Page.MyAds);
        } catch (error) {
            console.error("Failed to post ad:", error);
            alert("There was an error posting your ad. Please try again.");
        }
    };
    
    const handleUpdateAd = (updatedAd: Ad) => {
        setAds(ads.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
        alert('Ad updated successfully!');
        navigate(Page.MyAds);
    };
    
    const handleSendMessage = (conversationId: number, text: string, type: 'text' | 'offer', offerDetails?: { price: string; status: 'pending' | 'accepted' | 'declined' }) => {
        const updatedConversations = conversations.map(c => {
            if (c.id === conversationId) {
                const newMessage = { id: Date.now(), text, timestamp: 'Just now', sender: 'me' as const, type, offerDetails };
                return { ...c, messages: [...c.messages, newMessage] };
            }
            return c;
        });
        setConversations(updatedConversations);
    };

    const handleOfferAction = (conversationId: number, messageId: number, action: 'accepted' | 'declined') => {
        setConversations(conversations.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: conv.messages.map(msg => {
                        if (msg.id === messageId && msg.offerDetails) {
                            return { ...msg, offerDetails: { ...msg.offerDetails, status: action } };
                        }
                        return msg;
                    })
                };
            }
            return conv;
        }));
    };

    const handleProceedToPayment = (price: string, item: Item) => {
        setPaymentDetails({ price, item });
        navigate(Page.Payment);
    };

    const handleDeleteItemByAdmin = async (itemId: number) => {
        if (window.confirm('Are you sure you want to permanently delete this item? This action cannot be undone.')) {
            await api.deleteItem(itemId);
            setItems(items.filter(item => item.id !== itemId));
            setAds(ads.filter(ad => ad.id !== itemId));
            alert('Item deleted successfully.');
        }
    };

    const handleDeleteUserByAdmin = async (userId: number) => {
        if (window.confirm('Are you sure you want to permanently delete this user and all their listings? This action cannot be undone.')) {
            if (userId === user.id) {
                alert("You cannot delete your own admin account.");
                return;
            }
            await api.deleteUser(userId);
            // Refresh data from "API"
            setAllUsers(await api.getUsers());
            setItems(await api.getItems());
            setAds(await api.getAds());
            alert('User and all associated data deleted successfully.');
        }
    };

    const handleToggleUserAdminStatus = async (userId: number) => {
         if (userId === user.id) {
            alert("You cannot change your own admin status.");
            return;
        }
        await api.toggleAdminStatus(userId);
        setAllUsers(await api.getUsers());
    };

    const handleToggleListingPromotion = async (itemId: number) => {
        await api.togglePromotionStatus(itemId);
        setItems(await api.getItems());
        setAds(await api.getAds());
    };

    const subcategoryToCategoryMap: { [key: string]: string } = {};
    for (const category in categoriesWithSubcategories) {
        for (const sub of (categoriesWithSubcategories as any)[category]) {
            subcategoryToCategoryMap[sub] = category;
        }
    }

    const filteredItems = items.filter(item => {
        const { subcategories, minPrice, maxPrice, location } = filters;

        if (searchQuery && 
            !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
            return false;
        }

        const price = parseFloat(item.price.replace('$', ''));
        if (minPrice && price < parseFloat(minPrice)) {
            return false;
        }
        if (maxPrice && price > parseFloat(maxPrice)) {
            return false;
        }

        if (subcategories.length > 0) {
            const selectedParentCategories = new Set(subcategories.map(sub => subcategoryToCategoryMap[sub]).filter(Boolean));
            if (!selectedParentCategories.has(item.category)) {
                return false;
            }
        }
        
        return true;
    }).sort((a, b) => Number(b.isPromoted) - Number(a.isPromoted));
    
    const renderPage = () => {
        if(isLoading) {
            return <div className="flex justify-center items-center h-full"><p>Loading Marketplace...</p></div>;
        }

        switch (currentPage) {
            case Page.Home:
                return <HomePage items={filteredItems} onItemSelect={handleItemSelect} onShowFilters={() => navigate(Page.Filters)} onShowNotifications={() => navigate(Page.Notifications)} notificationCount={notifications.filter(n => !n.read).length} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
            case Page.Chat:
                return <ChatPage chats={chats} onSelectChat={handleSelectChat} />;
            case Page.Sell:
                return <SellPage onPostAd={handlePostAd} />;
            case Page.MyAds:
                return <MyAdsPage ads={ads} onEditAd={handleEditAd} onPromoteAd={handlePromoteAd} />;
            case Page.Profile:
                return <ProfilePage user={user} onNavigate={navigate} activeAdsCount={ads.filter(ad => ad.status === 'Active').length} />;
            case Page.ItemDetail:
                if (selectedItem) {
                    return <ItemDetailPage 
                        item={selectedItem} 
                        currentUser={user}
                        onBack={() => navigate(previousPage)} 
                        onSellerSelect={handleSellerSelect} 
                        onStartChat={() => {
                            const existingChat = chats.find(c => c.name === selectedItem.seller.name);
                            if (existingChat) handleSelectChat(existingChat.id);
                        }} 
                        onBuyNow={(item) => { handleProceedToPayment(item.price, item)}} 
                        onEditItem={handleEditItemFromDetailPage}
                    />;
                }
                return <HomePage items={filteredItems} onItemSelect={handleItemSelect} onShowFilters={() => navigate(Page.Filters)} onShowNotifications={() => navigate(Page.Notifications)} notificationCount={notifications.filter(n => !n.read).length} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
            case Page.SellerProfile:
                if (selectedSeller) {
                    return <SellerProfilePage seller={selectedSeller} items={items.filter(i => i.seller.id === selectedSeller.id)} onBack={() => navigate(Page.ItemDetail)} onItemSelect={handleItemSelect} />;
                }
                return <HomePage items={filteredItems} onItemSelect={handleItemSelect} onShowFilters={() => navigate(Page.Filters)} onShowNotifications={() => navigate(Page.Notifications)} notificationCount={notifications.filter(n => !n.read).length} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
            case Page.Conversation:
                const chat = chats.find(c => c.id === selectedChatId);
                const conversation = conversations.find(c => c.id === selectedChatId);
                if (chat && conversation) {
                    return <ConversationPage chat={chat} conversation={conversation} onBack={() => navigate(Page.Chat)} onSendMessage={handleSendMessage} onOfferAction={handleOfferAction} onProceedToPayment={handleProceedToPayment} />;
                }
                return <ChatPage chats={chats} onSelectChat={handleSelectChat} />;
            case Page.Filters:
                return <FilterPage onBack={() => navigate(Page.Home)} onApplyFilters={(f) => { setFilters(f); navigate(Page.Home); }} currentFilters={filters} />;
            case Page.Notifications:
                return <NotificationsPage notifications={notifications} onBack={() => navigate(previousPage)} onSelectNotification={(n) => { setNotifications(notifications.map(noti => noti.id === n.id ? {...noti, read: true} : noti)); if(n.relatedId) handleSelectChat(n.relatedId) }} onMarkAllRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))} />;
            case Page.EditAd:
                 if (selectedAd) {
                    return <EditAdPage ad={selectedAd} onBack={() => navigate(Page.MyAds)} onUpdateAd={handleUpdateAd} />;
                }
                return <MyAdsPage ads={ads} onEditAd={handleEditAd} onPromoteAd={handlePromoteAd} />;
            case Page.Promotions:
                return <PromotionsPage onBack={() => navigate(Page.MyAds)} onSelectPlan={handlePlanSelection} />;
            case Page.Payment:
                if (paymentDetails) {
                    return <PaymentPage item={paymentDetails.item} price={paymentDetails.price} paymentMethods={paymentMethods} onBack={() => navigate(previousPage)} onConfirmPayment={() => {
                        const conv = conversations.find(c => c.item?.id === paymentDetails.item.id);
                        if(conv) {
                            setConversations(conversations.map(c => c.id === conv.id ? {...c, paymentStatus: 'paid'} : c));
                        }
                        navigate(Page.Home);
                    }} />;
                }
                return <HomePage items={filteredItems} onItemSelect={handleItemSelect} onShowFilters={() => navigate(Page.Filters)} onShowNotifications={() => navigate(Page.Notifications)} notificationCount={notifications.filter(n => !n.read).length} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
            case Page.Addresses:
                return <AddressesPage addresses={addresses} onBack={() => navigate(Page.Profile)} onSave={(addr) => setAddresses(prev => { const exists = prev.find(a => a.id === addr.id); return exists ? prev.map(a => a.id === addr.id ? addr : a) : [...prev, addr] })} onDelete={(id) => setAddresses(addresses.filter(a => a.id !== id))} />;
            case Page.PaymentMethods:
                return <PaymentMethodsPage paymentMethods={paymentMethods} onBack={() => navigate(Page.Profile)} onSave={(method) => setPaymentMethods(prev => { const exists = prev.find(m => m.id === method.id); return exists ? prev.map(m => m.id === method.id ? method : m) : [...prev, method] })} onDelete={(id) => setPaymentMethods(paymentMethods.filter(m => m.id !== id))} />;
            case Page.Admin:
                return <AdminPage 
                    users={allUsers} 
                    items={items} 
                    ads={ads} 
                    recentActivities={recentActivities}
                    onBack={() => navigate(Page.Profile)} 
                    onDeleteItem={handleDeleteItemByAdmin} 
                    onDeleteUser={handleDeleteUserByAdmin} 
                    onSelectItem={handleItemSelect} 
                    onToggleAdmin={handleToggleUserAdminStatus}
                    onTogglePromotion={handleToggleListingPromotion}
                />;
            default:
                return <HomePage items={filteredItems} onItemSelect={handleItemSelect} onShowFilters={() => navigate(Page.Filters)} onShowNotifications={() => navigate(Page.Notifications)} notificationCount={notifications.filter(n => !n.read).length} searchQuery={searchQuery} onSearchChange={setSearchQuery} />;
        }
    };

    const showNav = [Page.Home, Page.Chat, Page.Sell, Page.MyAds, Page.Profile].includes(currentPage);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg h-screen overflow-hidden">
            <div className={`h-full overflow-y-auto ${showNav ? 'pb-16' : ''}`}>
                {renderPage()}
            </div>
            {showNav && <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    );
};

export default App;