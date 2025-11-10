import React, { useState, useMemo } from 'react';
import { User, Item, Ad, RecentActivity } from '../types';
import Icon from '../components/Icon';

interface AdminPageProps {
    users: User[];
    items: Item[];
    ads: Ad[];
    recentActivities: RecentActivity[];
    onBack: () => void;
    onDeleteItem: (itemId: number) => void;
    onDeleteUser: (userId: number) => void;
    onSelectItem: (item: Item) => void;
    onToggleAdmin: (userId: number) => void;
    onTogglePromotion: (itemId: number) => void;
}

type AdminTab = 'dashboard' | 'users' | 'listings';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-4 rounded-lg shadow border flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            <Icon name={icon} className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const { users, items, ads, recentActivities, onBack, onDeleteItem, onDeleteUser, onSelectItem, onToggleAdmin, onTogglePromotion } = props;
    const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

    const totalUsers = users.length;
    const totalListings = items.length;
    const activeListings = ads.filter(ad => ad.status === 'Active').length;
    const soldListings = ads.filter(ad => ad.status === 'Sold').length;
    
    const categoryCounts = useMemo(() => {
        const counts: { [key: string]: number } = {};
        items.forEach(item => {
            counts[item.category] = (counts[item.category] || 0) + 1;
        });
        return Object.entries(counts).sort((a,b) => b[1] - a[1]);
    }, [items]);
    const maxCategoryCount = Math.max(...categoryCounts.map(([, count]) => count), 0);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Site Statistics</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <StatCard title="Total Users" value={totalUsers} icon="profile" color="bg-blue-500" />
                                <StatCard title="Total Listings" value={totalListings} icon="ads" color="bg-green-500" />
                                <StatCard title="Active Listings" value={activeListings} icon="sell" color="bg-yellow-500" />
                                <StatCard title="Items Sold" value={soldListings} icon="gavel" color="bg-red-500" />
                            </div>
                        </section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Listings by Category</h2>
                                <div className="bg-white p-4 rounded-lg shadow border space-y-3">
                                    {categoryCounts.map(([category, count]) => (
                                        <div key={category} className="flex items-center">
                                            <span className="w-24 text-sm text-gray-600 truncate">{category}</span>
                                            <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2">
                                                 <div className="bg-indigo-500 h-4 rounded-full" style={{ width: `${(count / maxCategoryCount) * 100}%` }}></div>
                                            </div>
                                            <span className="text-sm font-semibold">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                                <div className="bg-white p-4 rounded-lg shadow border space-y-4">
                                    {recentActivities.map(activity => (
                                        <div key={activity.id} className="flex items-start">
                                            <img src={activity.author?.avatarUrl || activity.listing?.imageUrl} className="w-10 h-10 rounded-full object-cover mr-3" />
                                            <div>
                                                <p className="text-sm text-gray-800">
                                                    <span className="font-semibold">{activity.author?.name || 'A user'}</span> {activity.description}
                                                    {activity.listing && <span className="font-semibold text-indigo-600"> {activity.listing.title}</span>}
                                                </p>
                                                <p className="text-xs text-gray-500">{activity.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                );
            case 'users':
                return (
                     <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">User Management ({users.length})</h2>
                        <div className="bg-white rounded-lg shadow border overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">User</th>
                                        <th scope="col" className="px-4 py-3">Role</th>
                                        <th scope="col" className="px-4 py-3">Member Since</th>
                                        <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900 flex items-center">
                                                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {user.isAdmin ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{user.memberSince}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => onToggleAdmin(user.id)} className="font-medium text-indigo-600 hover:underline mr-4">
                                                    {user.isAdmin ? 'Demote' : 'Promote'}
                                                </button>
                                                <button onClick={() => onDeleteUser(user.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                );
            case 'listings':
                 return (
                     <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Listing Management ({items.length})</h2>
                        <div className="bg-white rounded-lg shadow border overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Listing</th>
                                        <th scope="col" className="px-4 py-3">Seller</th>
                                        <th scope="col" className="px-4 py-3">Promotion</th>
                                        <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                <div className="flex items-center">
                                                    <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-md object-cover mr-3" />
                                                    <div className="max-w-[150px] truncate">
                                                        <p className="font-semibold truncate">{item.title}</p>
                                                        <p className="text-xs text-gray-500">{item.price}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{item.seller.name}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.isPromoted ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {item.isPromoted ? 'Promoted' : 'None'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 space-x-4 text-right">
                                                <button onClick={() => onSelectItem(item)} className="font-medium text-blue-600 hover:underline">View</button>
                                                <button onClick={() => onTogglePromotion(item.id)} className="font-medium text-indigo-600 hover:underline">
                                                    {item.isPromoted ? 'Demote' : 'Promote'}
                                                </button>
                                                <button onClick={() => onDeleteItem(item.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                );
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white bg-opacity-95 backdrop-blur-sm border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Admin Dashboard</h1>
            </header>

            <main className="pt-20 p-4 space-y-8 pb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {(['dashboard', 'users', 'listings'] as AdminTab[]).map(tab => (
                             <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm capitalize`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {renderContent()}

            </main>
        </div>
    );
};

export default AdminPage;