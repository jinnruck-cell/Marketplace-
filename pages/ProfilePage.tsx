// Fix: Implement the ProfilePage component.
import React from 'react';
import Icon from '../components/Icon';
// Fix: Import User type for props
import { Page, User } from '../types';

// Fix: Add missing props to the interface
interface ProfilePageProps {
    user: User;
    onNavigate: (page: Page) => void;
    activeAdsCount: number;
}

const ProfileLink: React.FC<{ icon: string; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-white hover:bg-gray-50 text-left">
        <Icon name={icon} className="w-6 h-6 text-gray-500" />
        <span className="ml-4 font-medium text-gray-800">{label}</span>
        <Icon name="chevronRight" className="w-5 h-5 text-gray-400 ml-auto" />
    </button>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, activeAdsCount }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white p-4 shadow-sm">
                <h1 className="text-2xl font-bold text-center text-gray-900">My Profile</h1>
            </header>

            <div className="p-4 flex flex-col items-center">
                <img src={user.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <button className="mt-2 text-sm font-semibold text-indigo-600 hover:underline">Edit Profile</button>
            </div>

            <main className="mt-4">
                <div className="space-y-px">
                    <ProfileLink icon="orders" label="My Orders" onClick={() => { /* Implement navigation */ }} />
                    {/* Fix: Display active ad count */}
                    <ProfileLink icon="ads" label={`My Ads (${activeAdsCount})`} onClick={() => onNavigate(Page.MyAds)} />
                    <ProfileLink icon="heart" label="Favorites" onClick={() => { /* Implement navigation */ }} />
                </div>
                
                <div className="mt-6 space-y-px">
                    <ProfileLink icon="payment" label="Payment Methods" onClick={() => onNavigate(Page.PaymentMethods)} />
                    <ProfileLink icon="address" label="Addresses" onClick={() => onNavigate(Page.Addresses)} />
                    <ProfileLink icon="settings" label="Account Settings" onClick={() => { /* Implement navigation */ }} />
                </div>

                {user.isAdmin && (
                    <div className="mt-6 space-y-px">
                        <ProfileLink icon="gavel" label="Admin Dashboard" onClick={() => onNavigate(Page.Admin)} />
                    </div>
                )}

                <div className="mt-6 space-y-px">
                    <ProfileLink icon="feedback" label="Feedback" onClick={() => { /* Implement navigation */ }} />
                    <ProfileLink icon="help" label="Help & Support" onClick={() => { /* Implement navigation */ }} />
                </div>

                <div className="mt-6">
                     <button className="w-full flex items-center p-4 bg-white hover:bg-gray-50 text-left">
                        <Icon name="logout" className="w-6 h-6 text-red-500" />
                        <span className="ml-4 font-medium text-red-500">Logout</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;