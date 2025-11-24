// ...existing code...
import React, { useEffect, useState } from "react";
import ProductCard from "../components/molecules/ProductCard.jsx";
import producto from '../api/objects/producto.js';

function Home() {
    /** @type {[import("../api/objects/producto.js").Producto[]]} */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await producto.getAll();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
        console.log(data);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6 text-center">Cargando productos...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error cargando productos</div>;

  return (
    <main className="min-h-screen p-6 bg-primary-50">
      <header className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Productos</h1>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">No hay productos</div>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.idProducto ?? p._id ?? p.nombreProducto}
              name={p.nombreProducto}
              description={p.descripcion}
              precio={p.precio}
              marca={p.idMarca.nombreMarca}
              image={p.image}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Home;
// ...existing code...