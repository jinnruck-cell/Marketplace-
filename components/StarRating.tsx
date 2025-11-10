import React from 'react';
import Icon from './Icon';

interface StarRatingProps {
    rating: number;
    size?: 'small' | 'default';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'default' }) => {
    const roundedRating = Math.round(rating);
    const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
                <Icon
                    key={`star-${i}`}
                    name="star"
                    className={`${starSize} ${i < roundedRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
            ))}
        </div>
    );
};

export default StarRating;
