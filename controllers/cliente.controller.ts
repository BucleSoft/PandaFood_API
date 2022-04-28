import { Request, Response } from "express";
import Cliente from "../models/cliente";

export const obtenerClientes = async (req: Request, res: Response) => {

    const clientes = await Cliente.findAll();

    res.json({
        ok: true,
        clientes
    });
}

export const obtenerUnCliente = async (req: Request, res: Response) => {

    try {
        const { cedula } = req.params;
        const cliente = await Cliente.findByPk(cedula);

        if (cliente) {
            res.json({
                ok: true,
                cliente
            });
        } else {
            res.json({
                ok: false,
                msg: 'No se encontró el cliente.'
            });
        }
    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }

}

export const crearCliente = async (req: Request, res: Response) => {

    try {

        let { cedula, nombre, direccion, celular, puntos, estado } = req.body;

        if (puntos === "" || puntos === undefined || puntos === null) {
            puntos = 0;
        }

        const cliente = Cliente.build({ cedula, nombre, direccion, celular, puntos, estado });

        // Guardar en la bd
        await cliente.save();

        res.json({
            ok: true,
            cliente
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error al crear el cliente."
        })
    }
}

export const actualizarCliente = async (req: Request, res: Response) => {
    try {
        const { cedula } = req.params;
        const { ...resto } = req.body;
        const cliente = await Cliente.findOne({ where: { cedula } });

        if (!cliente) {
            return res.json({
                ok: false,
                msg: 'El cliente no se encuentra registrado en la base de datos.'
            });
        }


        const nuevoCliente = await Cliente.update(resto, { where: { cedula } });

        res.json({
            ok: true,
            msg: 'Cliente actualizado correctamente.',
            nuevoCliente
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}

export const inhabilitarCliente = async (req: Request, res: Response) => {

    try {

        const { cedula } = req.params;
        const { estado } = req.body;
        await Cliente.update({ estado }, { where: { cedula } });

        res.json({
            ok: true,
            msg: 'Cliente deshabilitado correctamente.'
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }
}
