import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Div from "../components/atoms/Div.jsx";
import Text from "../components/atoms/Text.jsx";
import Image from "../components/atoms/Image.jsx";
import Button from "../components/atoms/Button.jsx";
import producto from "../api/objects/producto.js";
import imagenes from "../api/objects/imagenes.js";
import { useCart } from "../components/templates/CartProvider.jsx";
import { useAuth } from "../components/templates/AuthProvider.jsx";
import Separator from "../components/atoms/Separator.jsx";

function Producto() {
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();

    const { addToCart } = (() => {
        try {
            return useCart();
        } catch (e) {
            return { addToCart: () => { } };
        }
    })();

    useEffect(() => {
        if (!id) {
            setProduct(null);
            setLoading(false);
            return;
        }

        let mounted = true;
        setLoading(true);
        setError(null);

        (async () => {
            try {
                const [data, imgdata] = await Promise.all([
                    producto.getById(id),
                    imagenes.getAll()
                ]);
                if (!mounted) return;
                setProduct(data ?? null);
                setImages(Array.isArray(imgdata) ? imgdata : []);
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => { mounted = false; };
    }, [id]);

    const imagenesProducto = product
        ? images.filter((img) => img?.idProducto?.idProducto === product.idProducto) ?? null
        : null;

    const formattedPrice = typeof product?.precio === "number"
        ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(product.precio)
        : product?.precio;

    const handleAddToCart = () => {
        if (!product) return;
        const cartId = product.idProducto ?? product.nombreProducto ?? `producto-${id}`;
        addToCart({
            id: cartId,
            name: product.nombreProducto,
            price: product.precio,
            image: imagenesProducto[0]?.urlImagen,
            marca: product.idMarca?.nombreMarca
        }, 1);
    };

    if (loading) return <Div className="p-6 text-center">Cargando producto...</Div>;
    if (error) return <Div className="p-6 text-center text-red-500">Error cargando producto</Div>;
    if (!product) return <Div className="p-6 text-center">Producto no encontrado</Div>;

    return (
        <Div className="min-h-screen bg-primary-50 p-6">
            <Div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-white/10 bg-secondary shadow-xl">
                <Div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <Div className="flex items-center justify-center rounded-xl bg-primary-100 p-6">
                        <Image
                            src={imagenesProducto[0]?.urlImagen ?? "https://via.placeholder.com/600?text=Sin+imagen"}
                            alt={`Imagen del producto ${product.nombreProducto}`}
                            className="h-72 w-full max-w-md rounded-xl object-contain"
                        />
                    </Div>
                    <Div className="flex flex-col gap-4">
                        <Text variant="h2" className="font-heading text-3xl font-bold text-white">
                            {product.nombreProducto}
                        </Text>
                        <Text className="text-gray-300">{product.descripcion}</Text>
                        <Div className="flex flex-col gap-2 rounded-lg bg-primary-100 p-4">
                            <Text className="text-lg font-semibold text-white">{formattedPrice}</Text>
                            <Text className="text-sm text-gray-300">
                                Marca: {product.idMarca?.nombreMarca ?? "Sin marca"}
                            </Text>
                            <Text className="text-sm text-gray-300">
                                ID producto: {product.idProducto ?? "N/A"}
                            </Text>
                        </Div>
                        <Button onClick={handleAddToCart} className="bg-button-success self-start">
                            Añadir al carrito
                        </Button>
                    </Div>
                </Div>
                <Div className="flex flex-col gap-2 bg-primary-100 p-4 md:flex-row md:items-center md:justify-between">
                    <Div className="flex flex-col gap-4 w-full">
                    <Separator />
                    {user?.idRol?.idRol === 1 && (
                        <Div className="flex flex-col gap-2 md:flex-row">
                            <Button 
                                onClick={() => window.location.href = `/admin/productos/editar/${product.idProducto}`}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2.5"
                            >
                                Editar Producto
                            </Button>
                            <Button 
                                onClick={async () => {
                                    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                                        try {
                                            await producto.deleteProductoById(product.idProducto);
                                            window.location.href = '/productos';
                                        } catch (err) {
                                            alert('Error al eliminar el producto');
                                        }
                                    }
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5"
                            >
                                Eliminar Producto
                            </Button>
                        </Div>
                    )}
                    <Text className="text-sm text-gray-300 mb-2">
                        ¿Buscabas otro producto? Vuelve a la lista para seguir explorando.
                    </Text>
                    <RouterLink
                        to="/productos"
                        className="bg-button px-4 py-2.5 text-center text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95"
                    >
                        Volver a productos
                    </RouterLink>
                    </Div>
                </Div>
            </Div>
        </Div>
    );
}

export default Producto;
