import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../../components/molecules/ProductCard.jsx';

describe("Componente Tarjeta de Producto", () => {
    const productProps = {
        name: 'Karate Gi',
        description: 'Uniforme de karate de algodon',
        precio: 45.99,
        marca: 'Adidas',
        image: '/images/karate-gi.jpg',
        id: 1
    };

    it("debería renderizar el nombre del producto", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        expect(screen.getByText('Karate Gi')).toBeTruthy();
    });

    it("debería renderizar la descripción", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        expect(screen.getByText('Uniforme de karate de algodon')).toBeTruthy();
    });

    it("debería mostrar el precio", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        expect(screen.getByText('Precio: $45.99')).toBeTruthy();
    });

    it("debería mostrar la marca", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        expect(screen.getByText('Adidas')).toBeTruthy();
    });

    it("debería renderizar la imagen", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        const imagen = screen.getByAltText('imagen de Karate Gi');
        expect(imagen).toBeTruthy();
        expect(imagen.src).toContain('/images/karate-gi.jpg');
    });

    it("debería tener botón de Comprar", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        const botonComprar = screen.getByText('Comprar');
        expect(botonComprar).toBeTruthy();
    });

    it("debería tener enlace Ver Información", () => {
        render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        const enlaceInfo = screen.getByText('Ver Informacion');
        expect(enlaceInfo).toBeTruthy();
    });

    it("debería renderizar como article", () => {
        const { container } = render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        const article = container.querySelector('article');
        expect(article).toBeTruthy();
    });

    it("debería tener clase bg-secondary", () => {
        const { container } = render(
            <BrowserRouter>
                <ProductCard {...productProps} />
            </BrowserRouter>
        );
        const article = container.querySelector('article');
        expect(article.className).toContain('bg-secondary');
    });

});

