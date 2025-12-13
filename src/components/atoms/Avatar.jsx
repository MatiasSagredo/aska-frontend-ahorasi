import React from 'react';
import Image from './Image';

function Avatar({ src, alt, size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-10 h-10',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32'
    };

    return (
        <Image
            src={src}
            alt={alt}
            className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
        />
    );
}

export default Avatar;
