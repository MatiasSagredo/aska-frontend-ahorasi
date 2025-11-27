import { useEffect, useState } from "react";
import producto from '../api/objects/producto.js';
import imagenes from "../api/objects/imagenes.js";
import Div from "../components/atoms/Div.jsx";
import ProductGrid from "../components/organisms/ProductGrid.jsx";
import SearchBar from '../components/molecules/SearchBar.jsx';

function Productos() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await producto.getAll();
                const imgdata = await imagenes.getAll();
                const list = Array.isArray(data) ? data : [];
                if (mounted) {
                    setProducts(list);
                    setAllProducts(list);
                }
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
            <SearchBar value={searchValue} onChange={(e) => {
                const val = (e.target.value || '').trim();
                setSearchValue(val);
                if (!val) {
                    setProducts(allProducts);
                    return;
                }
                const lower = val.toLowerCase();
                setProducts(
                    allProducts.filter((prod) =>
                        (prod.nombreProducto || '').toLowerCase().includes(lower)
                    )
                );
            }} />
            <ProductGrid productos={products} imagenes={images} />
        </main>
    );
}

export default Productos;
