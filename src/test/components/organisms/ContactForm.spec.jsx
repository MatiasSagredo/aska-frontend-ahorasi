import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../../components/organisms/ContactForm.jsx';

describe("Componente Formulario de Contacto", () => {
    it("debería renderizar el título", () => {
        render(<ContactForm />);
        expect(screen.getByText('Envíanos un mensaje')).toBeTruthy();
    });

    it("debería tener campo de nombre completo", () => {
        render(<ContactForm />);
        const input = screen.getByPlaceholderText('Ej. Daniela Torres');
        expect(input).toBeTruthy();
        expect(input.type).toBe('text');
    });

    it("debería tener campo de email", () => {
        render(<ContactForm />);
        const input = screen.getByPlaceholderText('tu@email.com');
        expect(input).toBeTruthy();
        expect(input.type).toBe('email');
    });

    it("debería tener textarea de mensaje", () => {
        render(<ContactForm />);
        const textarea = screen.getByPlaceholderText('Cuéntanos en qué podemos ayudarte');
        expect(textarea).toBeTruthy();
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it("debería actualizar nombre cuando se escribe", () => {
        render(<ContactForm />);
        const input = screen.getByPlaceholderText('Ej. Daniela Torres');
        fireEvent.change(input, { target: { value: 'Juan Pérez' } });
        expect(input.value).toBe('Juan Pérez');
    });

    it("debería actualizar email cuando se escribe", () => {
        render(<ContactForm />);
        const input = screen.getByPlaceholderText('tu@email.com');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(input.value).toBe('test@example.com');
    });

    it("debería actualizar mensaje cuando se escribe", () => {
        render(<ContactForm />);
        const textarea = screen.getByPlaceholderText('Cuéntanos en qué podemos ayudarte');
        fireEvent.change(textarea, { target: { value: 'Tengo una consulta' } });
        expect(textarea.value).toBe('Tengo una consulta');
    });

    it("debería tener botón Enviar consulta", () => {
        render(<ContactForm />);
        const boton = screen.getByText('Enviar consulta');
        expect(boton).toBeTruthy();
    });

    it("debería mostrar label para nombre", () => {
        render(<ContactForm />);
        expect(screen.getByText('Nombre completo')).toBeTruthy();
    });

    it("debería mostrar label para email", () => {
        render(<ContactForm />);
        expect(screen.getByText('Correo electrónico')).toBeTruthy();
    });

    it("debería mostrar label para mensaje", () => {
        render(<ContactForm />);
        expect(screen.getByText('Mensaje')).toBeTruthy();
    });

});
