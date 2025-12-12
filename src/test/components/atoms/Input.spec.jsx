import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input.jsx';

describe("Input Component", () => {
    it("deberia renderizar un input por defecto", () => {
        render(<Input />);
        const input = screen.getByRole('textbox');
        expect(input).toBeTruthy();
        expect(input.type).toBe('text');
    });

    it("deberia renderizar un textarea cuando type es textarea", () => {
        render(<Input type="textarea" />);
        const textarea = screen.getByRole('textbox');
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it("deberia tener el placeholder especificado", () => {
        render(<Input placeholder="Ingrese su nombre" />);
        const input = screen.getByPlaceholderText('Ingrese su nombre');
        expect(input).toBeTruthy();
    });

    it("deberia tener el valor especificado", () => {
        render(<Input value="test value" />);
        const input = screen.getByDisplayValue('test value');
        expect(input).toBeTruthy();
    });

    it("deberia ejecutar onChange cuando cambia el valor", () => {
        const mockChange = jasmine.createSpy('change');
        render(<Input onChange={mockChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'nuevo valor' } });
        expect(mockChange).toHaveBeenCalled();
    });

    it("deberia estar deshabilitado cuando disabled=true", () => {
        render(<Input disabled={true} />);
        const input = screen.getByRole('textbox');
        expect(input.disabled).toBeTruthy();
    });

    it("deberia ser required cuando required=true", () => {
        render(<Input required={true} />);
        const input = screen.getByRole('textbox');
        expect(input.required).toBeTruthy();
    });

    it("deberia aplicar custom className", () => {
        render(<Input className="custom-input" />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('custom-input');
    });

    it("deberia tener el nombre especificado", () => {
        render(<Input name="email" />);
        const input = screen.getByRole('textbox');
        expect(input.name).toBe('email');
    });

    it("deberia renderizar diferentes tipos de input", () => {
        const { rerender } = render(<Input type="email" />);
        let input = screen.getByRole('textbox');
        expect(input.type).toBe('email');
        
        rerender(<Input type="password" />);
        input = screen.getByDisplayValue('');
        expect(input.type).toBe('password');
    });

});
