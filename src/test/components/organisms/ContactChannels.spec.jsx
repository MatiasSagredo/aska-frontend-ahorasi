import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactChannels from '../../../components/organisms/ContactChannels.jsx';

describe("Componente Canales de Contacto", () => {
    it("debería renderizar título 'Atención al cliente'", () => {
        render(<ContactChannels />);
        expect(screen.getByText('Atención al cliente')).toBeTruthy();
    });

    it("debería mostrar número telefónico", () => {
        render(<ContactChannels />);
        expect(screen.getByText(/\+56 2 1234 5678/i)).toBeTruthy();
    });

    it("debería renderizar 'Escríbenos'", () => {
        render(<ContactChannels />);
        expect(screen.getByText('Escríbenos')).toBeTruthy();
    });

    it("debería mostrar email", () => {
        render(<ContactChannels />);
        expect(screen.getByText('hola@aska.cl')).toBeTruthy();
    });

    it("debería renderizar 'Visítanos'", () => {
        render(<ContactChannels />);
        expect(screen.getByText('Visítanos')).toBeTruthy();
    });

    it("debería mostrar dirección física", () => {
        render(<ContactChannels />);
        expect(screen.getByText(/Av\. Providencia/i)).toBeTruthy();
    });

    it("debería renderizar 'Instagram'", () => {
        render(<ContactChannels />);
        expect(screen.getByText('Instagram')).toBeTruthy();
    });

    it("debería mostrar usuario Instagram", () => {
        render(<ContactChannels />);
        expect(screen.getByText('@aska.performance')).toBeTruthy();
    });

    it("debería tener enlace telefónico", () => {
        render(<ContactChannels />);
        const enlace = screen.getByText(/\+56 2 1234 5678/i);
        expect(enlace.closest('a')).toBeTruthy();
    });

    it("debería renderizar como div con grid", () => {
        const { container } = render(<ContactChannels />);
        const div = container.querySelector('.grid');
        expect(div).toBeTruthy();
    });

});
