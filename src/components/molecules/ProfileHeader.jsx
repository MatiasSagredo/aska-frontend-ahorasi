import React from 'react';
import Div from '../atoms/Div';
import Text from '../atoms/Text';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';

function ProfileHeader({ user, onEditClick }) {
    const displayName = user?.nombreUsuario || user?.nombre || 'Usuario';
    const displayEmail = user?.emailUsuario || user?.email || '';

    return (
        <Div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-primary-foreground/10">
            <Div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <Avatar
                    src={user?.avatar || 'https://via.placeholder.com/128'}
                    alt={displayName}
                    size="lg"
                />
                <Div className="flex flex-col gap-1">
                    <Text variant="h2" className="text-2xl font-bold text-white">
                        {displayName}
                    </Text>
                    {displayEmail && (
                        <Text className="text-sm text-primary-foreground/60">
                            {displayEmail}
                        </Text>
                    )}
                    {user?.fechaRegistro && (
                        <Text className="text-xs text-primary-foreground/50">
                            Miembro desde {new Date(user.fechaRegistro).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                        </Text>
                    )}
                </Div>
            </Div>
            <Button
                onClick={onEditClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2"
            >
                Editar Perfil
            </Button>
        </Div>
    );
}

export default ProfileHeader;
