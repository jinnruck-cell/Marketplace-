// Fix: Create mock data for the application.
import { Seller, Item, ChatItem, Conversation, Message, Ad, Notification, PaymentMethod, Address, User, Review, RecentActivity } from './types';

export const initialSellers: Seller[] = [
    { id: 1, name: 'John Doe', avatarUrl: 'https://i.pravatar.cc/150?u=seller1', reviews: 125, memberSince: 'Jan 2022', contactCount: 12 },
    { id: 2, name: 'Jane Smith', avatarUrl: 'https://i.pravatar.cc/150?u=seller2', reviews: 210, memberSince: 'Mar 2021', contactCount: 34 },
    { id: 3, name: 'Sam Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=seller3', reviews: 88, memberSince: 'Jun 2022' },
    { id: 4, name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=seller4', reviews: 301, memberSince: 'Sep 2020' },
    { id: 5, name: 'Bob Brown', avatarUrl: 'https://i.pravatar.cc/150?u=seller5', reviews: 150, memberSince: 'Feb 2023', contactCount: 5 },
];

export const initialItems: Item[] = [
    { id: 1, title: 'Vintage Leather Jacket', description: 'Classic brown leather jacket, great for all seasons. Size M.', price: '$120.00', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400', category: 'Fashion', location: 'Los Angeles, CA', seller: initialSellers[0], colors: ['Brown', 'Black'], sizes: ['S', 'M', 'L'], material: 'Genuine Leather', status: 'available', badge: 'Featured', condition: 'Used - Good', isPromoted: true },
    { id: 2, title: 'Acoustic Guitar', description: 'Full-sized dreadnought acoustic guitar. Great for beginners. Comes with a soft case.', price: '$250.00', imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=400', category: 'Hobbies', location: 'Los Angeles, CA', seller: initialSellers[1], status: 'sold', material: 'Spruce Wood', condition: 'Used - Like New' },
    { id: 3, title: 'Modern Bookshelf', description: 'Minimalist bookshelf with 5 tiers. Solid oak. Perfect for any room.', price: '$75.00', imageUrl: 'https://images.unsplash.com/photo-1533749459272-35914599e287?q=80&w=400', category: 'Furniture', location: 'Chicago, IL', seller: initialSellers[2], status: 'available', material: 'Oak Wood', condition: 'Used - Good' },
    { id: 4, title: 'Professional Camera Drone', description: '4K camera drone with 3-axis gimbal. 30 minutes flight time. Like new.', price: '$450.00', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=400', category: 'Electronics', location: 'Houston, TX', seller: initialSellers[3], status: 'available', badge: 'New', condition: 'New' },
    { id: 5, title: 'Mountain Bike', description: '29-inch wheels, hydraulic disc brakes. Great for trails.', price: '$300.00', imageUrl: 'https://images.unsplash.com/photo-1570425332214-95723bda6974?q=80&w=400', category: 'Bikes', location: 'Denver, CO', seller: initialSellers[4], status: 'available', material: 'Aluminum Alloy', condition: 'Used - Like New' },
    { id: 6, title: 'Designer Sunglasses', description: 'UV400 protection, polarized lenses. Stylish and functional.', price: '$90.00', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400', category: 'Fashion', location: 'Miami, FL', seller: initialSellers[0], status: 'sold', condition: 'Used - Good' },
    { id: 7, title: 'Latest Smartphone', description: 'Latest model with 256GB storage. Unlocked. Comes with original packaging.', price: '$650.00', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400', category: 'Mobiles', location: 'San Francisco, CA', seller: initialSellers[1], status: 'available', badge: 'New', condition: 'New' },
    { id: 8, title: 'Compact Sedan', description: '2019 model, low mileage, great fuel efficiency. Perfect for city driving.', price: '$8500.00', imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400', category: 'Cars', location: 'Austin, TX', seller: initialSellers[2], status: 'available', condition: 'Used - Good' },
    { id: 9, title: 'Gaming Laptop', description: 'High-performance gaming laptop with RTX 3070. 1TB SSD, 16GB RAM.', price: '$1200.00', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400', category: 'Electronics', location: 'Seattle, WA', seller: initialSellers[3], status: 'available', condition: 'Used - Like New' },
];

export const initialChats: ChatItem[] = [
    { id: 1, name: 'John Doe', avatarUrl: initialSellers[0].avatarUrl, lastMessage: 'Hey, I saw your ad for the vintage camera. Is it still available?', timestamp: '10:00 AM', unread: true, isFavorite: true, type: 'selling', reviews: initialSellers[0].reviews, status: 'online' },
    { id: 2, name: 'Jane Smith', avatarUrl: initialSellers[1].avatarUrl, lastMessage: 'Great, I will be there at 5.', timestamp: '1h ago', unread: false, isFavorite: false, type: 'buying', reviews: initialSellers[1].reviews, status: 'offline' },
    { id: 3, name: 'Sam Wilson', avatarUrl: initialSellers[2].avatarUrl, lastMessage: 'Can you do $250?', timestamp: '5h ago', unread: true, isFavorite: false, type: 'buying', reviews: initialSellers[2].reviews, status: 'online' },
    { id: 4, name: 'Alice Johnson', avatarUrl: initialSellers[3].avatarUrl, lastMessage: 'Thanks for the quick sale!', timestamp: '1d ago', unread: false, isFavorite: true, type: 'selling', reviews: initialSellers[3].reviews, status: 'offline' },
    { id: 5, name: 'Bob Brown', avatarUrl: initialSellers[4].avatarUrl, lastMessage: 'Perfect condition, as described.', timestamp: '2d ago', unread: false, isFavorite: false, type: 'selling', reviews: initialSellers[4].reviews, status: 'offline' },
];

export const initialConversations: Conversation[] = [
    { 
        id: 1, 
        item: initialItems[0], 
        messages: [
            { id: 1, text: 'Hey, I saw your ad for the vintage camera. Is it still available?', sender: 'other', timestamp: '10:00 AM', type: 'text' },
            { id: 2, text: 'Hi! Yes, it is still available.', sender: 'me', timestamp: '10:01 AM', type: 'text' },
            { id: 3, text: 'Great! Is the price negotiable?', sender: 'other', timestamp: '10:02 AM', type: 'text' },
            { id: 4, text: 'I can do a small discount. What are you offering?', sender: 'me', timestamp: '10:03 AM', type: 'text' },
            { id: 5, text: 'Is this still available?', sender: 'other', timestamp: '2m ago', type: 'text' },
        ], 
        paymentStatus: 'pending' 
    },
    { id: 2, item: initialItems[1], messages: [{ id: 1, text: 'Great, I will be there at 5.', sender: 'other', timestamp: '1h ago', type: 'text' }], paymentStatus: 'pending' },
    { id: 3, item: initialItems[4], messages: [{ id: 1, text: 'Can you do $250?', sender: 'other', timestamp: '5h ago', type: 'text' }], paymentStatus: 'pending' },
    { id: 4, item: initialItems[5], messages: [{ id: 1, text: 'Thanks for the quick sale!', sender: 'me', timestamp: '1d ago', type: 'text' }], paymentStatus: 'paid' },
    { id: 5, item: initialItems[2], messages: [{ id: 1, text: 'Perfect condition, as described.', sender: 'other', timestamp: '2d ago', type: 'text' }], paymentStatus: 'paid' },
];

export const initialAds: Ad[] = [
    { id: 1, title: 'Vintage Leather Jacket', price: '$120.00', imageUrl: initialItems[0].imageUrl, status: 'Active', views: 120, likes: 15, category: 'Fashion', description: initialItems[0].description, location: initialItems[0].location, sizes: ['S', 'M', 'L'], colors: ['Brown', 'Black'], material: 'Genuine Leather', condition: 'Used - Good', isPromoted: true },
    { id: 2, title: 'Acoustic Guitar', price: '$250.00', imageUrl: initialItems[1].imageUrl, status: 'Sold', views: 500, likes: 45, category: 'Hobbies', description: initialItems[1].description, location: initialItems[1].location, material: 'Spruce Wood', condition: 'Used - Like New' },
    { id: 3, title: 'Modern Bookshelf', price: '$75.00', imageUrl: initialItems[2].imageUrl, status: 'Pending', views: 80, likes: 5, category: 'Furniture', description: initialItems[2].description, location: initialItems[2].location, material: 'Oak Wood', condition: 'Used - Good' },
];

export const initialNotifications: Notification[] = [
    { id: 1, type: 'message', text: 'John Doe sent you a message.', timestamp: '2m ago', read: false, relatedId: 1 },
    { id: 2, type: 'offer', text: 'You have a new offer for your Vintage Leather Jacket.', timestamp: '1h ago', read: false },
    { id: 3, type: 'alert', text: 'Your ad "Acoustic Guitar" has been sold!', timestamp: '5h ago', read: true },
    { id: 4, type: 'message', text: 'Jane Smith replied to your message.', timestamp: '1d ago', read: true, relatedId: 2 },
    { id: 5, type: 'offer', text: 'Offer of $70 for "Modern Bookshelf" has been accepted.', timestamp: '2d ago', read: false },
];

export const initialPaymentMethods: PaymentMethod[] = [
    { id: 1, type: 'Credit Card', last4: '4242', cardholderName: 'John Doe', expiryDate: '12/25', isDefault: true },
    { id: 2, type: 'Credit Card', last4: '1111', cardholderName: 'John Doe', expiryDate: '08/26', isDefault: false },
    { id: 3, type: 'PayPal', email: 'john.doe@example.com', isDefault: false }
];

export const initialAddresses: Address[] = [
    { id: 1, type: 'Home', fullName: 'John Doe', street: '123 Main St', city: 'Brooklyn', state: 'NY', zip: '11201', country: 'USA', isDefault: true },
    { id: 2, type: 'Work', fullName: 'John Doe', street: '456 Market St', city: 'Manhattan', state: 'NY', zip: '10001', country: 'USA', isDefault: false },
];

export const categoriesWithSubcategories = {
    'Cars': ['Sedan', 'SUV', 'Truck', 'Coupe'],
    'Mobiles': ['iPhone', 'Android', 'Tablets', 'Accessories'],
    'Electronics': ['Laptops', 'Cameras', 'Headphones', 'TVs'],
    'Furniture': ['Sofas', 'Beds', 'Tables', 'Chairs'],
    'Bikes': ['Road Bikes', 'Mountain Bikes', 'Electric Bikes'],
    'Fashion': ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Bags'],
};

export const currentUser: User = {
    id: 99,
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=current-user',
    memberSince: 'Jan 2023',
    stats: {
        orders: 5,
        favorites: 12
    },
    reviews: 8,
    isAdmin: true,
};

export const allUsers: User[] = [
    ...initialSellers.map(seller => ({
        id: seller.id,
        name: seller.name,
        email: `${seller.name.toLowerCase().replace(' ', '.')}@example.com`,
        avatarUrl: seller.avatarUrl,
        memberSince: seller.memberSince,
        reviews: seller.reviews,
        stats: { orders: Math.floor(seller.reviews / 5), favorites: Math.floor(seller.reviews / 2) },
    })),
];

if (!allUsers.find(u => u.id === currentUser.id)) {
    allUsers.push(currentUser);
}

export const recentActivities: RecentActivity[] = [
    {
        id: 1,
        type: 'newListing',
        description: 'posted a new listing.',
        timestamp: '2 hours ago',
        author: { name: 'Alice Johnson', avatarUrl: initialSellers[3].avatarUrl },
        listing: { title: 'Gaming Laptop', imageUrl: initialItems[8].imageUrl }
    },
    {
        id: 2,
        type: 'newUser',
        description: 'joined the platform.',
        timestamp: '5 hours ago',
        author: { name: 'Bob Brown', avatarUrl: initialSellers[4].avatarUrl }
    },
     {
        id: 3,
        type: 'newListing',
        description: 'posted a new listing.',
        timestamp: '1 day ago',
        author: { name: 'Sam Wilson', avatarUrl: initialSellers[2].avatarUrl },
        listing: { title: 'Compact Sedan', imageUrl: initialItems[7].imageUrl }
    },
];


export const sellerReviews: { [key: number]: Review[] } = {
    1: [
        { id: 1, authorName: 'Emily R.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review1', comment: 'Great seller! Fast shipping and item was exactly as described. A pleasure to do business with!', timestamp: '2 days ago' },
        { id: 2, authorName: 'Michael B.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review2', comment: 'Good communication and fair price. Would buy from again.', timestamp: '1 week ago' },
    ],
    2: [
        { id: 3, authorName: 'Sophia L.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review3', comment: 'Absolutely perfect! The item was in pristine condition. Highly recommend this seller.', timestamp: '4 days ago' },
    ],
    3: [
        { id: 4, authorName: 'David C.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review4', comment: 'Very friendly and accommodating seller. The transaction was smooth and easy.', timestamp: '1 month ago' },
        { id: 5, authorName: 'Olivia M.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review5', comment: 'Item was as described, but shipping took a bit longer than expected. Overall a positive experience.', timestamp: '2 months ago' },
        { id: 6, authorName: 'James P.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review6', comment: 'Fantastic seller! Went above and beyond.', timestamp: '3 months ago' },
    ],
    4: [
         { id: 7, authorName: 'Isabella G.', authorAvatarUrl: 'https://i.pravatar.cc/150?u=review7', comment: 'Couldn\'t be happier with my purchase. The seller is top-notch!', timestamp: '6 days ago' },
    ],
};