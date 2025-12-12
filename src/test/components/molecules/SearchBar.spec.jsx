import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../components/molecules/SearchBar.jsx';

describe("Componente Barra de Búsqueda", () => {
    it("debería renderizar el input de búsqueda", () => {
        render(<SearchBar placeholder="Buscar..." />);
        const input = screen.getByPlaceholderText('Buscar...');
        expect(input).toBeTruthy();
        expect(input.type).toBe('search');
    });

    it("debería actualizar el valor cuando se escribe", () => {
        render(<SearchBar placeholder="Buscar..." />);
        const input = screen.getByPlaceholderText('Buscar...');
        fireEvent.change(input, { target: { value: 'producto' } });
        expect(input.value).toBe('producto');
    });

    it("debería ejecutar onChange cuando se escribe", () => {
        const mockChange = jasmine.createSpy('onChange');
        render(<SearchBar placeholder="Buscar..." onChange={mockChange} />);
        const input = screen.getByPlaceholderText('Buscar...');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(mockChange).toHaveBeenCalled();
    });

    it("debería tener placeholder personalizado", () => {
        render(<SearchBar placeholder="Buscar productos..." />);
        const input = screen.getByPlaceholderText('Buscar productos...');
        expect(input).toBeTruthy();
    });

    it("debería empezar con valor vacío", () => {
        render(<SearchBar placeholder="Buscar..." />);
        const input = screen.getByPlaceholderText('Buscar...');
        expect(input.value).toBe('');
    });

    it("debería aplicar clase CSS mb-4", () => {
        render(<SearchBar placeholder="Buscar..." />);
        const input = screen.getByPlaceholderText('Buscar...');
        expect(input.className).toContain('mb-4');
    });

    it("debería aplicar clase CSS text-white", () => {
        render(<SearchBar placeholder="Buscar..." />);
        const input = screen.getByPlaceholderText('Buscar...');
        expect(input.className).toContain('text-white');
    });

    it("debería manejar múltiples cambios consecutivos", () => {
        const mockChange = jasmine.createSpy('onChange');
        render(<SearchBar placeholder="Buscar..." onChange={mockChange} />);
        const input = screen.getByPlaceholderText('Buscar...');
        
        fireEvent.change(input, { target: { value: 'a' } });
        fireEvent.change(input, { target: { value: 'ab' } });
        fireEvent.change(input, { target: { value: 'abc' } });
        
        expect(mockChange).toHaveBeenCalledTimes(3);
    });

});
