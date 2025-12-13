import React from 'react';
import Div from './Div';
import Text from './Text';

function Badge({ children, variant = 'default', className = '' }) {
    const variantClasses = {
        default: 'bg-primary/10 text-primary border border-primary/20',
        success: 'bg-green-500/10 text-green-600 border border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20',
        error: 'bg-red-500/10 text-red-600 border border-red-500/20'
    };

    return (
        <Text variant="span" className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
            {children}
        </Text>
    );
}

export default Badge;
