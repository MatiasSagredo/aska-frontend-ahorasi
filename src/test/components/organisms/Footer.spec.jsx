import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer.jsx';

describe("Componente Footer", () => {
    it("debería renderizar el título ASKA", () => {
        render(<Footer />);
        expect(screen.getByText('ASKA')).toBeTruthy();
    });

    it("debería mostrar la descripción", () => {
        render(<Footer />);
        expect(screen.getByText(/Inspiramos a la comunidad deportiva/i)).toBeTruthy();
    });

    it("debería incluir el año actual en copyright", () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeTruthy();
    });

    it("debería mostrar texto de derechos reservados", () => {
        render(<Footer />);
        expect(screen.getByText(/Todos los derechos reservados/i)).toBeTruthy();
    });

    it("debería tener enlace a Instagram", () => {
        render(<Footer />);
        const instagramLink = screen.getByLabelText('Instagram');
        expect(instagramLink).toBeTruthy();
        expect(instagramLink.href).toContain('instagram.com');
    });

    it("debería tener enlace a Facebook", () => {
        render(<Footer />);
        const facebookLink = screen.getByLabelText('Facebook');
        expect(facebookLink).toBeTruthy();
        expect(facebookLink.href).toContain('facebook.com');
    });

    it("debería tener enlace a TikTok", () => {
        render(<Footer />);
        const tiktokLink = screen.getByLabelText('TikTok');
        expect(tiktokLink).toBeTruthy();
        expect(tiktokLink.href).toContain('tiktok.com');
    });

    it("debería renderizar como footer", () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer).toBeTruthy();
    });

    it("debería tener clase bg-secondary", () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer');
        expect(footer.className).toContain('bg-secondary');
    });

});
