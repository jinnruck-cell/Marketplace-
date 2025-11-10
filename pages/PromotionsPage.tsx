import React from 'react';

interface PromotionsPageProps {
    onBack: () => void;
    onSelectPlan: () => void;
}

const PromotionCard: React.FC<{ title: string; price: string; features: string[]; popular?: boolean; onSelect: () => void; }> = ({ title, price, features, popular, onSelect }) => (
    <div className={`border rounded-lg p-6 bg-white relative shadow-sm ${popular ? 'border-indigo-500' : 'border-gray-200'}`}>
        {popular && (
            <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm font-semibold text-white bg-indigo-500 rounded-full right-6">
                Most Popular
            </div>
        )}
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-4xl font-extrabold text-gray-900">{price}<span className="text-base font-medium text-gray-500">/mo</span></p>
        <p className="mt-4 text-sm text-gray-500">Boost your listings and sell faster with these amazing features.</p>
        <ul className="mt-6 space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
                </li>
            ))}
        </ul>
        <button onClick={onSelect} className={`w-full py-3 mt-8 text-sm font-bold rounded-lg ${popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>
            Choose {title}
        </button>
    </div>
);

const PromotionsPage: React.FC<PromotionsPageProps> = ({ onBack, onSelectPlan }) => {
    const packages = [
        {
            title: 'Basic',
            price: '$9',
            features: ['7 days of promotion', 'Basic ad placement', 'Email support'],
        },
        {
            title: 'Pro',
            price: '$29',
            features: ['30 days of promotion', 'Top of search results', 'Featured on homepage', 'Priority support'],
            popular: true,
        },
        {
            title: 'Enterprise',
            price: '$79',
            features: ['90 days of promotion', 'Dedicated ad slot', 'Social media shoutout', '24/7 phone support'],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="fixed top-0 left-0 right-0 z-10 flex items-center p-4 bg-white bg-opacity-80 backdrop-blur-sm border-b">
                <button onClick={onBack} className="p-2 mr-2 -ml-2 text-gray-600 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold truncate">Promote Your Ads</h1>
            </header>
            <main className="pt-20 p-4">
                 <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Choose Your Plan</h2>
                    <p className="mt-2 text-md text-gray-600">Get more views and sell your items faster than ever.</p>
                </div>
                <div className="space-y-8">
                    {packages.map(pkg => <PromotionCard key={pkg.title} {...pkg} onSelect={onSelectPlan} />)}
                </div>
            </main>
        </div>
    );
};

export default PromotionsPage;