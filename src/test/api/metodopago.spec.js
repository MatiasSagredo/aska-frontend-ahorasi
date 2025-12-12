import metodopago from '../../api/objects/metodopago.js';

describe("Metodo Pago API", () => {
    let metodoPagosMock = [
        { idMetodoPago: 1, metodoPago: 'Tarjeta de credito' },
        { idMetodoPago: 2, metodoPago: 'Tarjeta de debito' },
        { idMetodoPago: 3, metodoPago: 'Transferencia bancaria' }
    ];
    let metodoPagoMock = metodoPagosMock[0];
    
    beforeEach(() => {
        spyOn(metodopago, 'getAll').and.returnValue(
            Promise.resolve(metodoPagosMock)
        );
        spyOn(metodopago, 'getById').and.callFake((id) => {
            return Promise.resolve(metodoPagosMock.find(m => m.idMetodoPago === id));
        });
        spyOn(metodopago, 'createMetodoPago').and.callFake((data) => {
            return Promise.resolve({ idMetodoPago: 4, ...data });
        });
        spyOn(metodopago, 'updateMetodoPagoById').and.callFake((id, data) => {
            return Promise.resolve({ idMetodoPago: id, ...data });
        });
        spyOn(metodopago, 'patchMetodoPagoById').and.callFake((id, data) => {
            return Promise.resolve({ idMetodoPago: id, ...data });
        });
        spyOn(metodopago, 'deleteMetodoPagoById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los metodos de pago", async () => {
        let metodoPagosResult = await metodopago.getAll();
        expect(metodopago.getAll).toHaveBeenCalledTimes(1);
        expect(metodoPagosResult).toBe(metodoPagosMock);
        expect(metodoPagosResult.length).toBe(3);
    });

    it("deberia devolver un metodo de pago por id", async () => {
        let metodoPagoResult = await metodopago.getById(1);
        expect(metodopago.getById).toHaveBeenCalledWith(1);
        expect(metodoPagoResult).toBe(metodoPagoMock);
        expect(metodoPagoResult.metodoPago).toBe('Tarjeta de credito');
    });

    it("deberia devolver undefined si el metodo de pago no existe", async () => {
        let metodoPagoResult = await metodopago.getById(999);
        expect(metodopago.getById).toHaveBeenCalledWith(999);
        expect(metodoPagoResult).toBeUndefined();
    });

    it("deberia crear un metodo de pago", async () => {
        const newMetodoPago = { metodoPago: 'Billetera digital' };
        let createResult = await metodopago.createMetodoPago(newMetodoPago);
        expect(metodopago.createMetodoPago).toHaveBeenCalledWith(newMetodoPago);
        expect(createResult).toEqual({ idMetodoPago: 4, metodoPago: 'Billetera digital' });
    });

    it("deberia actualizar un metodo de pago por id", async () => {
        const updated = { metodoPago: 'Tarjeta de credito visa' };
        let updateResult = await metodopago.updateMetodoPagoById(1, updated);
        expect(metodopago.updateMetodoPagoById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idMetodoPago: 1, metodoPago: 'Tarjeta de credito visa' });
    });

    it("deberia aplicar patch a un metodo de pago por id", async () => {
        const patchData = { metodoPago: 'Tarjeta de debito mastercard' };
        let patchResult = await metodopago.patchMetodoPagoById(2, patchData);
        expect(metodopago.patchMetodoPagoById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idMetodoPago: 2, metodoPago: 'Tarjeta de debito mastercard' });
    });

    it("deberia eliminar un metodo de pago por id", async () => {
        let deleteResult = await metodopago.deleteMetodoPagoById(1);
        expect(metodopago.deleteMetodoPagoById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
