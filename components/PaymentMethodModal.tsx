
import React, { useState } from 'react';
import { PaymentMethod } from '../types';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (method: PaymentMethod) => void;
    paymentMethod: PaymentMethod | null;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ isOpen, onClose, onSave, paymentMethod }) => {
    const [cardholderName, setCardholderName] = useState(paymentMethod?.cardholderName || '');
    const [cardNumber, setCardNumber] = useState(paymentMethod ? `**** **** **** ${paymentMethod.last4}` : '');
    const [expiryDate, setExpiryDate] = useState(paymentMethod?.expiryDate || '');
    const [cvc, setCvc] = useState('');
    const [isDefault, setIsDefault] = useState(paymentMethod?.isDefault || false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        const last4 = cardNumber.slice(-4);
        const newMethod: PaymentMethod = {
            id: paymentMethod?.id || Date.now(),
            type: 'Credit Card',
            last4,
            cardholderName,
            expiryDate,
            isDefault,
        };
        onSave(newMethod);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{paymentMethod ? 'Edit' : 'Add'} Payment Method</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                        <input type="text" id="cardholderName" value={cardholderName} onChange={e => setCardholderName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" id="cardNumber" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="**** **** **** ****" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input type="text" id="expiryDate" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                            <input type="text" id="cvc" value={cvc} onChange={e => setCvc(e.target.value)} placeholder="***" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                        </div>
                    </div>
                     <div className="flex items-center">
                        <input id="isDefault" type="checkbox" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">Set as default payment method</label>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodModal;
