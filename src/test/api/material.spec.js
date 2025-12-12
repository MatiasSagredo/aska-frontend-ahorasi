import material from '../../api/objects/material.js';

describe("Material API", () => {
    let materialesMock = [
        { idMaterial: 1, nombreMaterial: 'madera' },
        { idMaterial: 2, nombreMaterial: 'algodon' },
        { idMaterial: 3, nombreMaterial: 'nylon' }
    ];
    let materialMock = materialesMock[0];
    
    beforeEach(() => {
        spyOn(material, 'getAll').and.returnValue(
            Promise.resolve(materialesMock)
        );
        spyOn(material, 'getById').and.callFake((id) => {
            return Promise.resolve(materialesMock.find(m => m.idMaterial === id));
        });
        spyOn(material, 'createMaterial').and.callFake((data) => {
            return Promise.resolve({ idMaterial: 4, ...data });
        });
        spyOn(material, 'updateMaterialById').and.callFake((id, data) => {
            return Promise.resolve({ idMaterial: id, ...data });
        });
        spyOn(material, 'patchMaterialById').and.callFake((id, data) => {
            return Promise.resolve({ idMaterial: id, ...data });
        });
        spyOn(material, 'deleteMaterialById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los materiales", async () => {
        let materialesResult = await material.getAll();
        expect(material.getAll).toHaveBeenCalledTimes(1);
        expect(materialesResult).toBe(materialesMock);
        expect(materialesResult.length).toBe(3);
    });

    it("deberia devolver un material por id", async () => {
        let materialResult = await material.getById(1);
        expect(material.getById).toHaveBeenCalledWith(1);
        expect(materialResult).toBe(materialMock);
        expect(materialResult.nombreMaterial).toBe('madera');
    });

    it("deberia devolver undefined si el material no existe", async () => {
        let materialResult = await material.getById(999);
        expect(material.getById).toHaveBeenCalledWith(999);
        expect(materialResult).toBeUndefined();
    });

    it("deberia crear un material", async () => {
        const newMaterial = { nombreMaterial: 'poliester' };
        let createResult = await material.createMaterial(newMaterial);
        expect(material.createMaterial).toHaveBeenCalledWith(newMaterial);
        expect(createResult).toEqual({ idMaterial: 4, nombreMaterial: 'poliester' });
    });

    it("deberia actualizar un material por id", async () => {
        const updated = { nombreMaterial: 'madera pino' };
        let updateResult = await material.updateMaterialById(1, updated);
        expect(material.updateMaterialById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idMaterial: 1, nombreMaterial: 'madera pino' });
    });

    it("deberia aplicar patch a un material por id", async () => {
        const patchData = { nombreMaterial: 'algodon organico' };
        let patchResult = await material.patchMaterialById(2, patchData);
        expect(material.patchMaterialById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idMaterial: 2, nombreMaterial: 'algodon organico' });
    });

    it("deberia eliminar un material por id", async () => {
        let deleteResult = await material.deleteMaterialById(1);
        expect(material.deleteMaterialById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
