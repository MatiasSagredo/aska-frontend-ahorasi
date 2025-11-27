import Div from '../atoms/Div.jsx';
import ContactCard from '../molecules/ContactCard.jsx';

const channels = [
    {
        title: 'Atención al cliente',
        description: '+56 2 1234 5678 (Lun-Vie 9:00 a 19:00)',
        icon: 'fa-phone-volume',
        href: 'tel:+56212345678',
        iconClassName: 'text-[#2ecc71]',
    },
    {
        title: 'Escríbenos',
        description: 'hola@aska.cl',
        icon: 'fa-envelope-open-text',
        href: 'mailto:hola@aska.cl',
        iconClassName: 'text-[#3498db]',
    },
    {
        title: 'Visítanos',
        description: 'Av. Providencia 1230, Santiago, Chile',
        icon: 'fa-location-dot',
        iconClassName: 'text-[#e67e22]',
    },
    {
        title: 'Instagram',
        description: '@aska.performance',
        iconPrefix: 'fa-brands',
        icon: 'fa-instagram',
        href: 'https://www.instagram.com/',
        iconClassName: 'text-[#e1306c]',
    },
];

function ContactChannels() {
    return (
        <Div className="grid gap-4">
            {channels.map((channel) => (
                <ContactCard key={channel.title} {...channel} />
            ))}
        </Div>
    );
}

export default ContactChannels;
