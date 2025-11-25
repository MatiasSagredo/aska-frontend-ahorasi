import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Button from '../atoms/Button.jsx';
import Link from '../atoms/Link.jsx';
import Image from '../atoms/Image.jsx';

function Hero() {
  const highlights = [
    { title: 'Envíos en 48h', description: 'Despachos express a todo Chile con seguimiento en tiempo real.' },
    { title: 'Calidad Premium', description: 'Equipamiento testeado por atletas y respaldado por garantía extendida.' },
    { title: 'Soporte Personalizado', description: 'Coaches disponibles para ayudarte a elegir tu próximo upgrade deportivo.' },
  ];

  return (
    <Div className="relative overflow-hidden bg-secondary/40 py-16">
      <Div className="absolute inset-y-0 right-0 w-1/2 bg-linear-to-l from-primary/40 via-primary/20 to-transparent blur-3xl" aria-hidden="true" />
      <Div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
        <Div className="space-y-8 text-primary-foreground">
          <Div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-xs uppercase tracking-[0.35em] text-primary-foreground/70">
            <Text variant="span">Nueva Temporada</Text>
          </Div>
          <Text variant="h1" className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Potencia tu rendimiento con gear pensado para atletas urbanos
          </Text>
          <Text className="text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Descubre la colección de alto impacto de ASKA: materiales de vanguardia, ergonomía superior y diseños listos para cualquier desafío.
          </Text>
          <Div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button className="bg-button text-primary-foreground shadow-md hover:bg-button/90">
              Comprar ahora
            </Button>
            <Link
              href="/productos"
              label="Ver catálogo"
              className="inline-flex items-center justify-center rounded-lg border border-primary/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/20"
            >
              Ver catálogo
            </Link>
          </Div>
          <Div className="grid gap-4 sm:grid-cols-3">
            {highlights.map(({ title, description }) => (
              <Div key={title} className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <Text variant="h3" className="font-heading text-lg font-semibold">
                  {title}
                </Text>
                <Text className="mt-1 text-sm text-primary-foreground/70">
                  {description}
                </Text>
              </Div>
            ))}
          </Div>
        </Div>

        <Div className="relative flex justify-center">
          <Div className="absolute inset-0 -z-10 scale-125 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
          <Image
            src="/inicio.webp"
            alt="Atleta equipándose con indumentaria ASKA"
            className="w-full max-w-md rounded-3xl border border-primary/20 object-cover shadow-2xl"
          />
        </Div>
      </Div>
    </Div>
  );
}

export default Hero;
