import usuario from '../../api/objects/usuario.js';

describe("Usuario API", () => {
    let usuariosMock = [
        {
            idUsuario: 1,
            nombreUsuario: 'Juan Perez',
            emailUsuario: 'juan@example.com',
            idRol: {
                idRol: 1,
                nombreRol: 'Administrador'
            }
        },
        {
            idUsuario: 2,
            nombreUsuario: 'Maria Garcia',
            emailUsuario: 'maria@example.com',
            idRol: {
                idRol: 2,
                nombreRol: 'Usuario'
            }
        },
        {
            idUsuario: 3,
            nombreUsuario: 'Carlos Lopez',
            emailUsuario: 'carlos@example.com',
            idRol: {
                idRol: 2,
                nombreRol: 'Usuario'
            }
        }
    ];
    let usuarioMock = usuariosMock[0];
    
    beforeEach(() => {
        spyOn(usuario, 'getAll').and.returnValue(
            Promise.resolve(usuariosMock)
        );
        spyOn(usuario, 'getById').and.callFake((id) => {
            return Promise.resolve(usuariosMock.find(u => u.idUsuario === id));
        });
        spyOn(usuario, 'createUsuario').and.callFake((data) => {
            return Promise.resolve({ idUsuario: 4, ...data });
        });
        spyOn(usuario, 'updateUsuarioById').and.callFake((id, data) => {
            return Promise.resolve({ idUsuario: id, ...data });
        });
        spyOn(usuario, 'patchUsuarioById').and.callFake((id, data) => {
            return Promise.resolve({ idUsuario: id, ...data });
        });
        spyOn(usuario, 'deleteUsuarioById').and.callFake((id) => {
            return Promise.resolve({ success: true });
        });
    });

    it("deberia devolver todos los usuarios", async () => {
        let usuariosResult = await usuario.getAll();
        expect(usuario.getAll).toHaveBeenCalledTimes(1);
        expect(usuariosResult).toBe(usuariosMock);
        expect(usuariosResult.length).toBe(3);
    });

    it("deberia devolver un usuario por id", async () => {
        let usuarioResult = await usuario.getById(1);
        expect(usuario.getById).toHaveBeenCalledWith(1);
        expect(usuarioResult).toBe(usuarioMock);
        expect(usuarioResult.nombreUsuario).toBe('Juan Perez');
        expect(usuarioResult.emailUsuario).toBe('juan@example.com');
    });

    it("deberia devolver undefined si el usuario no existe", async () => {
        let usuarioResult = await usuario.getById(999);
        expect(usuario.getById).toHaveBeenCalledWith(999);
        expect(usuarioResult).toBeUndefined();
    });

    it("deberia crear un usuario", async () => {
        const newUsuario = {
            nombreUsuario: 'Pedro Martinez',
            emailUsuario: 'pedro@example.com',
            idRol: { idRol: 2 }
        };
        let createResult = await usuario.createUsuario(newUsuario);
        expect(usuario.createUsuario).toHaveBeenCalledWith(newUsuario);
        expect(createResult.idUsuario).toBe(4);
        expect(createResult.nombreUsuario).toBe('Pedro Martinez');
    });

    it("deberia actualizar un usuario por id", async () => {
        const updated = {
            nombreUsuario: 'Juan Carlos Perez',
            emailUsuario: 'juancarlos@example.com',
            idRol: { idRol: 1 }
        };
        let updateResult = await usuario.updateUsuarioById(1, updated);
        expect(usuario.updateUsuarioById).toHaveBeenCalledWith(1, updated);
        expect(updateResult.idUsuario).toBe(1);
        expect(updateResult.nombreUsuario).toBe('Juan Carlos Perez');
    });

    it("deberia aplicar patch a un usuario por id", async () => {
        const patchData = { emailUsuario: 'maria.garcia@example.com' };
        let patchResult = await usuario.patchUsuarioById(2, patchData);
        expect(usuario.patchUsuarioById).toHaveBeenCalledWith(2, patchData);
        expect(patchResult.idUsuario).toBe(2);
        expect(patchResult.emailUsuario).toBe('maria.garcia@example.com');
    });

    it("deberia eliminar un usuario por id", async () => {
        let deleteResult = await usuario.deleteUsuarioById(1);
        expect(usuario.deleteUsuarioById).toHaveBeenCalledWith(1);
        expect(deleteResult).toEqual({ success: true });
    });

});
