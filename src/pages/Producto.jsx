import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Div from "../components/atoms/Div";
import producto from "../api/objects/producto";
import imagenes from "../api/objects/imagenes";

function Producto() {
    /** @type {[import("../api/objects/producto.js").Producto]} */
    const [product, setProduct] = useState({});
    /** @type {[import("../api/objects/imagenes.js").Imagenes[]]} */
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await producto.getById(id);
                const imgdata = await imagenes.getAll();
                if (mounted) setProduct((data) ? data : null);
                if (mounted) setImages(Array.isArray(imgdata) ? imgdata : []);
                console.log(data);
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [id]);

    if (loading) return <Div className="p-6 text-center">Cargando producto...</Div>;
    if (error) return <Div className="p-6 text-center text-red-500">Error cargando producto</Div>;
    return (
        <></>
    )
}

export default Producto;
