import talla from '../../api/objects/talla.js';

describe("Talla API", () => {
    let tallasMock = [
        { idTalla: 1, nombreTalla: 'S' },
        { idTalla: 2, nombreTalla: 'M' },
        { idTalla: 3, nombreTalla: 'L' }
    ];
    let tallaMock = tallasMock[0];
    
    beforeEach(() => {
        spyOn(talla, 'getAll').and.returnValue(
            Promise.resolve(tallasMock)
        );
        spyOn(talla, 'getById').and.callFake((id) => {
            return Promise.resolve(tallasMock.find(t => t.idTalla === id));
        });
        spyOn(talla, 'createTalla').and.callFake((data) => {
            return Promise.resolve({ idTalla: 4, ...data });
        });
        spyOn(talla, 'updateTallaById').and.callFake((id, data) => {
            return Promise.resolve({ idTalla: id, ...data });
        });
        spyOn(talla, 'patchTallaById').and.callFake((id, data) => {
            return Promise.resolve({ idTalla: id, ...data });
        });
        spyOn(talla, 'deleteTallaById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las tallas", async () => {
        let tallasResult = await talla.getAll();
        expect(talla.getAll).toHaveBeenCalledTimes(1);
        expect(tallasResult).toBe(tallasMock);
        expect(tallasResult.length).toBe(3);
    });

    it("deberia devolver una talla por id", async () => {
        let tallaResult = await talla.getById(1);
        expect(talla.getById).toHaveBeenCalledWith(1);
        expect(tallaResult).toBe(tallaMock);
        expect(tallaResult.nombreTalla).toBe('S');
    });

    it("deberia devolver undefined si la talla no existe", async () => {
        let tallaResult = await talla.getById(999);
        expect(talla.getById).toHaveBeenCalledWith(999);
        expect(tallaResult).toBeUndefined();
    });

    it("deberia crear una talla", async () => {
        const newTalla = { nombreTalla: 'XL' };
        let createResult = await talla.createTalla(newTalla);
        expect(talla.createTalla).toHaveBeenCalledWith(newTalla);
        expect(createResult).toEqual({ idTalla: 4, nombreTalla: 'XL' });
    });

    it("deberia actualizar una talla por id", async () => {
        const updated = { nombreTalla: 'Small' };
        let updateResult = await talla.updateTallaById(1, updated);
        expect(talla.updateTallaById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idTalla: 1, nombreTalla: 'Small' });
    });

    it("deberia aplicar patch a una talla por id", async () => {
        const patchData = { nombreTalla: 'Medium' };
        let patchResult = await talla.patchTallaById(2, patchData);
        expect(talla.patchTallaById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idTalla: 2, nombreTalla: 'Medium' });
    });

    it("deberia eliminar una talla por id", async () => {
        let deleteResult = await talla.deleteTallaById(1);
        expect(talla.deleteTallaById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
