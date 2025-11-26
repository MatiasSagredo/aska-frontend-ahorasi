import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import ContactChannels from '../components/organisms/ContactChannels.jsx';
import ContactForm from '../components/organisms/ContactForm.jsx';

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
        <ContactForm />
      </Div>
    </Div>
  );
}

export default Contacto;
