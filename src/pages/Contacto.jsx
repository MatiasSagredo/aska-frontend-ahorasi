import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import Input from '../components/atoms/Input.jsx';
import ContactChannels from '../components/organisms/ContactChannels.jsx';

function Contacto() {
  return (
    <Div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-12 px-6 py-12">
      <Div className="space-y-4 text-primary-foreground">
        <Text variant="h1" className="font-heading text-4xl font-bold">Hablemos</Text>
        <Text className="max-w-2xl text-base text-primary-foreground/80">
          ¿Tienes dudas sobre productos, envíos o quieres colaborar con nosotros? Completa el formulario o utiliza uno de nuestros canales directos y nuestro equipo te responderá en menos de 24 horas hábiles.
        </Text>
      </Div>

      <Div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <ContactChannels />

        <Div className="rounded-3xl border border-primary/20 bg-secondary/60 p-8 shadow-xl">
          <Text variant="h2" className="mb-6 text-2xl font-heading font-semibold text-primary-foreground">
            Envíanos un mensaje
          </Text>
          <form className="space-y-5">
            <Div className="flex flex-col gap-2">
              <Text variant="label" className="text-sm font-semibold text-primary-foreground">Nombre completo</Text>
              <Input type="text" placeholder="Ej. Daniela Torres" className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary-foreground" />
            </Div>
            <Div className="flex flex-col gap-2">
              <Text variant="label" className="text-sm font-semibold text-primary-foreground">Correo electrónico</Text>
              <Input type="email" placeholder="tu@email.com" className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary-foreground" />
            </Div>
            <Div className="flex flex-col gap-2">
              <Text variant="label" className="text-sm font-semibold text-primary-foreground">Mensaje</Text>
              <textarea
                rows="5"
                className="resize-none rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Cuéntanos en qué podemos ayudarte"
              />
            </Div>
            <Button className="w-full bg-button text-primary-foreground shadow-md hover:bg-button/90">
              Enviar consulta
            </Button>
          </form>
        </Div>
      </Div>
    </Div>
  );
}

export default Contacto;
