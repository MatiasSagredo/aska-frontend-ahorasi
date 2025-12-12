import diciplina from '../../api/objects/diciplina.js';

describe("Diciplina API", () => {
    let diciplinasMock = [
        { idDiciplina: 1, nombreDiciplina: 'karate' },
        { idDiciplina: 2, nombreDiciplina: 'taekwondo' },
        { idDiciplina: 3, nombreDiciplina: 'judo' }
    ];
    let diciplinaMock = diciplinasMock[0];
    
    beforeEach(() => {
        spyOn(diciplina, 'getAll').and.returnValue(
            Promise.resolve(diciplinasMock)
        );
        spyOn(diciplina, 'getById').and.callFake((id) => {
            return Promise.resolve(diciplinasMock.find(d => d.idDiciplina === id));
        });
        spyOn(diciplina, 'createDiciplina').and.callFake((data) => {
            return Promise.resolve({ idDiciplina: 4, ...data });
        });
        spyOn(diciplina, 'updateDiciplinaById').and.callFake((id, data) => {
            return Promise.resolve({ idDiciplina: id, ...data });
        });
        spyOn(diciplina, 'patchDiciplinaById').and.callFake((id, data) => {
            return Promise.resolve({ idDiciplina: id, ...data });
        });
        spyOn(diciplina, 'deleteDiciplinaById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todas las diciplinas", async () => {
        let diciplinasResult = await diciplina.getAll();
        expect(diciplina.getAll).toHaveBeenCalledTimes(1);
        expect(diciplinasResult).toBe(diciplinasMock);
        expect(diciplinasResult.length).toBe(3);
    });

    it("deberia devolver una diciplina por id", async () => {
        let diciplinaResult = await diciplina.getById(1);
        expect(diciplina.getById).toHaveBeenCalledWith(1);
        expect(diciplinaResult).toBe(diciplinaMock);
        expect(diciplinaResult.nombreDiciplina).toBe('karate');
    });

    it("deberia devolver undefined si la diciplina no existe", async () => {
        let diciplinaResult = await diciplina.getById(999);
        expect(diciplina.getById).toHaveBeenCalledWith(999);
        expect(diciplinaResult).toBeUndefined();
    });

    it("deberia crear una diciplina", async () => {
        const newDiciplina = { nombreDiciplina: 'muay thai' };
        let createResult = await diciplina.createDiciplina(newDiciplina);
        expect(diciplina.createDiciplina).toHaveBeenCalledWith(newDiciplina);
        expect(createResult).toEqual({ idDiciplina: 4, nombreDiciplina: 'muay thai' });
    });

    it("deberia actualizar una diciplina por id", async () => {
        const updated = { nombreDiciplina: 'karate kyokushin' };
        let updateResult = await diciplina.updateDiciplinaById(1, updated);
        expect(diciplina.updateDiciplinaById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idDiciplina: 1, nombreDiciplina: 'karate kyokushin' });
    });

    it("deberia aplicar patch a una diciplina por id", async () => {
        const patchData = { nombreDiciplina: 'taekwondo olimpico' };
        let patchResult = await diciplina.patchDiciplinaById(2, patchData);
        expect(diciplina.patchDiciplinaById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idDiciplina: 2, nombreDiciplina: 'taekwondo olimpico' });
    });

    it("deberia eliminar una diciplina por id", async () => {
        let deleteResult = await diciplina.deleteDiciplinaById(1);
        expect(diciplina.deleteDiciplinaById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
