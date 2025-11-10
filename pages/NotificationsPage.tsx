// Fix: Create the NotificationsPage component.
import React from 'react';
// Fix: Corrected import path for types
import { Notification } from '../types';
import Icon from '../components/Icon';

interface NotificationsPageProps {
  notifications: Notification[];
  onBack: () => void;
  onSelectNotification: (notification: Notification) => void;
  // Fix: Add onMarkAllRead prop to handle marking all notifications as read.
  onMarkAllRead: () => void;
}

const NotificationItem: React.FC<{ notification: Notification, onClick: () => void }> = ({ notification, onClick }) => {
    const iconMap = {
        offer: 'tag',
        message: 'chat',
        alert: 'bell',
        promotion: 'star',
    };

    const iconColorMap = {
        offer: 'bg-green-100 text-green-600',
        message: 'bg-blue-100 text-blue-600',
        alert: 'bg-yellow-100 text-yellow-600',
        promotion: 'bg-purple-100 text-purple-600',
    };

    return (
        <div onClick={onClick} className={`flex items-start p-4 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-indigo-50' : 'bg-white'}`}>
            <div className={`mr-4 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${iconColorMap[notification.type]}`}>
                <Icon name={iconMap[notification.type]} className="h-5 w-5" />
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-800">{notification.text}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
            </div>
            {!notification.read && <div className="ml-4 w-2.5 h-2.5 bg-indigo-500 rounded-full self-center"></div>}
        </div>
    );
};

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, onBack, onSelectNotification, onMarkAllRead }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fix: Add a "Mark all as read" button and adjust header layout. */}
            <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white border-b">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold truncate">Notifications</h1>
                </div>
                {notifications.some(n => !n.read) && (
                    <button onClick={onMarkAllRead} className="text-sm font-semibold text-indigo-600">Mark all as read</button>
                )}
            </header>
            <main className="pt-20">
                {notifications.length > 0 ? (
                    <div className="bg-white divide-y">
                        {notifications.map(n => (
                            <NotificationItem key={n.id} notification={n} onClick={() => onSelectNotification(n)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10 mt-16 text-gray-500 flex flex-col items-center justify-center">
                        <Icon name="bell" className="w-20 h-20 text-gray-300 mb-4" />
                        <h2 className="text-xl font-semibold">No notifications yet</h2>
                        <p className="text-sm mt-2">We'll let you know when something important happens.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NotificationsPage;