import Div from '../components/atoms/Div.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import Image from '../components/atoms/Image.jsx';
import { useState, useEffect } from 'react';
import Alert from '../components/molecules/Alert.jsx';
import { useCart } from '../components/templates/CartProvider.jsx';

function Carrito() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // auto-hide alert after 4 seconds when shown
  useEffect(() => {
    if (!showAlert) return undefined;
    const id = setTimeout(() => setShowAlert(false), 4000);
    return () => clearTimeout(id);
  }, [showAlert]);

  if (!items || items.length === 0) {
    return (
      <Div className="mx-auto max-w-4xl p-8">
        <Text variant="h2" className="text-2xl font-heading font-bold">Tu carrito está vacío</Text>
        <Text className="mt-2 text-sm text-primary-foreground/80">Agrega productos para comenzar tu compra.</Text>
        {showAlert && (
          <div className="mt-4">
            <Alert
              type="success"
              title="Compra completa"
              message={alertMsg}
              dismissible
              onClose={() => setShowAlert(false)}
            />
          </div>
        )}
      </Div>
    );
  }

  return (
    <Div className="mx-auto max-w-6xl p-8">
      <Text variant="h1" className="font-heading text-3xl font-bold mb-6">Carrito</Text>
      <Div className="grid gap-6 md:grid-cols-3">
        <Div className="md:col-span-2 space-y-4">
          {items.map((it) => (
            <Div key={it.id} className="flex items-center gap-4 rounded-xl border border-primary/20 bg-secondary/40 p-4">
              <Image src={it.image} alt={it.name} className="h-20 w-20 rounded-lg object-cover" />
              <Div className="flex-1">
                <Text variant="h3" className="font-heading text-lg font-semibold">{it.name}</Text>
                <Text className="text-sm text-primary-foreground/70">{it.marca}</Text>
                <Text className="mt-2">Precio: ${it.price}</Text>
                <Div className="mt-2 flex items-center gap-2">
                  <Button onClick={() => updateQuantity(it.id, (it.quantity || 1) - 1)} className="px-3 py-1">-</Button>
                  <Text className="px-2">{it.quantity}</Text>
                  <Button onClick={() => updateQuantity(it.id, (it.quantity || 1) + 1)} className="px-3 py-1">+</Button>
                  <Button onClick={() => removeFromCart(it.id)} className="ml-4 bg-button-error">Eliminar</Button>
                </Div>
              </Div>
            </Div>
          ))}
        </Div>

        <Div className="rounded-2xl border border-primary/20 bg-primary/10 p-6">
          <Text className="text-sm text-primary-foreground/70">Resumen</Text>
          <Div className="my-4 flex items-center justify-between">
            <Text className="font-semibold">Total</Text>
            <Text className="font-heading text-xl font-bold">${total.toFixed(2)}</Text>
          </Div>
          <Button className="w-full bg-button-success" onClick={() => {
            // Simular pago: vaciar carrito y mostrar alerta
            clearCart();
            setAlertMsg('Compra realizada con éxito');
            setShowAlert(true);
          }}>Pagar</Button>
          {showAlert && (
            <div className="mt-4">
              <Alert
                type="success"
                title="Compra completa"
                message={alertMsg}
                dismissible
                onClose={() => setShowAlert(false)}
              />
            </div>
          )}
          <Button onClick={() => { clearCart(); }} className="mt-3 w-full bg-secondary">Vaciar carrito</Button>
        </Div>
      </Div>
    </Div>
  );
}

export default Carrito;
