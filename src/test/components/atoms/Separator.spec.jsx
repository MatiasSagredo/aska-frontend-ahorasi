import React from 'react';
import { render } from '@testing-library/react';
import Separator from '../../../components/atoms/Separator.jsx';

describe("Separator Component", () => {
    it("deberia renderizar un elemento hr", () => {
        const { container } = render(<Separator />);
        const separator = container.querySelector('hr');
        expect(separator).toBeTruthy();
    });

    it("deberia tener las clases CSS por defecto", () => {
        const { container } = render(<Separator />);
        const separator = container.querySelector('hr');
        expect(separator.className).toContain('border-t');
        expect(separator.className).toContain('border-white/10');
        expect(separator.className).toContain('my-2');
    });

    it("deberia aplicar clase CSS personalizada", () => {
        const { container } = render(<Separator className="my-6" />);
        const separator = container.querySelector('hr');
        expect(separator.className).toContain('my-6');
    });

    it("deberia combinar clases default con personalizada", () => {
        const { container } = render(<Separator className="extra-class" />);
        const separator = container.querySelector('hr');
        expect(separator.className).toContain('border-t');
        expect(separator.className).toContain('border-white/10');
        expect(separator.className).toContain('my-2');
        expect(separator.className).toContain('extra-class');
    });

    it("deberia renderizar multiple separadores", () => {
        const { container } = render(
            <>
                <Separator />
                <Separator />
                <Separator />
            </>
        );
        const separators = container.querySelectorAll('hr');
        expect(separators.length).toBe(3);
    });

    it("deberia ser un elemento vacio", () => {
        const { container } = render(<Separator />);
        const separator = container.querySelector('hr');
        expect(separator.childNodes.length).toBe(0);
    });

});
