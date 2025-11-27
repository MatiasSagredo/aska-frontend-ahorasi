import Button from '../atoms/Button.jsx';
import Input from '../atoms/Input.jsx';
import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import { useState } from 'react';

function ContactForm() {

    const [nombreCompleto, setNombreCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    return (
        <Div className="rounded-3xl border border-primary/20 bg-secondary/60 p-8 shadow-xl">
            <Text variant="h2" className="mb-6 text-2xl font-heading font-semibold text-primary-foreground">
                Envíanos un mensaje
            </Text>
            <form className="space-y-5">
                <Div className="flex flex-col gap-2">
                    <Text variant="label" className="text-sm font-semibold text-primary-foreground">Nombre completo</Text>
                    <Input type="text" placeholder="Ej. Daniela Torres" className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary-foreground" onChange={(e) => { setNombreCompleto(e.target.value); }} value={nombreCompleto} />
                </Div>
                <Div className="flex flex-col gap-2">
                    <Text variant="label" className="text-sm font-semibold text-primary-foreground">Correo electrónico</Text>
                    <Input type="email" placeholder="tu@email.com" className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary-foreground" onChange={(e) => { setEmail(e.target.value); }} value={email} />
                </Div>
                <Div className="flex flex-col gap-2">
                    <Text variant="label" className="text-sm font-semibold text-primary-foreground">Mensaje</Text>
                    <Input type='textarea'
                        rows="5"
                        className="resize-none rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Cuéntanos en qué podemos ayudarte"
                        onChange={(e) => { setMensaje(e.target.value); }} value={mensaje}
                    />
                </Div>
                <Button className="w-full bg-button text-primary-foreground shadow-md hover:bg-button/90">
                    Enviar consulta
                </Button>
            </form>
        </Div>
    )
}

export default ContactForm;
