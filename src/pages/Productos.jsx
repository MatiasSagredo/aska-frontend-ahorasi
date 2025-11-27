import { useEffect, useState } from "react";
import producto from '../api/objects/producto.js';
import imagenes from "../api/objects/imagenes.js";
import Div from "../components/atoms/Div.jsx";
import ProductGrid from "../components/organisms/ProductGrid.jsx";

function Productos() {
    /** @type {[import("../api/objects/producto.js").Producto[]]} */
    const [products, setProducts] = useState([]);
    /** @type {[import("../api/objects/imagenes.js").Imagenes[]]} */
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await producto.getAll();
                const imgdata = await imagenes.getAll();
                if (mounted) setProducts(Array.isArray(data) ? data : []);
                if (mounted) setImages(Array.isArray(imgdata) ? imgdata : []);
                console.log(data);
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    if (loading) return <Div className="p-6 text-center">Cargando productos...</Div>;
    if (error) return <Div className="p-6 text-center text-red-500">Error cargando productos</Div>;

    return (
        <main className="min-h-screen p-6 bg-primary-50">
            <ProductGrid productos={products} imagenes={images} />
        </main>
    );
}

export default Productos;
