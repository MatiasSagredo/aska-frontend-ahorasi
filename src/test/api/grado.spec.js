import grado from '../../api/objects/grado.js';

describe("Grado API", () => {
    let gradosMock = [
        { idGrado: 1, nombreGrado: 'blanco' },
        { idGrado: 2, nombreGrado: 'amarillo' },
        { idGrado: 3, nombreGrado: 'naranja' }
    ];
    let gradoMock = gradosMock[0];
    
    beforeEach(() => {
        spyOn(grado, 'getAll').and.returnValue(
            Promise.resolve(gradosMock)
        );
        spyOn(grado, 'getById').and.callFake((id) => {
            return Promise.resolve(gradosMock.find(g => g.idGrado === id));
        });
        spyOn(grado, 'createGrado').and.callFake((data) => {
            return Promise.resolve({ idGrado: 4, ...data });
        });
        spyOn(grado, 'updateGradoById').and.callFake((id, data) => {
            return Promise.resolve({ idGrado: id, ...data });
        });
        spyOn(grado, 'patchGradoById').and.callFake((id, data) => {
            return Promise.resolve({ idGrado: id, ...data });
        });
        spyOn(grado, 'deleteGradoById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los grados", async () => {
        let gradosResult = await grado.getAll();
        expect(grado.getAll).toHaveBeenCalledTimes(1);
        expect(gradosResult).toBe(gradosMock);
        expect(gradosResult.length).toBe(3);
    });

    it("deberia devolver un grado por id", async () => {
        let gradoResult = await grado.getById(1);
        expect(grado.getById).toHaveBeenCalledWith(1);
        expect(gradoResult).toBe(gradoMock);
        expect(gradoResult.nombreGrado).toBe('blanco');
    });

    it("deberia devolver undefined si el grado no existe", async () => {
        let gradoResult = await grado.getById(999);
        expect(grado.getById).toHaveBeenCalledWith(999);
        expect(gradoResult).toBeUndefined();
    });

    it("deberia crear un grado", async () => {
        const newGrado = { nombreGrado: 'rojo' };
        let createResult = await grado.createGrado(newGrado);
        expect(grado.createGrado).toHaveBeenCalledWith(newGrado);
        expect(createResult).toEqual({ idGrado: 4, nombreGrado: 'rojo' });
    });

    it("deberia actualizar un grado por id", async () => {
        const updated = { nombreGrado: 'blanco perla' };
        let updateResult = await grado.updateGradoById(1, updated);
        expect(grado.updateGradoById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idGrado: 1, nombreGrado: 'blanco perla' });
    });

    it("deberia aplicar patch a un grado por id", async () => {
        const patchData = { nombreGrado: 'amarillo claro' };
        let patchResult = await grado.patchGradoById(2, patchData);
        expect(grado.patchGradoById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idGrado: 2, nombreGrado: 'amarillo claro' });
    });

    it("deberia eliminar un grado por id", async () => {
        let deleteResult = await grado.deleteGradoById(1);
        expect(grado.deleteGradoById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
