import Region from '../../api/objects/region.js';

describe("Region API", () => {
    let regionesMock = [
        { idRegion: 1, nombreRegion: 'Región de Arica y Parinacota' },
        { idRegion: 2, nombreRegion: 'Región de Tarapacá' },
        { idRegion: 7, nombreRegion: 'Región Metropolitana de Santiago' }
    ];
    let regionMock = regionesMock[0];
    
    beforeEach(() => {
        spyOn(Region, 'getAll').and.returnValue(
            Promise.resolve(regionesMock)
        );
        spyOn(Region, 'getById').and.callFake((id) => {
            return Promise.resolve(regionesMock.find(r => r.idRegion === id));
        });
        spyOn(Region, 'createRegion').and.callFake((data) => {
            return Promise.resolve({ idRegion: 17, ...data });
        });
        spyOn(Region, 'updateRegionById').and.callFake((id, data) => {
            return Promise.resolve({ idRegion: id, ...data });
        });
        spyOn(Region, 'patchRegionById').and.callFake((id, data) => {
            return Promise.resolve({ idRegion: id, ...data });
        });
        spyOn(Region, 'deleteRegionById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las regiones", async () => {
        let regionesResult = await Region.getAll();
        expect(Region.getAll).toHaveBeenCalledTimes(1);
        expect(regionesResult).toBe(regionesMock);
        expect(regionesResult.length).toBe(3);
    });

    it("deberia devolver una region por id", async () => {
        let regionResult = await Region.getById(1);
        expect(Region.getById).toHaveBeenCalledWith(1);
        expect(regionResult).toBe(regionMock);
        expect(regionResult.nombreRegion).toBe('Región de Arica y Parinacota');
    });

    it("deberia devolver undefined si la region no existe", async () => {
        let regionResult = await Region.getById(999);
        expect(Region.getById).toHaveBeenCalledWith(999);
        expect(regionResult).toBeUndefined();
    });

    it("deberia crear una region", async () => {
        const newRegion = { nombreRegion: 'Región ficticia' };
        let createResult = await Region.createRegion(newRegion);
        expect(Region.createRegion).toHaveBeenCalledWith(newRegion);
        expect(createResult).toEqual({ idRegion: 17, nombreRegion: 'Región ficticia' });
    });

    it("deberia actualizar una region por id", async () => {
        const updated = { nombreRegion: 'Región de Arica actualizada' };
        let updateResult = await Region.updateRegionById(1, updated);
        expect(Region.updateRegionById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idRegion: 1, nombreRegion: 'Región de Arica actualizada' });
    });

    it("deberia aplicar patch a una region por id", async () => {
        const patchData = { nombreRegion: 'Región central' };
        let patchResult = await Region.patchRegionById(7, patchData);
        expect(Region.patchRegionById).toHaveBeenCalledWith(7, patchData);
        expect(patchResult).toEqual({ idRegion: 7, nombreRegion: 'Región central' });
    });

    it("deberia eliminar una region por id", async () => {
        let deleteResult = await Region.deleteRegionById(1);
        expect(Region.deleteRegionById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
