
import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import Icon from '../components/Icon';
import PaymentMethodModal from '../components/PaymentMethodModal';

interface PaymentMethodsPageProps {
    paymentMethods: PaymentMethod[];
    onBack: () => void;
    onSave: (method: PaymentMethod) => void;
    onDelete: (methodId: number) => void;
}

const PaymentMethodCard: React.FC<{ method: PaymentMethod; onEdit: () => void; onDelete: () => void; }> = ({ method, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
            <div className="flex items-center">
                <Icon name="payment" className="w-8 h-8 text-gray-500" />
                <div className="ml-4">
                    <p className="font-bold">Visa ending in {method.last4}</p>
                    <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                </div>
                {method.isDefault && <span className="ml-4 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">Default</span>}
            </div>
            <div className="flex space-x-2">
                <button onClick={onEdit} className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                    <Icon name="edit" className="w-5 h-5" />
                </button>
                <button onClick={onDelete} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100">
                    <Icon name="trash" className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}


const PaymentMethodsPage: React.FC<PaymentMethodsPageProps> = ({ paymentMethods, onBack, onSave, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    const handleOpenModal = (method: PaymentMethod | null = null) => {
        setSelectedMethod(method);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMethod(null);
    };

    const handleSaveMethod = (method: PaymentMethod) => {
        onSave(method);
        handleCloseModal();
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <PaymentMethodModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveMethod}
                paymentMethod={selectedMethod}
            />

            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Payment Methods</h1>
            </header>
            <main className="pt-20 p-4 space-y-4">
                {paymentMethods.map(method => (
                    <PaymentMethodCard
                        key={method.id}
                        method={method}
                        onEdit={() => handleOpenModal(method)}
                        onDelete={() => onDelete(method.id)}
                    />
                ))}

                <button
                    onClick={() => handleOpenModal()}
                    className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                    <Icon name="sell" className="w-5 h-5 mr-2" />
                    <span>Add New Payment Method</span>
                </button>
            </main>
        </div>
    );
};

export default PaymentMethodsPage;
