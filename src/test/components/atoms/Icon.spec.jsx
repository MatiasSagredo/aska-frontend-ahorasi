import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '../../../components/atoms/Icon.jsx';

describe("Icon Component", () => {
    it("deberia renderizar un icono con clase", () => {
        const { container } = render(<Icon prefix="fa-solid" name="fa-home" />);
        const icon = container.querySelector('i');
        expect(icon).toBeTruthy();
        expect(icon.className).toContain('fa-solid');
        expect(icon.className).toContain('fa-home');
    });

    it("deberia usar fa-solid como prefix por defecto", () => {
        const { container } = render(<Icon name="fa-star" />);
        const icon = container.querySelector('i');
        expect(icon.className).toContain('fa-solid');
    });

    it("deberia aplicar prefix personalizado", () => {
        const { container } = render(<Icon prefix="fa-brands" name="fa-github" />);
        const icon = container.querySelector('i');
        expect(icon.className).toContain('fa-brands');
        expect(icon.className).toContain('fa-github');
    });

    it("deberia aplicar clase CSS adicional", () => {
        const { container } = render(
            <Icon 
                prefix="fa-solid" 
                name="fa-heart" 
                className="text-red-500 text-2xl"
            />
        );
        const icon = container.querySelector('i');
        expect(icon.className).toContain('text-red-500');
        expect(icon.className).toContain('text-2xl');
    });

    it("deberia tener aria-hidden=true cuando no esta etiquetado", () => {
        const { container } = render(<Icon prefix="fa-solid" name="fa-check" />);
        const icon = container.querySelector('i');
        expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it("deberia no tener aria-hidden cuando labelled=true", () => {
        const { container } = render(
            <Icon prefix="fa-solid" name="fa-check" labelled={true} />
        );
        const icon = container.querySelector('i');
        expect(icon.getAttribute('aria-hidden')).toBeNull();
    });

    it("deberia combinar prefix, name y className correctamente", () => {
        const { container } = render(
            <Icon 
                prefix="fa-regular" 
                name="fa-envelope" 
                className="mx-2"
            />
        );
        const icon = container.querySelector('i');
        expect(icon.className).toContain('fa-regular');
        expect(icon.className).toContain('fa-envelope');
        expect(icon.className).toContain('mx-2');
    });

});
