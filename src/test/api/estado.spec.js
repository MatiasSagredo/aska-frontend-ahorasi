import Estado from '../../api/objects/estado.js';

describe("Estado API", () => {
    let estadosMock = [
        { idEstado: 1, estado: 'pendiente' },
        { idEstado: 2, estado: 'en camino' },
        { idEstado: 3, estado: 'entregado' }
    ];
    let estadoMock = estadosMock[0];
    
    beforeEach(() => {
        spyOn(Estado, 'getAll').and.returnValue(
            Promise.resolve(estadosMock)
        );
        spyOn(Estado, 'getById').and.callFake((id) => {
            return Promise.resolve(estadosMock.find(e => e.idEstado === id));
        });
        spyOn(Estado, 'createEstado').and.callFake((data) => {
            return Promise.resolve({ idEstado: 4, ...data });
        });
        spyOn(Estado, 'updateEstadoById').and.callFake((id, data) => {
            return Promise.resolve({ idEstado: id, ...data });
        });
        spyOn(Estado, 'patchEstadoById').and.callFake((id, data) => {
            return Promise.resolve({ idEstado: id, ...data });
        });
        spyOn(Estado, 'deleteEstadoById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los estados", async () => {
        let estadosResult = await Estado.getAll();
        expect(Estado.getAll).toHaveBeenCalledTimes(1);
        expect(estadosResult).toBe(estadosMock);
        expect(estadosResult.length).toBe(3);
    });

    it("deberia devolver un estado por id", async () => {
        let estadoResult = await Estado.getById(1);
        expect(Estado.getById).toHaveBeenCalledWith(1);
        expect(estadoResult).toBe(estadoMock);
        expect(estadoResult.estado).toBe('pendiente');
    });

    it("deberia devolver undefined si el estado no existe", async () => {
        let estadoResult = await Estado.getById(999);
        expect(Estado.getById).toHaveBeenCalledWith(999);
        expect(estadoResult).toBeUndefined();
    });

    it("deberia crear un estado", async () => {
        const newEstado = { estado: 'cancelado' };
        let createResult = await Estado.createEstado(newEstado);
        expect(Estado.createEstado).toHaveBeenCalledWith(newEstado);
        expect(createResult).toEqual({ idEstado: 4, estado: 'cancelado' });
    });

    it("deberia actualizar un estado por id", async () => {
        const updated = { estado: 'pendiente de aprobacion' };
        let updateResult = await Estado.updateEstadoById(1, updated);
        expect(Estado.updateEstadoById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idEstado: 1, estado: 'pendiente de aprobacion' });
    });

    it("deberia aplicar patch a un estado por id", async () => {
        const patchData = { estado: 'en transito' };
        let patchResult = await Estado.patchEstadoById(2, patchData);
        expect(Estado.patchEstadoById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idEstado: 2, estado: 'en transito' });
    });

    it("deberia eliminar un estado por id", async () => {
        let deleteResult = await Estado.deleteEstadoById(1);
        expect(Estado.deleteEstadoById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
