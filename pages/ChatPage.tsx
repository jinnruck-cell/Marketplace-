

import React, { useState, useMemo } from 'react';
import Icon from '../components/Icon';
// Fix: Corrected import path for types
import { ChatItem } from '../types';

type FilterType = 'All' | 'Buying' | 'Selling' | 'Unread' | 'Favorites';

interface ChatPageProps {
    chats: ChatItem[];
    onSelectChat: (chatId: number) => void;
}

const ChatListItem: React.FC<{ chat: ChatItem; onClick: () => void }> = ({ chat, onClick }) => (
    <div onClick={onClick} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
        <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900">{chat.name}</h3>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
            </div>
            
            {(chat.reviews !== undefined && chat.reviews > 0) && (
                <p className="text-xs text-gray-500 mt-1">({chat.reviews} reviews)</p>
            )}

            <div className="flex justify-between items-start mt-1">
              <p className={`text-sm ${chat.unread ? 'text-gray-800 font-semibold' : 'text-gray-500'} truncate pr-2`}>{chat.lastMessage}</p>
              <div className="flex items-center space-x-2">
                {chat.isFavorite && <Icon name="star" className="w-4 h-4 text-yellow-400 fill-current" />}
                {chat.unread && <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>}
              </div>
            </div>
        </div>
    </div>
);

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex-shrink-0 ${isActive ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
    >
        {label}
    </button>
);


const ChatPage: React.FC<ChatPageProps> = ({ chats, onSelectChat }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    const filteredChats = useMemo(() => {
        if (activeFilter === 'All') {
            return chats;
        }
        return chats.filter(chat => {
            switch (activeFilter) {
                case 'Buying':
                    return chat.type === 'buying';
                case 'Selling':
                    return chat.type === 'selling';
                case 'Unread':
                    return chat.unread;
                case 'Favorites':
                    return chat.isFavorite;
                default:
                    return true;
            }
        });
    }, [activeFilter, chats]);

    const filters: FilterType[] = ['All', 'Buying', 'Selling', 'Unread', 'Favorites'];

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="bg-white p-4 border-b sticky top-0 z-10 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
                <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition-colors">
                    <Icon name="search" className="w-6 h-6" />
                </button>
            </header>
            <div className="p-4 bg-white border-b">
                <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {filters.map(filter => (
                        <FilterButton
                            key={filter}
                            label={filter}
                            isActive={activeFilter === filter}
                            onClick={() => setActiveFilter(filter)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
                {filteredChats.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {filteredChats.map(chat => <ChatListItem key={chat.id} chat={chat} onClick={() => onSelectChat(chat.id)} />)}
                    </div>
                ) : (
                    <div className="text-center p-10 text-gray-500 flex flex-col items-center justify-center h-full">
                        <Icon name="chat" className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="font-semibold">No chats found</p>
                        <p className="text-sm mt-1">Try selecting a different filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;