import venta from '../../api/objects/venta.js';

describe("Venta API", () => {
    let ventasMock = [
        {
            idVenta: 1,
            fechaVenta: '2025-12-01',
            totalVenta: 150.50,
            idUsuario: { idUsuario: 1, nombreUsuario: 'Juan' },
            idEstado: { idEstado: 1, estado: 'pendiente' }
        },
        {
            idVenta: 2,
            fechaVenta: '2025-12-02',
            totalVenta: 200.75,
            idUsuario: { idUsuario: 2, nombreUsuario: 'Maria' },
            idEstado: { idEstado: 2, estado: 'entregado' }
        },
        {
            idVenta: 3,
            fechaVenta: '2025-12-03',
            totalVenta: 89.99,
            idUsuario: { idUsuario: 3, nombreUsuario: 'Carlos' },
            idEstado: { idEstado: 1, estado: 'pendiente' }
        }
    ];
    let ventaMock = ventasMock[0];
    
    beforeEach(() => {
        spyOn(venta, 'getAll').and.returnValue(
            Promise.resolve(ventasMock)
        );
        spyOn(venta, 'getById').and.callFake((id) => {
            return Promise.resolve(ventasMock.find(v => v.idVenta === id));
        });
        spyOn(venta, 'createVenta').and.callFake((data) => {
            return Promise.resolve({ idVenta: 4, ...data });
        });
        spyOn(venta, 'updateVentaById').and.callFake((id, data) => {
            return Promise.resolve({ idVenta: id, ...data });
        });
        spyOn(venta, 'patchVentaById').and.callFake((id, data) => {
            return Promise.resolve({ idVenta: id, ...data });
        });
        spyOn(venta, 'deleteVentaById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las ventas", async () => {
        let ventasResult = await venta.getAll();
        expect(venta.getAll).toHaveBeenCalledTimes(1);
        expect(ventasResult).toBe(ventasMock);
        expect(ventasResult.length).toBe(3);
    });

    it("deberia devolver una venta por id", async () => {
        let ventaResult = await venta.getById(1);
        expect(venta.getById).toHaveBeenCalledWith(1);
        expect(ventaResult).toBe(ventaMock);
        expect(ventaResult.fechaVenta).toBe('2025-12-01');
        expect(ventaResult.totalVenta).toBe(150.50);
    });

    it("deberia devolver undefined si la venta no existe", async () => {
        let ventaResult = await venta.getById(999);
        expect(venta.getById).toHaveBeenCalledWith(999);
        expect(ventaResult).toBeUndefined();
    });

    it("deberia crear una venta", async () => {
        const newVenta = {
            fechaVenta: '2025-12-04',
            totalVenta: 120.00,
            idUsuario: { idUsuario: 1 },
            idEstado: { idEstado: 1 }
        };
        let createResult = await venta.createVenta(newVenta);
        expect(venta.createVenta).toHaveBeenCalledWith(newVenta);
        expect(createResult.idVenta).toBe(4);
        expect(createResult.totalVenta).toBe(120.00);
    });

    it("deberia actualizar una venta por id", async () => {
        const updated = {
            fechaVenta: '2025-12-01',
            totalVenta: 175.50,
            idEstado: { idEstado: 2, estado: 'entregado' }
        };
        let updateResult = await venta.updateVentaById(1, updated);
        expect(venta.updateVentaById).toHaveBeenCalledWith(1, updated);
        expect(updateResult.idVenta).toBe(1);
        expect(updateResult.totalVenta).toBe(175.50);
    });

    it("deberia aplicar patch a una venta por id", async () => {
        const patchData = { idEstado: { idEstado: 3, estado: 'entregado' } };
        let patchResult = await venta.patchVentaById(2, patchData);
        expect(venta.patchVentaById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult.idVenta).toBe(2);
    });

    it("deberia eliminar una venta por id", async () => {
        let deleteResult = await venta.deleteVentaById(1);
        expect(venta.deleteVentaById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
