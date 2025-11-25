import ProductCard from "../molecules/ProductCard.jsx";

function ProductGrid({ productos, imagenes, ...props }) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productos.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">No hay productos</div>
        ) : (
          productos.map((p) => {
            const imagenProducto = (imagenes.filter(img => img.idProducto.idProducto == p.idProducto))[0] ?? null;
            return (
              <ProductCard
                key={p.idProducto ?? p._id ?? p.nombreProducto}
                name={p.nombreProducto}
                description={p.descripcion}
                precio={p.precio}
                marca={p.idMarca.nombreMarca}
                image={imagenProducto?.urlImagen}
              />
            )
          })
        )}
        </section>
    )

}

export default ProductGrid;