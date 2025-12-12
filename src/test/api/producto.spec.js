import producto from '../../api/objects/producto.js';

describe("Producto API", () => {
    let productosMock = [
        {
            idProducto: 1,
            nombreProducto: 'Karate gi',
            descripcion: 'Uniforme de karate de algodon',
            precio: 45,
            idMarca: {
                idMarca: 1,
                nombreMarca: 'adidas'
            }
        },
        {
            idProducto: 2,
            nombreProducto: 'Nunchaku',
            descripcion: 'Nunchaku de madera',
            precio: 25,
            idMarca: {
                idMarca: 2,
                nombreMarca: 'nike'
            }
        },
        {
            idProducto: 3,
            nombreProducto: 'Cinturon',
            descripcion: 'Cinturon de karate',
            precio: 15,
            idMarca: {
                idMarca: 3,
                nombreMarca: 'puma'
            }
        }
    ];
    let productoMock = productosMock[0];
    
    beforeEach(() => {
        spyOn(producto, 'getAll').and.returnValue(
            Promise.resolve(productosMock)
        );
        spyOn(producto, 'getById').and.callFake((id) => {
            return Promise.resolve(productosMock.find(p => p.idProducto === id));
        });
        spyOn(producto, 'createProducto').and.callFake((data) => {
            return Promise.resolve({ idProducto: 4, ...data });
        });
        spyOn(producto, 'updateProductoById').and.callFake((id, data) => {
            return Promise.resolve({ idProducto: id, ...data });
        });
        spyOn(producto, 'patchProductoById').and.callFake((id, data) => {
            return Promise.resolve({ idProducto: id, ...data });
        });
        spyOn(producto, 'deleteProductoById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los productos", async () => {
        let productosResult = await producto.getAll();
        expect(producto.getAll).toHaveBeenCalledTimes(1);
        expect(productosResult).toBe(productosMock);
        expect(productosResult.length).toBe(3);
    });

    it("deberia devolver un producto por id", async () => {
        let productoResult = await producto.getById(1);
        expect(producto.getById).toHaveBeenCalledWith(1);
        expect(productoResult).toBe(productoMock);
        expect(productoResult.nombreProducto).toBe('Karate gi');
        expect(productoResult.precio).toBe(45);
    });

    it("deberia devolver undefined si el producto no existe", async () => {
        let productoResult = await producto.getById(999);
        expect(producto.getById).toHaveBeenCalledWith(999);
        expect(productoResult).toBeUndefined();
    });

    it("deberia crear un producto", async () => {
        const newProducto = {
            nombreProducto: 'Protectores',
            descripcion: 'Protectores de karate',
            precio: 35,
            idMarca: { idMarca: 1 }
        };
        let createResult = await producto.createProducto(newProducto);
        expect(producto.createProducto).toHaveBeenCalledWith(newProducto);
        expect(createResult.idProducto).toBe(4);
        expect(createResult.nombreProducto).toBe('Protectores');
    });

    it("deberia actualizar un producto por id", async () => {
        const updated = {
            nombreProducto: 'Karate gi premium',
            descripcion: 'Uniforme de karate premium',
            precio: 65,
            idMarca: { idMarca: 1 }
        };
        let updateResult = await producto.updateProductoById(1, updated);
        expect(producto.updateProductoById).toHaveBeenCalledWith(1, updated);
        expect(updateResult.idProducto).toBe(1);
        expect(updateResult.nombreProducto).toBe('Karate gi premium');
        expect(updateResult.precio).toBe(65);
    });

    it("deberia aplicar patch a un producto por id", async () => {
        const patchData = { precio: 20 };
        let patchResult = await producto.patchProductoById(2, patchData);
        expect(producto.patchProductoById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult.idProducto).toBe(2);
        expect(patchResult.precio).toBe(20);
    });

    it("deberia eliminar un producto por id", async () => {
        let deleteResult = await producto.deleteProductoById(1);
        expect(producto.deleteProductoById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
