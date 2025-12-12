import marca from '../../api/objects/marca.js';

describe("Marca API", () => {
    let marcasMock = [
        { idMarca: 1, nombreMarca: 'adidas' },
        { idMarca: 2, nombreMarca: 'nike' },
        { idMarca: 3, nombreMarca: 'puma' }
    ];
    let marcaMock = marcasMock[0];
    
    beforeEach(() => {
        spyOn(marca, 'getAll').and.returnValue(
            Promise.resolve(marcasMock)
        );
        spyOn(marca, 'getById').and.callFake((id) => {
            return Promise.resolve(marcasMock.find(m => m.idMarca === id));
        });
        spyOn(marca, 'createMarca').and.callFake((data) => {
            return Promise.resolve({ idMarca: 4, ...data });
        });
        spyOn(marca, 'updateMarcaById').and.callFake((id, data) => {
            return Promise.resolve({ idMarca: id, ...data });
        });
        spyOn(marca, 'patchMarcaById').and.callFake((id, data) => {
            return Promise.resolve({ idMarca: id, ...data });
        });
        spyOn(marca, 'deleteMarcaById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las marcas", async () => {
        let marcasResult = await marca.getAll();
        expect(marca.getAll).toHaveBeenCalledTimes(1);
        expect(marcasResult).toBe(marcasMock);
        expect(marcasResult.length).toBe(3);
    });

    it("deberia devolver una marca por id", async () => {
        let marcaResult = await marca.getById(1);
        expect(marca.getById).toHaveBeenCalledWith(1);
        expect(marcaResult).toBe(marcaMock);
        expect(marcaResult.nombreMarca).toBe('adidas');
    });

    it("deberia devolver undefined si la marca no existe", async () => {
        let marcaResult = await marca.getById(999);
        expect(marca.getById).toHaveBeenCalledWith(999);
        expect(marcaResult).toBeUndefined();
    });

    it("deberia crear una marca", async () => {
        const newMarca = { nombreMarca: 'reebok' };
        let createResult = await marca.createMarca(newMarca);
        expect(marca.createMarca).toHaveBeenCalledWith(newMarca);
        expect(createResult).toEqual({ idMarca: 4, nombreMarca: 'reebok' });
    });

    it("deberia actualizar una marca por id", async () => {
        const updated = { nombreMarca: 'adidas sportswear' };
        let updateResult = await marca.updateMarcaById(1, updated);
        expect(marca.updateMarcaById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idMarca: 1, nombreMarca: 'adidas sportswear' });
    });

    it("deberia aplicar patch a una marca por id", async () => {
        const patchData = { nombreMarca: 'nike performance' };
        let patchResult = await marca.patchMarcaById(2, patchData);
        expect(marca.patchMarcaById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idMarca: 2, nombreMarca: 'nike performance' });
    });

    it("deberia eliminar una marca por id", async () => {
        let deleteResult = await marca.deleteMarcaById(1);
        expect(marca.deleteMarcaById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
