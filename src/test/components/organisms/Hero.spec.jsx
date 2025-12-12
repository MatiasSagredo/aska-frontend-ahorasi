import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../../components/organisms/Hero.jsx';

describe("Componente Hero", () => {
    it("debería renderizar el título principal", () => {
        render(<Hero />);
        expect(screen.getByText(/Potencia tu rendimiento/i)).toBeTruthy();
    });

    it("debería mostrar 'Nueva Temporada'", () => {
        render(<Hero />);
        expect(screen.getByText('Nueva Temporada')).toBeTruthy();
    });

    it("debería renderizar la descripción", () => {
        render(<Hero />);
        expect(screen.getByText(/Descubre la colección/i)).toBeTruthy();
    });

    it("debería tener enlace Ver catálogo", () => {
        render(<Hero />);
        const enlace = screen.getByText('Ver catálogo');
        expect(enlace).toBeTruthy();
    });

    it("debería renderizar los 3 highlights", () => {
        render(<Hero />);
        expect(screen.getByText('Envíos en 48h')).toBeTruthy();
        expect(screen.getByText('Calidad Premium')).toBeTruthy();
        expect(screen.getByText('Soporte Personalizado')).toBeTruthy();
    });

    it("debería mostrar descripción de envíos", () => {
        render(<Hero />);
        expect(screen.getByText(/Despachos express a todo Chile/i)).toBeTruthy();
    });

    it("debería mostrar descripción de calidad", () => {
        render(<Hero />);
        expect(screen.getByText(/Equipamiento testeado/i)).toBeTruthy();
    });

    it("debería mostrar descripción de soporte", () => {
        render(<Hero />);
        expect(screen.getByText(/Coaches disponibles/i)).toBeTruthy();
    });

    it("debería renderizar la imagen", () => {
        render(<Hero />);
        const imagen = screen.getByAltText(/Atleta equipándose/i);
        expect(imagen).toBeTruthy();
    });

});
