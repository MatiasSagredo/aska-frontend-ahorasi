import rol from '../../api/objects/rol.js';

describe("Rol API", () => {
    let rolesMock = [
        { idRol: 1, nombreRol: 'Administrador' },
        { idRol: 2, nombreRol: 'Usuario' },
        { idRol: 3, nombreRol: 'Moderador' }
    ];
    let rolMock = rolesMock[0];
    
    beforeEach(() => {
        spyOn(rol, 'getAll').and.returnValue(
            Promise.resolve(rolesMock)
        );
        spyOn(rol, 'getById').and.callFake((id) => {
            return Promise.resolve(rolesMock.find(r => r.idRol === id));
        });
        spyOn(rol, 'createRol').and.callFake((data) => {
            return Promise.resolve({ idRol: 4, ...data });
        });
        spyOn(rol, 'updateRolById').and.callFake((id, data) => {
            return Promise.resolve({ idRol: id, ...data });
        });
        spyOn(rol, 'patchRolById').and.callFake((id, data) => {
            return Promise.resolve({ idRol: id, ...data });
        });
        spyOn(rol, 'deleteRolById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los roles", async () => {
        let rolesResult = await rol.getAll();
        expect(rol.getAll).toHaveBeenCalledTimes(1);
        expect(rolesResult).toBe(rolesMock);
        expect(rolesResult.length).toBe(3);
    });

    it("deberia devolver un rol por id", async () => {
        let rolResult = await rol.getById(1);
        expect(rol.getById).toHaveBeenCalledWith(1);
        expect(rolResult).toBe(rolMock);
        expect(rolResult.nombreRol).toBe('Administrador');
    });

    it("deberia devolver undefined si el rol no existe", async () => {
        let rolResult = await rol.getById(999);
        expect(rol.getById).toHaveBeenCalledWith(999);
        expect(rolResult).toBeUndefined();
    });

    it("deberia crear un rol", async () => {
        const newRol = { nombreRol: 'Editor' };
        let createResult = await rol.createRol(newRol);
        expect(rol.createRol).toHaveBeenCalledWith(newRol);
        expect(createResult).toEqual({ idRol: 4, nombreRol: 'Editor' });
    });

    it("deberia actualizar un rol por id", async () => {
        const updated = { nombreRol: 'Admin Super' };
        let updateResult = await rol.updateRolById(1, updated);
        expect(rol.updateRolById).toHaveBeenCalledWith(1, updated);
        expect(updateResult).toEqual({ idRol: 1, nombreRol: 'Admin Super' });
    });

    it("deberia aplicar patch a un rol por id", async () => {
        const patchData = { nombreRol: 'Usuario Premium' };
        let patchResult = await rol.patchRolById(2, patchData);
        expect(rol.patchRolById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult).toEqual({ idRol: 2, nombreRol: 'Usuario Premium' });
    });

    it("deberia eliminar un rol por id", async () => {
        let deleteResult = await rol.deleteRolById(1);
        expect(rol.deleteRolById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
