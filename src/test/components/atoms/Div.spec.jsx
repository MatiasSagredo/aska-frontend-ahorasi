import React from 'react';
import { render, screen } from '@testing-library/react';
import Div from '../../../components/atoms/Div.jsx';

describe("Div Component", () => {
    it("deberia renderizar un div por defecto", () => {
        const { container } = render(<Div>Content</Div>);
        const div = container.querySelector('div');
        expect(div).toBeTruthy();
        expect(div.textContent).toBe('Content');
    });

    it("deberia renderizar el variant especificado", () => {
        const { container } = render(<Div variant="section">Section content</Div>);
        const section = container.querySelector('section');
        expect(section).toBeTruthy();
        expect(section.textContent).toBe('Section content');
    });

    it("deberia renderizar como article", () => {
        const { container } = render(<Div variant="article">Article</Div>);
        const article = container.querySelector('article');
        expect(article).toBeTruthy();
    });

    it("deberia renderizar como header", () => {
        const { container } = render(<Div variant="header">Header</Div>);
        const header = container.querySelector('header');
        expect(header).toBeTruthy();
    });

    it("deberia renderizar como footer", () => {
        const { container } = render(<Div variant="footer">Footer</Div>);
        const footer = container.querySelector('footer');
        expect(footer).toBeTruthy();
    });

    it("deberia aceptar className", () => {
        const { container } = render(
            <Div className="bg-white rounded-lg">Styled</Div>
        );
        const div = container.querySelector('div');
        expect(div.className).toContain('bg-white');
        expect(div.className).toContain('rounded-lg');
    });

    it("deberia aceptar props adicionales", () => {
        const { container } = render(
            <Div data-testid="container" id="main">Content</Div>
        );
        const div = container.querySelector('[data-testid="container"]');
        expect(div).toBeTruthy();
        expect(div.id).toBe('main');
    });

    it("deberia renderizar children complejos", () => {
        const { container } = render(
            <Div>
                <h1>Titulo</h1>
                <p>Parrafo</p>
            </Div>
        );
        const div = container.querySelector('div');
        expect(div.querySelector('h1')).toBeTruthy();
        expect(div.querySelector('p')).toBeTruthy();
    });

});
