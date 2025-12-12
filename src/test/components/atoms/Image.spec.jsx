import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image.jsx';

describe("Image Component", () => {
    it("deberia renderizar una imagen con src y alt", () => {
        render(<Image src="test.jpg" alt="Test image" />);
        const image = screen.getByAltText('Test image');
        expect(image.tagName).toBe('IMG');
        expect(image.src).toContain('test.jpg');
    });

    it("deberia tener el alt text especificado", () => {
        render(<Image src="photo.jpg" alt="My photo" />);
        const image = screen.getByAltText('My photo');
        expect(image).toBeTruthy();
    });

    it("deberia aplicar la clase CSS personalizada", () => {
        render(<Image src="img.jpg" alt="Image" className="rounded-lg" />);
        const image = screen.getByAltText('Image');
        expect(image.className).toContain('rounded-lg');
    });

    it("deberia manejar imagenes locales", () => {
        render(<Image src="/images/local.jpg" alt="Local image" />);
        const image = screen.getByAltText('Local image');
        expect(image.src).toContain('/images/local.jpg');
    });

    it("deberia manejar URLs externas", () => {
        render(<Image src="https://example.com/image.jpg" alt="External" />);
        const image = screen.getByAltText('External');
        expect(image.src).toBe('https://example.com/image.jpg');
    });

    it("deberia aplicar multiples clases CSS", () => {
        render(
            <Image 
                src="pic.jpg" 
                alt="Picture" 
                className="w-full h-auto object-cover"
            />
        );
        const image = screen.getByAltText('Picture');
        expect(image.className).toContain('w-full');
        expect(image.className).toContain('h-auto');
        expect(image.className).toContain('object-cover');
    });

    it("deberia renderizar sin className", () => {
        const { container } = render(<Image src="img.jpg" alt="Test" />);
        const image = container.querySelector('img');
        expect(image).toBeTruthy();
    });

});
