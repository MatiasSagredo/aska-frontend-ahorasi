import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button.jsx';

describe("Button Component", () => {
    it("deberia renderizar un boton con el texto proporcionado", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByText('Click me');
        expect(button).toBeTruthy();
        expect(button.tagName).toBe('BUTTON');
    });

    it("deberia aplicar la clase CSS personalizada", () => {
        render(<Button className="custom-class">Test</Button>);
        const button = screen.getByText('Test');
        expect(button.className).toContain('custom-class');
    });

    it("deberia tener disabled deshabilitado por defecto", () => {
        render(<Button>Test</Button>);
        const button = screen.getByText('Test');
        expect(button.disabled).toBeFalsy();
    });

    it("deberia estar deshabilitado cuando se pasa disabled=true", () => {
        render(<Button disabled={true}>Test</Button>);
        const button = screen.getByText('Test');
        expect(button.disabled).toBeTruthy();
    });

    it("deberia aplicar estilos cuando esta deshabilitado", () => {
        render(<Button disabled={true}>Test</Button>);
        const button = screen.getByText('Test');
        expect(button.className).toContain('opacity-60');
        expect(button.className).toContain('cursor-not-allowed');
    });

    it("deberia ejecutar onClick cuando se hace click", () => {
        const mockClick = jasmine.createSpy('click');
        render(<Button onClick={mockClick}>Click me</Button>);
        const button = screen.getByText('Click me');
        fireEvent.click(button);
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("deberia aceptar props adicionales", () => {
        render(<Button data-testid="custom-button">Test</Button>);
        const button = screen.getByTestId('custom-button');
        expect(button).toBeTruthy();
    });

});
