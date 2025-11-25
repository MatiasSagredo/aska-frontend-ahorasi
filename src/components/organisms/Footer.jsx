import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Link from '../atoms/Link.jsx';
import Icon from '../atoms/Icon.jsx';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://www.instagram.com/', label: 'Instagram', icon: 'fa-instagram' },
    { href: 'https://www.facebook.com/', label: 'Facebook', icon: 'fa-facebook-f' },
    { href: 'https://www.tiktok.com/', label: 'TikTok', icon: 'fa-tiktok' },
  ];

  return (
    <footer className="bg-secondary text-primary-foreground py-8 mt-8">
      <Div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Div className="space-y-2">
          <Text variant="h2" className="text-xl font-bold font-heading tracking-wide">ASKA</Text>
          <Text className="text-sm opacity-80 max-w-md">
            Inspiramos a la comunidad deportiva con equipamiento de calidad y envíos rápidos en todo Chile.
          </Text>
        </Div>
        <Div className="flex items-center gap-4">
          {socialLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              label={item.label}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-secondary/50 transition-all hover:-translate-y-1 hover:bg-primary hover:text-secondary"
            >
              <Icon prefix="fa-brands" name={item.icon} className="text-xl" labelled />
              <Text variant="span" className="sr-only">{item.label}</Text>
            </Link>
          ))}
        </Div>
        <Div className="text-xs opacity-70 md:text-right">
          <Text className="text-xs">© {currentYear} ASKA. Todos los derechos reservados.</Text>
        </Div>
      </Div>
    </footer>
  );
}

export default Footer;
