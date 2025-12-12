import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../../../components/molecules/Alert.jsx';

describe("Componente Alerta", () => {
    it("debería renderizar la alerta cuando visible es true", () => {
        render(<Alert visible={true} message="Mensaje de prueba" />);
        const alerta = screen.getByText('Mensaje de prueba');
        expect(alerta).toBeTruthy();
    });

    it("debería no renderizar cuando visible es false", () => {
        const { container } = render(<Alert visible={false} message="Mensaje de prueba" />);
        expect(container.firstChild).toBeNull();
    });

    it("debería mostrar título y mensaje", () => {
        render(<Alert title="Título de Alerta" message="Mensaje de alerta" visible={true} />);
        expect(screen.getByText('Título de Alerta')).toBeTruthy();
        expect(screen.getByText('Mensaje de alerta')).toBeTruthy();
    });

    it("debería usar children en lugar de message si ambos se proporcionan", () => {
        render(
            <Alert message="Mensaje" visible={true}>
                Contenido de children
            </Alert>
        );
        expect(screen.getByText('Contenido de children')).toBeTruthy();
    });

    it("debería aplicar estilos de success", () => {
        const { container } = render(<Alert type="success" message="Éxito" visible={true} />);
        const alerta = container.querySelector('.border');
        expect(alerta.className).toContain('bg-green-100');
    });

    it("debería aplicar estilos de warning", () => {
        const { container } = render(<Alert type="warning" message="Advertencia" visible={true} />);
        const alerta = container.querySelector('.border');
        expect(alerta.className).toContain('bg-yellow-100');
    });

    it("debería aplicar estilos de error", () => {
        const { container } = render(<Alert type="error" message="Error" visible={true} />);
        const alerta = container.querySelector('.border');
        expect(alerta.className).toContain('bg-red-100');
    });

    it("debería mostrar botón de cerrar cuando dismissible es true", () => {
        render(<Alert visible={true} message="Prueba" dismissible={true} />);
        const botonCerrar = screen.getByLabelText('Cerrar alerta');
        expect(botonCerrar).toBeTruthy();
    });

    it("debería no mostrar botón de cerrar cuando dismissible es false", () => {
        render(<Alert visible={true} message="Prueba" dismissible={false} />);
        const botonCerrar = screen.queryByLabelText('Cerrar alerta');
        expect(botonCerrar).toBeFalsy();
    });

    it("debería ejecutar onClose cuando se hace clic en cerrar", () => {
        const mockCerrar = jasmine.createSpy('cerrar');
        render(
            <Alert 
                visible={true} 
                message="Prueba" 
                dismissible={true}
                onClose={mockCerrar}
            />
        );
        const botonCerrar = screen.getByLabelText('Cerrar alerta');
        fireEvent.click(botonCerrar);
        expect(mockCerrar).toHaveBeenCalledTimes(1);
    });

    it("debería aplicar className personalizado", () => {
        const { container } = render(
            <Alert 
                visible={true} 
                message="Prueba" 
                className="custom-class"
            />
        );
        const alerta = container.querySelector('.border');
        expect(alerta.className).toContain('custom-class');
    });

});
