import React, { useState } from 'react';
import Icon from '../components/Icon';
// Fix: Import Ad type for props definition
import { Ad } from '../types';

// Fix: Add props interface for SellPage and correct the onPostAd type
interface SellPageProps {
    onPostAd: (newAd: Omit<Ad, 'id' | 'views' | 'likes' | 'status' | 'imageUrl'> & { images: string[] }) => void;
}

const SellPage: React.FC<SellPageProps> = ({ onPostAd }) => {
    // Fix: Add state for form fields
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Mobiles');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState<string[]>([]);
    
    const [condition, setCondition] = useState('New');
    const [material, setMaterial] = useState('');
    const [sizes, setSizes] = useState('');
    const [colors, setColors] = useState('');

    const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const totalImages = images.length + files.length;
            
            if (totalImages > 10) {
                alert('You can only upload a maximum of 10 photos.');
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setImages(prevImages => [...prevImages, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    const handleRemoveImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    // Fix: Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !price || !description || !category || !location || !condition) {
            alert('Please fill out all the required fields.');
            return;
        }
        if (images.length === 0) {
            alert('Please upload at least one photo.');
            return;
        }

        const sizesArray = sizes.split(',').map(s => s.trim()).filter(Boolean);
        const colorsArray = colors.split(',').map(c => c.trim()).filter(Boolean);
        
        onPostAd({
            title,
            price: `$${price}`,
            description,
            category,
            location,
            images,
            condition,
            sizes: sizesArray.length > 0 ? sizesArray : undefined,
            colors: colorsArray.length > 0 ? colorsArray : undefined,
            material: material || undefined,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white p-4 border-b sticky top-0 z-10">
                <h1 className="text-xl font-bold text-center">Sell Your Item</h1>
            </header>

            <form className="p-4 space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Photos</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-lg"/>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                                    aria-label="Remove image"
                                >
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        {images.length < 10 && (
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-200">
                               <Icon name="camera" className="w-8 h-8 text-gray-400"/>
                               <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                            </label>
                        )}
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Add up to 10 photos. Use original photos for a better response.</p>
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., iPhone 12 Pro Max" />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Mobiles</option>
                        <option>Electronics & Appliances</option>
                        <option>Furniture</option>
                        <option>Cars</option>
                        <option>Bikes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Describe your item..."></textarea>
                </div>

                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                    <select id="condition" value={condition} onChange={e => setCondition(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {conditions.map(cond => <option key={cond}>{cond}</option>)}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material <span className="text-gray-400">(Optional)</span></label>
                    <input type="text" id="material" value={material} onChange={e => setMaterial(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Cotton, Oak Wood" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes <span className="text-gray-400">(Optional)</span></label>
                        <input type="text" id="sizes" value={sizes} onChange={e => setSizes(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., S, M, L" />
                    </div>
                    <div>
                        <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors <span className="text-gray-400">(Optional)</span></label>
                        <input type="text" id="colors" value={colors} onChange={e => setColors(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Red, Blue" />
                    </div>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., New York, NY" />
                </div>
                
                <div className="pt-4">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Post Ad Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellPage;