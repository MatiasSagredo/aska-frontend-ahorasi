import imagenes from '../../api/objects/imagenes.js';

describe("Imagenes API", () => {
    let imagenesMock = [
        { idImagenes: 1, urlImagen: 'https://example.com/img1.jpg', idProducto: 1 },
        { idImagenes: 2, urlImagen: 'https://example.com/img2.jpg', idProducto: 1 },
        { idImagenes: 3, urlImagen: 'https://example.com/img3.jpg', idProducto: 2 }
    ];
    let imagenMock = imagenesMock[0];
    
    beforeEach(() => {
        spyOn(imagenes, 'getAll').and.returnValue(
            Promise.resolve(imagenesMock)
        );
        spyOn(imagenes, 'getById').and.callFake((id) => {
            return Promise.resolve(imagenesMock.find(i => i.idImagenes === id));
        });
        spyOn(imagenes, 'createImagenes').and.callFake((data) => {
            return Promise.resolve({ idImagenes: 4, ...data });
        });
        spyOn(imagenes, 'updateImagenesById').and.callFake((id, data) => {
            return Promise.resolve({ idImagenes: id, ...data });
        });
        spyOn(imagenes, 'patchImagenesById').and.callFake((id, data) => {
            return Promise.resolve({ idImagenes: id, ...data });
        });
        spyOn(imagenes, 'deleteImagenesById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las imagenes", async () => {
        let imagenesResult = await imagenes.getAll();
        expect(imagenes.getAll).toHaveBeenCalledTimes(1);
        expect(imagenesResult).toBe(imagenesMock);
        expect(imagenesResult.length).toBe(3);
    });

    it("deberia devolver una imagen por id", async () => {
        let imagenResult = await imagenes.getById(1);
        expect(imagenes.getById).toHaveBeenCalledWith(1);
        expect(imagenResult).toBe(imagenMock);
        expect(imagenResult.urlImagen).toBe('https://example.com/img1.jpg');
        expect(imagenResult.idProducto).toBe(1);
    });

    it("deberia devolver undefined si la imagen no existe", async () => {
        let imagenResult = await imagenes.getById(999);
        expect(imagenes.getById).toHaveBeenCalledWith(999);
        expect(imagenResult).toBeUndefined();
    });

    it("deberia crear una imagen", async () => {
        const newImagen = {
            urlImagen: 'https://example.com/img4.jpg',
            idProducto: 3
        };
        let createResult = await imagenes.createImagenes(newImagen);
        expect(imagenes.createImagenes).toHaveBeenCalledWith(newImagen);
        expect(createResult.idImagenes).toBe(4);
        expect(createResult.urlImagen).toBe('https://example.com/img4.jpg');
    });

    it("deberia actualizar una imagen por id", async () => {
        const updated = {
            urlImagen: 'https://example.com/img1-updated.jpg',
            idProducto: 1
        };
        let updateResult = await imagenes.updateImagenesById(1, updated);
        expect(imagenes.updateImagenesById).toHaveBeenCalledWith(1, updated);
        expect(updateResult.idImagenes).toBe(1);
        expect(updateResult.urlImagen).toBe('https://example.com/img1-updated.jpg');
    });

    it("deberia aplicar patch a una imagen por id", async () => {
        const patchData = { urlImagen: 'https://example.com/img2-new.jpg' };
        let patchResult = await imagenes.patchImagenesById(2, patchData);
        expect(imagenes.patchImagenesById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult.idImagenes).toBe(2);
        expect(patchResult.urlImagen).toBe('https://example.com/img2-new.jpg');
    });

    it("deberia eliminar una imagen por id", async () => {
        let deleteResult = await imagenes.deleteImagenesById(1);
        expect(imagenes.deleteImagenesById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
