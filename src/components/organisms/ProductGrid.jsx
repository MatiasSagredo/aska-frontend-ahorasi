import ProductCard from "../molecules/ProductCard.jsx";
import Text from "../atoms/Text.jsx";

function ProductGrid({ productos, imagenes }) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productos.length === 0 ? (
                <Text className="col-span-full text-center text-gray-600">No hay productos</Text>
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
                            id={p.idProducto}
                        />
                    )
                })
            )}
        </section>
    )

}

export default ProductGrid;
