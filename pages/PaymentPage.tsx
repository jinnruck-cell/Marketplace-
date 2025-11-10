import React, { useState } from 'react';
import { Item, PaymentMethod } from '../types';
import Icon from '../components/Icon';

interface PaymentPageProps {
    item: Item;
    price: string;
    paymentMethods: PaymentMethod[];
    onBack: () => void;
    onConfirmPayment: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ item, price, paymentMethods, onBack, onConfirmPayment }) => {
    const defaultMethod = paymentMethods.find(pm => pm.isDefault);
    const [selectedPaymentId, setSelectedPaymentId] = useState<number | string>(defaultMethod ? defaultMethod.id : 'new');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
    
    const [selectedOtherMethod, setSelectedOtherMethod] = useState<string | null>(null);

    const handlePayment = () => {
        alert('Payment confirmed! Your funds are being held securely in escrow.');
        onConfirmPayment();
    };
    
    const isNewCard = selectedPaymentId === 'new' && selectedOtherMethod === null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Confirm Payment</h1>
            </header>
            
            <main className="flex-1 pt-20 pb-40">
                <div className="p-4 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h2 className="font-bold text-lg mb-3">Order Summary</h2>
                        <div className="flex items-center">
                            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
                            <div className="ml-4 flex-1">
                                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-sm text-gray-500">Sold by {item.seller.name}</p>
                            </div>
                            <p className="font-bold text-lg">{price}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <h2 className="font-bold text-lg mb-3">Payment Method</h2>
                        <div className="space-y-3">
                             {paymentMethods.map(method => (
                                <label key={method.id} className="flex items-center p-3 rounded-lg border has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 transition-all">
                                    <input type="radio" name="payment-method" checked={selectedPaymentId === method.id} onChange={() => { setSelectedPaymentId(method.id); setSelectedOtherMethod(null); }} className="h-4 w-4 text-indigo-600"/>
                                    <span className="ml-3 font-semibold text-sm">Visa ending in {method.last4}</span>
                                    {method.isDefault && <span className="ml-auto text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Default</span>}
                                </label>
                            ))}
                            <label className="flex items-center p-3 rounded-lg border has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 transition-all">
                                <input type="radio" name="payment-method" checked={isNewCard} onChange={() => { setSelectedPaymentId('new'); setSelectedOtherMethod(null); }} className="h-4 w-4 text-indigo-600"/>
                                <span className="ml-3 font-semibold text-sm">Add a new Credit/Debit Card</span>
                            </label>
                            
                            {isNewCard && (
                                <div className="mt-4 pt-4 border-t space-y-3">
                                    <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} />
                                    <div className="flex space-x-2">
                                        <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} />
                                        <input type="text" placeholder="CVC" className="w-1/2 p-2 border rounded" value={cardDetails.cvc} onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})} />
                                    </div>
                                    <input type="text" placeholder="Cardholder Name" className="w-full p-2 border rounded" value={cardDetails.name} onChange={e => setCardDetails({...cardDetails, name: e.target.value})} />
                                </div>
                            )}

                             {['PayPal', 'Google Pay'].map(method => (
                                <label key={method} className="flex items-center p-3 rounded-lg border has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 transition-all">
                                    <input 
                                        type="radio"
                                        name="payment-method"
                                        checked={selectedOtherMethod === method}
                                        onChange={() => { setSelectedOtherMethod(method); setSelectedPaymentId('other'); }}
                                        className="h-4 w-4 text-indigo-600"
                                    />
                                    <span className="ml-3 font-semibold text-sm">{method}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-white border-t">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-gray-900">{price}</span>
                </div>
                <button 
                    onClick={handlePayment} 
                    className="w-full px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-400">
                    Pay Now
                </button>
            </footer>
        </div>
    );
};

export default PaymentPage;