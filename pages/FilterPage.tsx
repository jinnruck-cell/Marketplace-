import React, { useState } from 'react';
// Fix: Corrected import path for types
import { FilterState } from '../types';
// Fix: Corrected import path for data and resolved module error
import { categoriesWithSubcategories } from '../data';
import Icon from '../components/Icon';

interface FilterPageProps {
  onBack: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

const Accordion: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left">
                <span className="font-semibold text-gray-800">{title}</span>
                <Icon name="chevronRight" className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-90' : ''}`} />
            </button>
            {isOpen && <div className="pb-4">{children}</div>}
        </div>
    );
};

const FilterPage: React.FC<FilterPageProps> = ({ onBack, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const handleSubcategoryChange = (subcategory: string) => {
    const newSubcategories = filters.subcategories.includes(subcategory)
      ? filters.subcategories.filter(s => s !== subcategory)
      : [...filters.subcategories, subcategory];
    setFilters({ ...filters, subcategories: newSubcategories });
  };
  
  const handleConditionChange = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
        ? filters.conditions.filter(c => c !== condition)
        : [...filters.conditions, condition];
    setFilters({ ...filters, conditions: newConditions });
  };

  const conditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white border-b">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
          <Icon name="chevronRight" className="w-6 h-6 transform -rotate-180" />
        </button>
        <h1 className="text-lg font-bold">Filters</h1>
        <button onClick={() => onApplyFilters(filters)} className="text-sm font-semibold text-indigo-600">Done</button>
      </header>

      <main className="pt-20 p-4 space-y-6">
        <div className="border rounded-lg">
            {Object.entries(categoriesWithSubcategories).map(([category, subcategories]) => (
                <Accordion key={category} title={category}>
                    <div className="space-y-2 pl-4">
                        {subcategories.map(sub => (
                             <label key={sub} className="flex items-center">
                                <input type="checkbox" checked={filters.subcategories.includes(sub)} onChange={() => handleSubcategoryChange(sub)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                <span className="ml-3 text-sm text-gray-600">{sub}</span>
                            </label>
                        ))}
                    </div>
                </Accordion>
            ))}
        </div>

        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
                <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => setFilters({...filters, minPrice: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                <span>-</span>
                <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
        </div>

        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon name="location" className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder="e.g., Los Angeles, CA" 
                    value={filters.location} 
                    onChange={e => setFilters({...filters, location: e.target.value})} 
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm" />
            </div>
        </div>

        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Condition</h3>
            <div className="space-y-2">
                {conditions.map(condition => (
                     <label key={condition} className="flex items-center">
                        <input type="checkbox" checked={filters.conditions.includes(condition)} onChange={() => handleConditionChange(condition)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <span className="ml-3 text-sm text-gray-600">{condition}</span>
                    </label>
                ))}
            </div>
        </div>
      </main>

       <footer className="fixed bottom-0 left-0 right-0 z-10 p-3 bg-white border-t flex items-center space-x-3">
          <button onClick={() => setFilters({ categories: [], subcategories: [], minPrice: '', maxPrice: '', conditions: [], location: ''})} className="w-full px-6 py-3 text-sm font-bold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300">
              Reset
          </button>
          <button onClick={() => onApplyFilters(filters)} className="w-full px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Apply Filters
          </button>
      </footer>
    </div>
  );
};

export default FilterPage;