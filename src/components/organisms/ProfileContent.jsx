import React from 'react';
import Div from '../atoms/Div';
import Text from '../atoms/Text';
import ProfileSection from '../molecules/ProfileSection';
import ProfileInfoCard from '../molecules/ProfileInfoCard';
import Badge from '../atoms/Badge';

function ProfileContent({ user }) {
    return (
        <Div className="space-y-8">
            {/* Información Personal */}
            <ProfileSection title="Información Personal">
                <Div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user?.nombreUsuario && (
                        <ProfileInfoCard
                            label="Nombre de Usuario"
                            value={user.nombreUsuario}
                            iconName="fa-user"
                        />
                    )}
                    {user?.emailUsuario && (
                        <ProfileInfoCard
                            label="Email"
                            value={user.emailUsuario}
                            iconName="fa-envelope"
                        />
                    )}
                    {user?.nombre && (
                        <ProfileInfoCard
                            label="Nombre Completo"
                            value={user.nombre}
                            iconName="fa-user-tie"
                        />
                    )}
                    {user?.apellido && (
                        <ProfileInfoCard
                            label="Apellido"
                            value={user.apellido}
                            iconName="fa-user-tie"
                        />
                    )}
                </Div>
            </ProfileSection>

            {/* Información de Contacto */}
            {(user?.telefonoUsuario || user?.ciudad || user?.direccion || user?.codigoPostal) && (
                <ProfileSection title="Información de Contacto">
                    <Div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user?.telefonoUsuario && (
                            <ProfileInfoCard
                                label="Teléfono"
                                value={user.telefonoUsuario}
                                iconName="fa-phone"
                            />
                        )}
                        {user?.ciudad && (
                            <ProfileInfoCard
                                label="Ciudad"
                                value={user.ciudad}
                                iconName="fa-location-dot"
                            />
                        )}
                        {user?.direccion && (
                            <ProfileInfoCard
                                label="Dirección"
                                value={user.direccion}
                                iconName="fa-house"
                            />
                        )}
                        {user?.codigoPostal && (
                            <ProfileInfoCard
                                label="Código Postal"
                                value={user.codigoPostal}
                                iconName="fa-mailbox"
                            />
                        )}
                    </Div>
                </ProfileSection>
            )}

            {/* Información de Cuenta */}
            <ProfileSection title="Información de Cuenta">
                <Div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user?.id && (
                        <ProfileInfoCard
                            label="ID de Usuario"
                            value={user.id}
                            iconName="fa-fingerprint"
                        />
                    )}
                    {user?.idRol?.nombreRol && (
                        <ProfileInfoCard
                            label="Rol"
                            value={user.idRol.nombreRol}
                            iconName="fa-shield"
                        />
                    )}
                    {user?.fechaRegistro && (
                        <ProfileInfoCard
                            label="Fecha de Registro"
                            value={new Date(user.fechaRegistro).toLocaleDateString('es-ES')}
                            iconName="fa-calendar"
                        />
                    )}
                </Div>
            </ProfileSection>
        </Div>
    );
}

export default ProfileContent;
