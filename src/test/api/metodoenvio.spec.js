import metodoenvio from '../../api/objects/metodoenvio.js';

describe("Metodo Envio API", () => {
    let metodoEnviosMock = [
        { idMetodoEnvio: 1, metodoEnvio: 'a domicilio' },
        { idMetodoEnvio: 2, metodoEnvio: 'punto de entrega' },
        { idMetodoEnvio: 3, metodoEnvio: 'retiro en tienda' }
    ];
    let metodoEnvioMock = metodoEnviosMock[0];
    
    beforeEach(() => {
        spyOn(metodoenvio, 'getAll').and.returnValue(
            Promise.resolve(metodoEnviosMock)
        );
        spyOn(metodoenvio, 'getById').and.callFake((id) => {
            return Promise.resolve(metodoEnviosMock.find(m => m.idMetodoEnvio === id));
        });
        spyOn(metodoenvio, 'createMetodoEnvio').and.callFake((data) => {
            return Promise.resolve({ idMetodoEnvio: 4, ...data });
        });
        spyOn(metodoenvio, 'updateMetodoEnvioById').and.callFake((id, data) => {
            return Promise.resolve({ idMetodoEnvio: id, ...data });
        });
        spyOn(metodoenvio, 'patchMetodoEnvioById').and.callFake((id, data) => {
            return Promise.resolve({ idMetodoEnvio: id, ...data });
        });
        spyOn(metodoenvio, 'deleteMetodoEnvioById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los metodos de envio", async () => {
        let metodoEnviosResult = await metodoenvio.getAll();
        expect(metodoenvio.getAll).toHaveBeenCalledTimes(1);
        expect(metodoEnviosResult).toBe(metodoEnviosMock);
        expect(metodoEnviosResult.length).toBe(3);
    });

    it("deberia devolver un metodo de envio por id", async () => {
        let metodoEnvioResult = await metodoenvio.getById(1);
        expect(metodoenvio.getById).toHaveBeenCalledWith(1);
        expect(metodoEnvioResult).toBe(metodoEnvioMock);
        expect(metodoEnvioResult.metodoEnvio).toBe('a domicilio');
    });

    it("deberia devolver undefined si el metodo de envio no existe", async () => {
        let metodoEnvioResult = await metodoenvio.getById(999);
        expect(metodoenvio.getById).toHaveBeenCalledWith(999);
        expect(metodoEnvioResult).toBeUndefined();
    });

    it("deberia crear un metodo de envio", async () => {
        const newMetodoEnvio = { metodoEnvio: 'pickup en sucursal' };
        let createResult = await metodoenvio.createMetodoEnvio(newMetodoEnvio);
        expect(metodoenvio.createMetodoEnvio).toHaveBeenCalledWith(newMetodoEnvio);
        expect(createResult).toEqual({ idMetodoEnvio: 4, metodoEnvio: 'pickup en sucursal' });
    });

    it("deberia actualizar un metodo de envio por id", async () => {
        const updated = { metodoEnvio: 'envio express a domicilio' };
        let updateResult = await metodoenvio.updateMetodoEnvioById(1, updated);
        expect(metodoenvio.updateMetodoEnvioById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idMetodoEnvio: 1, metodoEnvio: 'envio express a domicilio' });
    });

    it("deberia aplicar patch a un metodo de envio por id", async () => {
        const patchData = { metodoEnvio: 'punto autorizado' };
        let patchResult = await metodoenvio.patchMetodoEnvioById(2, patchData);
        expect(metodoenvio.patchMetodoEnvioById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idMetodoEnvio: 2, metodoEnvio: 'punto autorizado' });
    });

    it("deberia eliminar un metodo de envio por id", async () => {
        let deleteResult = await metodoenvio.deleteMetodoEnvioById(1);
        expect(metodoenvio.deleteMetodoEnvioById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
