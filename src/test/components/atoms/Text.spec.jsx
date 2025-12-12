import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text.jsx';

describe("Text Component", () => {
    it("deberia renderizar un parrafo por defecto", () => {
        render(<Text>Hello World</Text>);
        const text = screen.getByText('Hello World');
        expect(text.tagName).toBe('P');
    });

    it("deberia renderizar heading cuando variant es h1", () => {
        render(<Text variant="h1">Titulo</Text>);
        const heading = screen.getByText('Titulo');
        expect(heading.tagName).toBe('H1');
    });

    it("deberia renderizar heading h2", () => {
        render(<Text variant="h2">Subtitulo</Text>);
        const heading = screen.getByText('Subtitulo');
        expect(heading.tagName).toBe('H2');
    });

    it("deberia renderizar heading h3", () => {
        render(<Text variant="h3">Sub-subtitulo</Text>);
        const heading = screen.getByText('Sub-subtitulo');
        expect(heading.tagName).toBe('H3');
    });

    it("deberia renderizar span cuando variant es span", () => {
        render(<Text variant="span">Texto en linea</Text>);
        const span = screen.getByText('Texto en linea');
        expect(span.tagName).toBe('SPAN');
    });

    it("deberia aplicar la clase CSS personalizada", () => {
        render(<Text className="text-large">Contenido</Text>);
        const element = screen.getByText('Contenido');
        expect(element.className).toContain('text-large');
    });

    it("deberia aceptar el prop index", () => {
        render(<Text index={0}>Item</Text>);
        const element = screen.getByText('Item');
        expect(element).toBeTruthy();
    });

    it("deberia renderizar multiples elementos con variantes diferentes", () => {
        const { container } = render(
            <>
                <Text variant="h1">Titulo</Text>
                <Text variant="h2">Subtitulo</Text>
                <Text>Parrafo normal</Text>
            </>
        );
        const headings = container.querySelectorAll('h1, h2, p');
        expect(headings.length).toBe(3);
    });

    it("deberia aceptar props adicionales", () => {
        render(<Text data-testid="text-element">Test</Text>);
        const element = screen.getByTestId('text-element');
        expect(element).toBeTruthy();
    });

});
