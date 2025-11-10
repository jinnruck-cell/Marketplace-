// Fix: Implement the AddressesPage component.
import React, { useState } from 'react';
import { Address } from '../types';
import Icon from '../components/Icon';
import AddressModal from '../components/AddressModal';

interface AddressesPageProps {
    addresses: Address[];
    onBack: () => void;
    onSave: (address: Address) => void;
    onDelete: (addressId: number) => void;
}

const AddressCard: React.FC<{ address: Address; onEdit: () => void; onDelete: () => void; }> = ({ address, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start justify-between">
            <div>
                <div className="flex items-center mb-1">
                    <p className="font-bold">{address.fullName}</p>
                    {address.isDefault && <span className="ml-3 text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">Default</span>}
                </div>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                <p className="text-sm text-gray-600">{address.country}</p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
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

const AddressesPage: React.FC<AddressesPageProps> = ({ addresses, onBack, onSave, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

    const handleOpenModal = (address: Address | null = null) => {
        setSelectedAddress(address);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAddress(null);
    };

    const handleSaveAddress = (address: Address) => {
        onSave(address);
        handleCloseModal();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AddressModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveAddress}
                address={selectedAddress}
            />

            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Manage Addresses</h1>
            </header>
            <main className="pt-20 p-4 space-y-4">
                {addresses.map(address => (
                    <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={() => handleOpenModal(address)}
                        onDelete={() => onDelete(address.id)}
                    />
                ))}

                <button
                    onClick={() => handleOpenModal()}
                    className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                    <Icon name="address" className="w-5 h-5 mr-2" />
                    <span>Add New Address</span>
                </button>
            </main>
        </div>
    );
};

export default AddressesPage;
