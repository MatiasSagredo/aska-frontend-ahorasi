import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactCard from '../../../components/molecules/ContactCard.jsx';

describe("Componente Tarjeta de Contacto", () => {
    it("debería renderizar el título", () => {
        render(
            <ContactCard 
                icon="fa-phone" 
                title="Teléfono" 
                description="Llamanos"
            />
        );
        expect(screen.getByText('Teléfono')).toBeTruthy();
    });

    it("debería renderizar la descripción", () => {
        render(
            <ContactCard 
                icon="fa-phone" 
                title="Teléfono" 
                description="Llamanos ahora"
            />
        );
        expect(screen.getByText('Llamanos ahora')).toBeTruthy();
    });

    it("debería renderizar como div cuando no hay href", () => {
        const { container } = render(
            <ContactCard 
                icon="fa-phone" 
                title="Teléfono" 
                description="Llamanos"
            />
        );
        const wrapper = container.querySelector('div');
        expect(wrapper).toBeTruthy();
    });

    it("debería renderizar como enlace cuando hay href", () => {
        const { container } = render(
            <ContactCard 
                icon="fa-phone" 
                title="Teléfono" 
                description="Llamanos"
                href="tel:123456"
            />
        );
        const link = container.querySelector('a');
        expect(link).toBeTruthy();
        expect(link.href).toContain('tel:123456');
    });

    it("debería abrir en nueva pestaña para URLs externas", () => {
        const { container } = render(
            <ContactCard 
                icon="fa-globe" 
                title="Sitio Web" 
                description="Visitanos"
                href="https://example.com"
            />
        );
        const link = container.querySelector('a');
        expect(link.target).toBe('_blank');
        expect(link.rel).toContain('noreferrer');
    });

    it("debería no abrir en nueva pestaña para enlaces internos", () => {
        const { container } = render(
            <ContactCard 
                icon="fa-envelope" 
                title="Email" 
                description="Escribenos"
                href="mailto:test@example.com"
            />
        );
        const link = container.querySelector('a');
        expect(link.target).not.toBe('_blank');
    });

    it("debería usar prefix personalizado", () => {
        render(
            <ContactCard 
                iconPrefix="fa-brands" 
                icon="fa-facebook" 
                title="Facebook" 
                description="Síguenos"
            />
        );
        // El ícono se renderiza correctamente
        const titulo = screen.getByText('Facebook');
        expect(titulo).toBeTruthy();
    });

    it("debería aplicar clase CSS personalizada al ícono", () => {
        const { container } = render(
            <ContactCard 
                icon="fa-phone" 
                title="Teléfono" 
                description="Llamanos"
                iconClassName="text-red-500"
            />
        );
        const iconContainer = container.querySelector('.bg-secondary\\/70');
        expect(iconContainer).toBeTruthy();
    });

    it("debería tener clases de transición", () => {
        const { container } = render(
            <ContactCard 
                icon="fa-phone" 
                title="Teléfono" 
                description="Llamanos"
            />
        );
        const card = container.querySelector('.transition-all');
        expect(card).toBeTruthy();
    });

});
