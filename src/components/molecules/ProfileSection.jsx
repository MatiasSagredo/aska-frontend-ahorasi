import React from 'react';
import Div from '../atoms/Div';
import Text from '../atoms/Text';

function ProfileSection({ title, children }) {
    return (
        <Div className="rounded-2xl border border-primary/20 bg-secondary/40 p-6 backdrop-blur-sm">
            <Text className="mb-6 text-lg font-semibold text-primary-foreground">
                {title}
            </Text>
            {children}
        </Div>
    );
}

export default ProfileSection;
