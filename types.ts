// Fix: Create types for the application to resolve module and type errors across multiple files.
export enum Page {
  Home = 'HOME',
  Chat = 'CHAT',
  Sell = 'SELL',
  MyAds = 'MY_ADS',
  Profile = 'PROFILE',
  ItemDetail = 'ITEM_DETAIL',
  SellerProfile = 'SELLER_PROFILE',
  Conversation = 'CONVERSATION',
  Filters = 'FILTERS',
  Notifications = 'NOTIFICATIONS',
  EditAd = 'EDIT_AD',
  Promotions = 'PROMOTIONS',
  Payment = 'PAYMENT',
  Addresses = 'ADDRESSES',
  PaymentMethods = 'PAYMENT_METHODS',
  Admin = 'ADMIN',
}

export interface Seller {
  id: number;
  name: string;
  avatarUrl: string;
  reviews: number;
  memberSince: string;
  contactCount?: number;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  location: string;
  seller: Seller;
  sizes?: string[];
  colors?: string[];
  material?: string;
  status?: 'available' | 'sold';
  badge?: 'New' | 'Featured';
  isPromoted?: boolean;
  condition?: string;
}

export interface FilterState {
  categories: string[];
  subcategories: string[];
  minPrice: string;
  maxPrice: string;
  conditions: string[];
  location: string;
}

export interface ChatItem {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isFavorite: boolean;
  type: 'buying' | 'selling';
  reviews?: number;
  status?: 'online' | 'offline';
}

export interface Ad {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  status: 'Active' | 'Sold' | 'Pending';
  views: number;
  likes: number;
  category: string;
  description: string;
  // Fix: Add location to Ad type to resolve error in SellPage.
  location: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
  isPromoted?: boolean;
  condition?: string;
}

export interface Message {
    id: number;
    text: string;
    timestamp: string;
    sender: 'me' | 'other';
    type: 'text' | 'offer';
    offerDetails?: {
        price: string;
        status: 'pending' | 'accepted' | 'declined';
    };
}

export interface Conversation {
  id: number; // Corresponds to chat id
  item: Item | null;
  messages: Message[];
  paymentStatus?: 'pending' | 'paid';
}

export interface Notification {
    id: number;
    type: 'offer' | 'message' | 'alert' | 'promotion';
    text: string;
    timestamp: string;
    read: boolean;
    relatedId?: number;
}

export interface PaymentMethod {
    id: number;
    type: string; // 'Credit Card' | 'PayPal'
    last4?: string;
    cardholderName?: string;
    expiryDate?: string;
    email?: string;
    isDefault: boolean;
}

export interface Address {
    id: number;
    type: 'Home' | 'Work' | 'Other';
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isDefault: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    memberSince: string;
    stats: {
        orders: number;
        favorites: number;
    };
    reviews: number;
    isAdmin?: boolean;
}

export interface Review {
    id: number;
    authorName: string;
    authorAvatarUrl: string;
    comment: string;
    timestamp: string;
}

export interface RecentActivity {
    id: number;
    type: 'newUser' | 'newListing';
    description: string;
    timestamp: string;
    author?: {
        name: string;
        avatarUrl: string;
    };
    listing?: {
        title: string;
        imageUrl: string;
    }
}