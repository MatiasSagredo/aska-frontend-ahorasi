import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductGrid from '../../../components/organisms/ProductGrid.jsx';

describe("Componente Grid de Productos", () => {
    const productosMock = [
        {
            idProducto: 1,
            nombreProducto: 'Karate Gi',
            descripcion: 'Uniforme de karate',
            precio: 45.99,
            idMarca: { idMarca: 1, nombreMarca: 'Adidas' }
        },
        {
            idProducto: 2,
            nombreProducto: 'Guantes de boxeo',
            descripcion: 'Guantes profesionales',
            precio: 89.99,
            idMarca: { idMarca: 2, nombreMarca: 'Nike' }
        }
    ];

    const imagenesMock = [
        { idProducto: { idProducto: 1 }, urlImagen: '/images/gi.jpg' },
        { idProducto: { idProducto: 2 }, urlImagen: '/images/gloves.jpg' }
    ];

    it("debería renderizar los productos", () => {
        render(
            <BrowserRouter>
                <ProductGrid productos={productosMock} imagenes={imagenesMock} />
            </BrowserRouter>
        );
        expect(screen.getByText('Karate Gi')).toBeTruthy();
        expect(screen.getByText('Guantes de boxeo')).toBeTruthy();
    });

    it("debería renderizar mensaje cuando no hay productos", () => {
        render(
            <BrowserRouter>
                <ProductGrid productos={[]} imagenes={[]} />
            </BrowserRouter>
        );
        expect(screen.getByText('No hay productos')).toBeTruthy();
    });

    it("debería mostrar descripción de productos", () => {
        render(
            <BrowserRouter>
                <ProductGrid productos={productosMock} imagenes={imagenesMock} />
            </BrowserRouter>
        );
        expect(screen.getByText('Uniforme de karate')).toBeTruthy();
        expect(screen.getByText('Guantes profesionales')).toBeTruthy();
    });

    it("debería mostrar precio de productos", () => {
        render(
            <BrowserRouter>
                <ProductGrid productos={productosMock} imagenes={imagenesMock} />
            </BrowserRouter>
        );
        expect(screen.getByText('Precio: $45.99')).toBeTruthy();
        expect(screen.getByText('Precio: $89.99')).toBeTruthy();
    });

    it("debería mostrar marca de productos", () => {
        render(
            <BrowserRouter>
                <ProductGrid productos={productosMock} imagenes={imagenesMock} />
            </BrowserRouter>
        );
        expect(screen.getByText('Adidas')).toBeTruthy();
        expect(screen.getByText('Nike')).toBeTruthy();
    });

    it("debería renderizar como section", () => {
        const { container } = render(
            <BrowserRouter>
                <ProductGrid productos={productosMock} imagenes={imagenesMock} />
            </BrowserRouter>
        );
        const section = container.querySelector('section');
        expect(section).toBeTruthy();
    });

    it("debería tener clase grid", () => {
        const { container } = render(
            <BrowserRouter>
                <ProductGrid productos={productosMock} imagenes={imagenesMock} />
            </BrowserRouter>
        );
        const section = container.querySelector('section');
        expect(section.className).toContain('grid');
    });

});
