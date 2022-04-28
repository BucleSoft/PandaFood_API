import { Response, Request } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario";
import generarJWT from "../helpers/usuarios/generar-jwt";

export const login = async (req: Request, res: Response) => {

    const { cedula, contraseña } = req.body;

    try {

        // Verificar si la cédula existe
        const usuario = await Usuario.findOne({ where: { cedula } });

        // Si el usuario no existe en la BD
        if (!usuario) {
            return res.json({
                ok: false,
                msg: 'El usuario no se encuentra registrado en la base de datos.'
            });
        }

        // Si el usuario no está activo en la BD
        if (usuario.get("estado") === "No autorizado") {
            return res.json({
                ok: false,
                msg: 'El usuario tiene acceso restringido'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(contraseña, usuario.get("contraseña") as string);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.get("cedula") as string);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}