import React, { useState, useRef, useEffect } from 'react';
import { ChatItem, Conversation, Item, Message } from '../types';
import Icon from '../components/Icon';
import MakeOfferModal from '../components/MakeOfferModal';

interface ConversationPageProps {
  chat: ChatItem;
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (conversationId: number, text: string, type: 'text' | 'offer', offerDetails?: { price: string; status: 'pending' | 'accepted' | 'declined' }) => void;
  onOfferAction: (conversationId: number, messageId: number, action: 'accepted' | 'declined') => void;
  onProceedToPayment: (price: string, item: Item) => void;
}

const OfferMessage: React.FC<{ 
    message: Message;
    conversationId: number;
    onOfferAction: (conversationId: number, messageId: number, action: 'accepted' | 'declined') => void;
    onProceedToPayment: (price: string, item: Item) => void;
    item: Item | null;
}> = ({ message, conversationId, onOfferAction, onProceedToPayment, item }) => {
    const isMe = message.sender === 'me';
    const offer = message.offerDetails;
    if (!offer) return null;

    const offerBubbleBg = 
        offer.status === 'accepted' ? 'bg-green-100 border-green-200' :
        offer.status === 'declined' ? 'bg-red-100 border-red-200' :
        'bg-blue-100 border-blue-200';
    
    const statusBadge = 
        offer.status === 'accepted' ? 'bg-green-200 text-green-800' :
        offer.status === 'declined' ? 'bg-red-200 text-red-800' :
        'bg-blue-200 text-blue-800';

    return (
        <div className={`p-3 rounded-lg border ${offerBubbleBg} w-full max-w-xs md:max-w-sm self-center my-2`}>
             <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-800">{isMe ? "You sent an offer" : `${"Buyer"} sent an offer`}</p>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${statusBadge}`}>
                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </span>
            </div>
            
            <div className="mt-2 p-3 rounded-lg bg-white">
                <p className="font-bold text-2xl text-gray-900">{offer.price}</p>
                
                {offer.status === 'pending' && !isMe && (
                    <div className="flex space-x-2 mt-3 pt-3 border-t">
                        <button onClick={() => onOfferAction(conversationId, message.id, 'declined')} className="flex-1 text-sm font-semibold px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600">Decline</button>
                        <button onClick={() => onOfferAction(conversationId, message.id, 'accepted')} className="flex-1 text-sm font-semibold px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600">Accept</button>
                    </div>
                )}
                
                {offer.status === 'accepted' && isMe && item && (
                    <div className="mt-3 pt-3 border-t">
                        <button 
                            onClick={() => onProceedToPayment(offer.price, item)}
                            className="w-full text-center text-sm font-bold px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


const MessageBubble: React.FC<{ message: Message; }> = ({ message }) => {
    const isMe = message.sender === 'me';
    const bubbleClasses = isMe 
        ? 'bg-indigo-600 text-white self-end rounded-l-lg rounded-br-lg' 
        : 'bg-white text-gray-800 self-start rounded-r-lg rounded-bl-lg border border-gray-200';
    
    return (
        <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${bubbleClasses}`}>
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
        </div>
    );
};

const NegotiationHistorySection: React.FC<{
    messages: Message[];
    chatName: string;
}> = ({ messages, chatName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const offerHistory = messages.filter(msg => msg.type === 'offer' && msg.offerDetails).reverse();

    const getStatusBadgeStyle = (status: 'pending' | 'accepted' | 'declined') => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'declined': return 'bg-red-100 text-red-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="bg-white border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 text-left hover:bg-gray-50">
                <div className="flex items-center">
                    <Icon name="gavel" className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="font-semibold text-sm text-gray-800">Negotiation History</span>
                </div>
                <Icon name="chevronRight" className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-3 pt-0">
                    {offerHistory.length > 0 ? (
                        <ul className="divide-y divide-gray-100 border-t mt-2 pt-2">
                            {offerHistory.map(offerMsg => (
                               <li key={offerMsg.id} className="py-2">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-md text-gray-800">{offerMsg.offerDetails!.price}</p>
                                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${getStatusBadgeStyle(offerMsg.offerDetails!.status)}`}>
                                            {offerMsg.offerDetails!.status.charAt(0).toUpperCase() + offerMsg.offerDetails!.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        <span>Offered by {offerMsg.sender === 'me' ? 'You' : chatName}</span>
                                        <span className="mx-1.5">•</span>
                                        <span>{offerMsg.timestamp}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-sm text-gray-500 py-4 border-t mt-2 pt-2">No offers have been made yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};


const ConversationPage: React.FC<ConversationPageProps> = ({ chat, conversation, onBack, onSendMessage, onOfferAction, onProceedToPayment }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [conversation.messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(conversation.id, newMessage.trim(), 'text');
            setNewMessage('');
        }
    };

    const handleSendOffer = (price: string) => {
        onSendMessage(conversation.id, `Offer: $${price}`, 'offer', { price: `$${price}`, status: 'pending' });
        setIsOfferModalOpen(false);
    };
    
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <MakeOfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} onSubmit={handleSendOffer} itemPrice={conversation.item?.price} />
            <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-3 bg-white border-b">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                        <Icon name="chevronRight" className="w-6 h-6 transform -rotate-180" />
                    </button>
                    <img src={chat.avatarUrl} alt={chat.name} className="w-10 h-10 rounded-full ml-2" />
                    <div className="ml-3">
                        <h1 className="font-bold text-gray-900">{chat.name}</h1>
                        <p className={`text-xs font-semibold flex items-center ${chat.status === 'online' ? 'text-green-500' : 'text-gray-400'}`}>
                            <span className={`w-2 h-2 rounded-full mr-1.5 ${chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            {chat.status === 'online' ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>
                 <div className="flex items-center space-x-1">
                    <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100"><Icon name="settings" className="w-6 h-6"/></button>
                </div>
            </header>
            
            <div className="pt-16">
                {conversation.paymentStatus === 'paid' && (
                     <div className="bg-green-100 border-b border-green-200 p-3 text-center text-sm font-semibold text-green-800">
                         Payment is complete and held securely.
                     </div>
                 )}
                {conversation.item && (
                     <div className="p-3 bg-white border-b">
                         <div className="flex items-center">
                             <img src={conversation.item.imageUrl} alt={conversation.item.title} className="w-12 h-12 rounded-md object-cover" />
                             <div className="ml-3 flex-1">
                                 <p className="font-semibold text-sm truncate">{conversation.item.title}</p>
                                 <p className="font-bold text-indigo-600">{conversation.item.price}</p>
                             </div>
                         </div>
                     </div>
                 )}
                 <NegotiationHistorySection messages={conversation.messages} chatName={chat.name} />
             </div>

            <main className="flex-1 overflow-y-auto p-4 space-y-2">
                {conversation.messages.map((msg) => (
                    <div key={msg.id} className="flex flex-col">
                        {msg.type === 'offer' ? (
                            <OfferMessage 
                                message={msg}
                                conversationId={conversation.id}
                                onOfferAction={onOfferAction}
                                onProceedToPayment={onProceedToPayment}
                                item={conversation.item}
                            />
                        ) : (
                            <MessageBubble message={msg} />
                        )}
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-20 p-2 bg-white border-t">
                 <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                    <button onClick={() => setIsOfferModalOpen(true)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full"><Icon name="tag" className="w-6 h-6" /></button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 w-full px-3 py-2 bg-transparent text-sm focus:outline-none"
                    />
                    <button onClick={handleSend} className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-indigo-300" disabled={!newMessage.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ConversationPage;