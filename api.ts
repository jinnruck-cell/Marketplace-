// This file simulates a backend API. It uses localStorage to make the data
// persistent across page reloads, mimicking a real database.

import { initialItems, initialChats, initialAds, initialConversations, initialNotifications, initialPaymentMethods, initialAddresses, currentUser, allUsers as initialAllUsers, recentActivities as initialRecentActivities } from './data';
import { Item, ChatItem, Ad, Conversation, Notification, PaymentMethod, Address, User, RecentActivity, Seller } from './types';

// Simulate network latency
const LATENCY = 100;

// --- LocalStorage "Database" Setup ---

const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

const saveToStorage = <T>(key: string, value: T): void => {
    try {
        const item = JSON.stringify(value);
        window.localStorage.setItem(key, item);
    } catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
};

// Initialize in-memory "database" from localStorage or initial data
let items: Item[] = getFromStorage('db_items', initialItems);
let chats: ChatItem[] = getFromStorage('db_chats', initialChats);
let ads: Ad[] = getFromStorage('db_ads', initialAds);
let conversations: Conversation[] = getFromStorage('db_conversations', initialConversations);
let notifications: Notification[] = getFromStorage('db_notifications', initialNotifications);
let paymentMethods: PaymentMethod[] = getFromStorage('db_paymentMethods', initialPaymentMethods);
let addresses: Address[] = getFromStorage('db_addresses', initialAddresses);
let allUsers: User[] = getFromStorage('db_allUsers', initialAllUsers);
let recentActivities: RecentActivity[] = getFromStorage('db_recentActivities', initialRecentActivities);

// Initial save if localStorage is empty
if (!window.localStorage.getItem('db_initialized')) {
    saveToStorage('db_items', items);
    saveToStorage('db_chats', chats);
    saveToStorage('db_ads', ads);
    saveToStorage('db_conversations', conversations);
    saveToStorage('db_notifications', notifications);
    saveToStorage('db_paymentMethods', paymentMethods);
    saveToStorage('db_addresses', addresses);
    saveToStorage('db_allUsers', allUsers);
    saveToStorage('db_recentActivities', recentActivities);
    window.localStorage.setItem('db_initialized', 'true');
}

// --- API Functions ---

// --- READ operations ---
export const getItems = async (): Promise<Item[]> => {
    await new Promise(res => setTimeout(res, LATENCY));
    return Promise.resolve([...items]);
};

export const getUsers = async (): Promise<User[]> => {
    await new Promise(res => setTimeout(res, LATENCY));
    return Promise.resolve([...allUsers]);
};

export const getAds = async (): Promise<Ad[]> => {
    await new Promise(res => setTimeout(res, LATENCY));
    return Promise.resolve([...ads]);
};

export const getRecentActivities = async (): Promise<RecentActivity[]> => {
    await new Promise(res => setTimeout(res, LATENCY));
    return Promise.resolve([...recentActivities]);
};

// --- WRITE operations ---

export const postAd = async (newAdData: Omit<Ad, 'id' | 'views' | 'likes' | 'status' | 'imageUrl'> & { images: string[] }): Promise<{ ad: Ad, item: Item }> => {
    await new Promise(res => setTimeout(res, LATENCY));
    const user = currentUser; // In a real app, this would be the logged-in user

    const newAd: Ad = {
        id: Date.now(),
        ...newAdData,
        imageUrl: newAdData.images[0] || 'https://images.unsplash.com/photo-1598327105666-65845214a0a2?q=80&w=400',
        status: 'Active',
        views: 0,
        likes: 0,
    };
    ads = [newAd, ...ads];
    saveToStorage('db_ads', ads);

    const sellerData: Seller = {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        reviews: user.reviews,
        memberSince: user.memberSince,
    };

    const newItem: Item = {
        id: newAd.id,
        title: newAd.title,
        description: newAd.description,
        price: newAd.price,
        imageUrl: newAd.imageUrl,
        category: newAd.category,
        location: newAd.location,
        seller: sellerData,
        status: 'available',
        badge: 'New',
        condition: newAd.condition,
        sizes: newAd.sizes,
        colors: newAd.colors,
        material: newAd.material,
    };
    items = [newItem, ...items];
    saveToStorage('db_items', items);
    
    console.log(`API: Posted new ad ${newItem.id}`);
    return { ad: newAd, item: newItem };
};

export const deleteItem = async (itemId: number): Promise<{ success: true }> => {
    await new Promise(res => setTimeout(res, LATENCY));
    items = items.filter(item => item.id !== itemId);
    ads = ads.filter(ad => ad.id !== itemId);
    saveToStorage('db_items', items);
    saveToStorage('db_ads', ads);
    console.log(`API: Deleted item ${itemId}`);
    return { success: true };
};

export const deleteUser = async (userId: number): Promise<{ success: true }> => {
    await new Promise(res => setTimeout(res, LATENCY));
    const userToDelete = allUsers.find(u => u.id === userId);
    if (!userToDelete) return Promise.reject(new Error('User not found'));

    allUsers = allUsers.filter(u => u.id !== userId);
    items = items.filter(item => item.seller.id !== userId);
    const userAdIds = ads.filter(ad => items.some(item => item.id === ad.id && item.seller.id === userId)).map(ad => ad.id);
    ads = ads.filter(ad => !userAdIds.includes(ad.id));
    
    if (userToDelete) {
        chats = chats.filter(chat => chat.name !== userToDelete.name);
    }

    saveToStorage('db_allUsers', allUsers);
    saveToStorage('db_items', items);
    saveToStorage('db_ads', ads);
    saveToStorage('db_chats', chats);

    console.log(`API: Deleted user ${userId} and their data.`);
    return { success: true };
};

export const toggleAdminStatus = async (userId: number): Promise<User> => {
    await new Promise(res => setTimeout(res, LATENCY));
    let updatedUser: User | undefined;
    allUsers = allUsers.map(u => {
        if (u.id === userId) {
            updatedUser = { ...u, isAdmin: !u.isAdmin };
            return updatedUser;
        }
        return u;
    });
    
    if (!updatedUser) return Promise.reject(new Error('User not found'));
    
    saveToStorage('db_allUsers', allUsers);
    console.log(`API: Toggled admin status for user ${userId}`);
    return updatedUser;
};

export const togglePromotionStatus = async (itemId: number): Promise<Item> => {
    await new Promise(res => setTimeout(res, LATENCY));
    let updatedItem: Item | undefined;

    items = items.map(item => {
        if (item.id === itemId) {
            updatedItem = { ...item, isPromoted: !item.isPromoted };
            return updatedItem;
        }
        return item;
    });

    ads = ads.map(ad => {
        if (ad.id === itemId) {
            return { ...ad, isPromoted: !ad.isPromoted };
        }
        return ad;
    });

    if (!updatedItem) return Promise.reject(new Error('Item not found'));

    saveToStorage('db_items', items);
    saveToStorage('db_ads', ads);
    console.log(`API: Toggled promotion status for item ${itemId}`);
    return updatedItem;
};