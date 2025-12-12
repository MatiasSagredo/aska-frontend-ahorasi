import direcciones from '../../api/objects/direcciones.js';

describe("Direcciones API", () => {
    let direccionesMock = [
        {
            idDirecciones: 1,
            nombreCalle: 'Calle 1',
            idComuna: {
                idComuna: 1,
                nombreComuna: 'Arica',
                idRegion: {
                    idRegion: 1,
                    nombreRegion: 'Región de Arica y Parinacota'
                }
            },
            idUsuario: {
                idUsuario: 1,
                nombreUsuario: 'Juan',
                emailUsuario: 'juan@example.com',
                idRol: { idRol: 2 }
            }
        },
        {
            idDirecciones: 2,
            nombreCalle: 'Calle 2',
            idComuna: {
                idComuna: 2,
                nombreComuna: 'Putre',
                idRegion: {
                    idRegion: 1,
                    nombreRegion: 'Región de Arica y Parinacota'
                }
            },
            idUsuario: {
                idUsuario: 2,
                nombreUsuario: 'Maria',
                emailUsuario: 'maria@example.com',
                idRol: { idRol: 2 }
            }
        }
    ];
    let direccionMock = direccionesMock[0];
    
    beforeEach(() => {
        spyOn(direcciones, 'getAll').and.returnValue(
            Promise.resolve(direccionesMock)
        );
        spyOn(direcciones, 'getById').and.callFake((id) => {
            return Promise.resolve(direccionesMock.find(d => d.idDirecciones === id));
        });
        spyOn(direcciones, 'createDirecciones').and.callFake((data) => {
            return Promise.resolve({ idDirecciones: 3, ...data });
        });
        spyOn(direcciones, 'updateDireccionesById').and.callFake((id, data) => {
            return Promise.resolve({ idDirecciones: id, ...data });
        });
        spyOn(direcciones, 'patchDireccionesById').and.callFake((id, data) => {
            return Promise.resolve({ idDirecciones: id, ...data });
        });
        spyOn(direcciones, 'deleteDireccionesById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las direcciones", async () => {
        let direccionesResult = await direcciones.getAll();
        expect(direcciones.getAll).toHaveBeenCalledTimes(1);
        expect(direccionesResult).toBe(direccionesMock);
        expect(direccionesResult.length).toBe(2);
    });

    it("deberia devolver una direccion por id", async () => {
        let direccionResult = await direcciones.getById(1);
        expect(direcciones.getById).toHaveBeenCalledWith(1);
        expect(direccionResult).toBe(direccionMock);
        expect(direccionResult.nombreCalle).toBe('Calle 1');
        expect(direccionResult.idComuna.nombreComuna).toBe('Arica');
    });

    it("deberia devolver undefined si la direccion no existe", async () => {
        let direccionResult = await direcciones.getById(999);
        expect(direcciones.getById).toHaveBeenCalledWith(999);
        expect(direccionResult).toBeUndefined();
    });

    it("deberia crear una direccion", async () => {
        const newDireccion = {
            nombreCalle: 'Calle 3',
            idComuna: { idComuna: 1 },
            idUsuario: { idUsuario: 1 }
        };
        let createResult = await direcciones.createDirecciones(newDireccion);
        expect(direcciones.createDirecciones).toHaveBeenCalledWith(newDireccion);
        expect(createResult.idDirecciones).toBe(3);
        expect(createResult.nombreCalle).toBe('Calle 3');
    });

    it("deberia actualizar una direccion por id", async () => {
        const updated = {
            nombreCalle: 'Calle 1 actualizada',
            idComuna: { idComuna: 1 }
        };
        let updateResult = await direcciones.updateDireccionesById(1, updated);
        expect(direcciones.updateDireccionesById).toHaveBeenCalledWith(1, updated);
        expect(updateResult.idDirecciones).toBe(1);
        expect(updateResult.nombreCalle).toBe('Calle 1 actualizada');
    });

    it("deberia aplicar patch a una direccion por id", async () => {
        const patchData = { nombreCalle: 'Avenida 2' };
        let patchResult = await direcciones.patchDireccionesById(2, patchData);
        expect(direcciones.patchDireccionesById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult.idDirecciones).toBe(2);
        expect(patchResult.nombreCalle).toBe('Avenida 2');
    });

    it("deberia eliminar una direccion por id", async () => {
        let deleteResult = await direcciones.deleteDireccionesById(1);
        expect(direcciones.deleteDireccionesById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
