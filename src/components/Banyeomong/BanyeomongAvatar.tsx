import React from 'react';
import './BanyeomongAvatar.css';

interface BanyeomongAvatarProps {
    species?: 'puppy' | 'cat' | 'penguin' | 'panda';
    size?: 'small' | 'medium' | 'large';
    animate?: boolean;
}

const BanyeomongAvatar: React.FC<BanyeomongAvatarProps> = ({
    species = 'puppy',
    size = 'medium',
    animate = true,
}) => {
    const getEmoji = () => {
        switch (species) {
            case 'puppy':
                return '🐶';
            case 'cat':
                return '🐱';
            case 'penguin':
                return '🐧';
            case 'panda':
                return '🐼';
            default:
                return '🥚';
        }
    };

    return (
        <div className={`banyeomong-avatar banyeomong-${size} ${animate ? 'banyeomong-animate' : ''}`}>
            <div className="banyeomong-character">
                <span className="banyeomong-emoji">{getEmoji()}</span>
            </div>
            <div className="banyeomong-shadow"></div>
        </div>
    );
};

export default BanyeomongAvatar;
