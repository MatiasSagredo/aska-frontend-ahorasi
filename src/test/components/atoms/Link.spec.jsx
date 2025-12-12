import React from 'react';
import { render, screen } from '@testing-library/react';
import Link from '../../../components/atoms/Link.jsx';

describe("Link Component", () => {
    it("deberia renderizar un enlace con href", () => {
        render(<Link href="https://example.com">Example</Link>);
        const link = screen.getByText('Example');
        expect(link.tagName).toBe('A');
        expect(link.href).toBe('https://example.com/');
    });

    it("deberia tener el aria-label especificado", () => {
        render(<Link href="#" label="Home">Inicio</Link>);
        const link = screen.getByLabelText('Home');
        expect(link).toBeTruthy();
    });

    it("deberia renderizar contenido dentro del enlace", () => {
        render(
            <Link href="/">
                <span>Nested content</span>
            </Link>
        );
        const nested = screen.getByText('Nested content');
        expect(nested).toBeTruthy();
    });

    it("deberia aceptar href relativo", () => {
        render(<Link href="/about">About</Link>);
        const link = screen.getByText('About');
        expect(link.href).toContain('/about');
    });

    it("deberia aceptar hash href", () => {
        render(<Link href="#section">Section</Link>);
        const link = screen.getByText('Section');
        expect(link.href).toContain('#section');
    });

    it("deberia aceptar props adicionales", () => {
        render(<Link href="#" data-testid="custom-link">Link</Link>);
        const link = screen.getByTestId('custom-link');
        expect(link).toBeTruthy();
    });

    it("deberia renderizar sin label cuando no se proporciona", () => {
        const { container } = render(<Link href="/">Sin label</Link>);
        const link = container.querySelector('a');
        expect(link.getAttribute('aria-label')).toBeNull();
    });

    it("deberia permitir children como string o elemento", () => {
        const { rerender } = render(<Link href="/">String</Link>);
        expect(screen.getByText('String')).toBeTruthy();
        
        rerender(<Link href="/"><em>Elemento</em></Link>);
        expect(screen.getByText('Elemento')).toBeTruthy();
    });

});
