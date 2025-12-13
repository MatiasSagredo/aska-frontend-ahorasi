import React from 'react';
import Div from '../atoms/Div';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';

function ProfileInfoCard({ iconName, label, value, className = '' }) {
    return (
        <Div className={`bg-primary/5 border border-primary/10 rounded-lg p-4 ${className}`}>
            <Div className="flex items-start gap-3">
                {iconName && (
                    <Icon name={iconName} className="text-primary mt-1 flex-shrink-0" />
                )}
                <Div className="flex-1">
                    <Text className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">
                        {label}
                    </Text>
                    <Text className="text-base font-medium text-white">
                        {value}
                    </Text>
                </Div>
            </Div>
        </Div>
    );
}

export default ProfileInfoCard;
