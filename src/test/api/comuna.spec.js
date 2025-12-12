import Comuna from '../../api/objects/comuna.js';

describe("Comuna API", () => {
    let comunasMock = [
        {
            idComuna: 1,
            nombreComuna: 'Arica',
            idRegion: {
                idRegion: 1,
                nombreRegion: 'Región de Arica y Parinacota'
            }
        },
        {
            idComuna: 2,
            nombreComuna: 'Putre',
            idRegion: {
                idRegion: 1,
                nombreRegion: 'Región de Arica y Parinacota'
            }
        },
        {
            idComuna: 3,
            nombreComuna: 'General Lagos',
            idRegion: {
                idRegion: 1,
                nombreRegion: 'Región de Arica y Parinacota'
            }
        }
    ];
    let comunaMock = comunasMock[0];
    
    beforeEach(() => {
        spyOn(Comuna, 'getAll').and.returnValue(
            Promise.resolve(comunasMock)
        );
        spyOn(Comuna, 'getById').and.callFake((id) => {
            return Promise.resolve(comunasMock.find(c => c.idComuna === id));
        });
        spyOn(Comuna, 'createComuna').and.callFake((data) => {
            return Promise.resolve({ idComuna: 4, ...data });
        });
        spyOn(Comuna, 'updateComunaById').and.callFake((id, data) => {
            return Promise.resolve({ idComuna: id, ...data });
        });
        spyOn(Comuna, 'patchComunaById').and.callFake((id, data) => {
            return Promise.resolve({ idComuna: id, ...data });
        });
        spyOn(Comuna, 'deleteComunaById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las comunas", async () => {
        let comunasResult = await Comuna.getAll();
        expect(Comuna.getAll).toHaveBeenCalledTimes(1);
        expect(comunasResult).toBe(comunasMock);
        expect(comunasResult.length).toBe(3);
    });

    it("deberia devolver una comuna por id", async () => {
        let comunaResult = await Comuna.getById(1);
        expect(Comuna.getById).toHaveBeenCalledWith(1);
        expect(comunaResult).toBe(comunaMock);
        expect(comunaResult.nombreComuna).toBe('Arica');
        expect(comunaResult.idRegion.nombreRegion).toBe('Región de Arica y Parinacota');
    });

    it("deberia devolver undefined si la comuna no existe", async () => {
        let comunaResult = await Comuna.getById(999);
        expect(Comuna.getById).toHaveBeenCalledWith(999);
        expect(comunaResult).toBeUndefined();
    });

    it("deberia crear una comuna", async () => {
        const newComuna = {
            nombreComuna: 'Nueva comuna',
            idRegion: { idRegion: 1 }
        };
        let createResult = await Comuna.createComuna(newComuna);
        expect(Comuna.createComuna).toHaveBeenCalledWith(newComuna);
        expect(createResult.idComuna).toBe(4);
        expect(createResult.nombreComuna).toBe('Nueva comuna');
    });

    it("deberia actualizar una comuna por id", async () => {
        const updated = {
            nombreComuna: 'Arica actualizada',
            idRegion: { idRegion: 1 }
        };
        let updateResult = await Comuna.updateComunaById(1, updated);
        expect(Comuna.updateComunaById).toHaveBeenCalledWith(1, updated);
        expect(updateResult.idComuna).toBe(1);
        expect(updateResult.nombreComuna).toBe('Arica actualizada');
    });

    it("deberia aplicar patch a una comuna por id", async () => {
        const patchData = { nombreComuna: 'Putre alterado' };
        let patchResult = await Comuna.patchComunaById(2, patchData);
        expect(Comuna.patchComunaById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult.idComuna).toBe(2);
        expect(patchResult.nombreComuna).toBe('Putre alterado');
    });

    it("deberia eliminar una comuna por id", async () => {
        let deleteResult = await Comuna.deleteComunaById(1);
        expect(Comuna.deleteComunaById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
