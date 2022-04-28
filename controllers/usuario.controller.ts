import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcrypt from "bcrypt";

export const obtenerUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        ok: true,
        usuarios
    });
}

export const obtenerUnUsuario = async (req: Request, res: Response) => {

    try {
        const { cedula } = req.params;
        const usuario = await Usuario.findByPk(cedula);

        if (usuario) {
            res.json({
                ok: true,
                usuario
            });
        } else {
            res.json({
                ok: false,
                msg: 'No se encontró el usuario.'
            });
        }

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error fatal, comuníquese con los desarrolladores.'
        });
    }

}

export const crearUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();

        body.contraseña = bcrypt.hashSync(body.contraseña, salt);

        const usuario = Usuario.build(body);

        // Guardar en la bd
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores"
        });
    }
}

export const actualizarUsuario = async (req: Request, res: Response) => {

    try {
        const { cedula } = req.params;
        let { contraseñaActual, ...resto } = req.body;

        const usuario = await Usuario.findByPk(cedula);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no se encuentra registrado en la base de datos.'
            });
        }

        const contraseña: any = usuario.get("contraseña");

        if (contraseñaActual !== '') {

            const validPassword = bcrypt.compareSync(contraseñaActual, contraseña);

            if (!validPassword) {
                return res.json({
                    ok: false,
                    msg: 'La contraseña actual es incorrecta, corrígela o bórrala.'
                });
            }

            if (resto.contraseña.length < 4) {

                return res.json({
                    ok: false,
                    msg: 'La contraseña nueva debe tener al menos 4 caractéres.'
                });
            }

            const salt = bcrypt.genSaltSync();
            resto.contraseña = bcrypt.hashSync(resto.contraseña, salt);

        } else {
            resto.contraseña = contraseña;
        }

        const nuevoUsuario = await Usuario.update(resto, {
            where: {
                cedula
            }
        });

        res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente.',
            nuevoUsuario
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}

export const gestionarAcceso = async (req: Request, res: Response) => {

    try {

        const { cedula } = req.params;
        const { estado } = req.body;
        await Usuario.update({ estado: estado }, {
            where: {
                cedula
            }
        });

        res.json({
            ok: true,
            msg: 'Usuario deshabilitado correctamente.'
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }

}
