import colores from '../../api/objects/color.js';

describe("Color API", () => {
    let coloresMock = [
        { idColor: 1, nombreColor: 'Rojo' },
        { idColor: 2, nombreColor: 'Azul' },
        { idColor: 3, nombreColor: 'Verde' }
    ];
    let colorMock = coloresMock[0];
    
    beforeEach(() => {
        spyOn(colores, 'getAll').and.returnValue(
            Promise.resolve(coloresMock)
        );
        spyOn(colores, 'getById').and.callFake((id) => {
            return Promise.resolve(coloresMock.find(c => c.idColor === id));
        });
        spyOn(colores, 'createColor').and.callFake((data) => {
            return Promise.resolve({ idColor: 4, ...data });
        });
        spyOn(colores, 'updateColorById').and.callFake((id, data) => {
            return Promise.resolve({ idColor: id, ...data });
        });
        spyOn(colores, 'patchColorById').and.callFake((id, data) => {
            return Promise.resolve({ idColor: id, ...data });
        });
        spyOn(colores, 'deleteColorById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los colores", async () => {
        let coloresResult = await colores.getAll();
        expect(colores.getAll).toHaveBeenCalledTimes(1);
        expect(coloresResult).toBe(coloresMock);
        expect(coloresResult.length).toBe(3);
    });

    it("deberia devolver un color por id", async () => {
        let colorResult = await colores.getById(1);
        expect(colores.getById).toHaveBeenCalledWith(1);
        expect(colorResult).toBe(colorMock);
        expect(colorResult.nombreColor).toBe('Rojo');
    });

    it("deberia devolver undefined si el color no existe", async () => {
        let colorResult = await colores.getById(999);
        expect(colores.getById).toHaveBeenCalledWith(999);
        expect(colorResult).toBeUndefined();
    });

    it("deberia crear un color", async () => {
        const newColor = { nombreColor: 'Amarillo' };
        let createResult = await colores.createColor(newColor);
        expect(colores.createColor).toHaveBeenCalledWith(newColor);
        expect(createResult).toEqual({ idColor: 4, nombreColor: 'Amarillo' });
    });

    it("deberia actualizar un color por id", async () => {
        const updated = { nombreColor: 'Rojo Oscuro' };
        let updateResult = await colores.updateColorById(1, updated);
        expect(colores.updateColorById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idColor: 1, nombreColor: 'Rojo Oscuro' });
    });

    it("deberia aplicar patch a un color por id", async () => {
        const patchData = { nombreColor: 'Rojo Claro' };
        let patchResult = await colores.patchColorById(2, patchData);
        expect(colores.patchColorById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idColor: 2, nombreColor: 'Rojo Claro' });
    });

    it("deberia eliminar un color por id", async () => {
        let deleteResult = await colores.deleteColorById(1);
        expect(colores.deleteColorById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
