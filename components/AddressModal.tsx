// Fix: Implement the AddressModal component.
import React, { useState, useEffect } from 'react';
import { Address } from '../types';

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (address: Address) => void;
    address: Address | null;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSave, address }) => {
    const [formData, setFormData] = useState<Omit<Address, 'id'>>({
        type: 'Home',
        fullName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA',
        isDefault: false,
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        } else {
            setFormData({
                type: 'Home',
                fullName: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                country: 'USA',
                isDefault: false,
            });
        }
    }, [address, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = () => {
        const newAddress: Address = {
            id: address?.id || Date.now(),
            ...formData,
        };
        onSave(newAddress);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{address ? 'Edit' : 'Add'} Address</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                        <input type="text" name="street" value={formData.street} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500" />
                    </div>
                     <div className="flex items-center">
                        <input id="isDefault" name="isDefault" type="checkbox" checked={formData.isDefault} onChange={handleCheckboxChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">Set as default address</label>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                        Save Address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
