import { Request, Response } from "express";
import Insumo from "../models/insumo";

export const maxInsumo = async (req: Request, res: Response) => {
    try {

        const maxInsumo: any = await Insumo.max('identificador');
        let maxCodigo = 1;

        if (maxInsumo) {

            maxCodigo = maxInsumo + 1;

        }

        return res.json({
            ok: true,
            maxCodigo
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error al obtener el último insumo, comuníquese con los desarrolladores.'
        });
    }
}

export const obtenerInsumos = async (req: Request, res: Response) => {
    try {
        const insumos = await Insumo.findAll();

        res.json({
            ok: true,
            insumos
        });
    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error al consultar los insumos, comuníquese con los desarrolladores.'
        });
    }
}

export const obtenerUnInsumo = async (req: Request, res: Response) => {

    try {
        const { identificador } = req.params;
        const insumo = await Insumo.findOne({ where: { identificador } });
        if (insumo) {
            res.json({
                ok: true,
                insumo
            });

        } else {
            res.json({
                ok: false,
                msg: `No se encontró el insumo. ${identificador}`
            });
        }
    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }

}

export const crearInsumo = async (req: Request, res: Response) => {

    const { identificador, nombre, unidades, cantidad, categoria, disponibilidad, estado } = req.body;

    const insumo = Insumo.build({ identificador, nombre, unidades, cantidad, categoria, disponibilidad, estado });

    // Guardar en la bd
    await insumo.save();

    res.json({
        ok: true,
        insumo
    });
}

export const actualizarInsumo = async (req: Request, res: Response) => {
    try {
        const { identificador } = req.params;
        const { ...resto } = req.body;
        const insumo = await Insumo.findOne({ where: { identificador } });

        if (!insumo) {
            return res.json({
                ok: false,
                msg: 'El insumo no se encuentra registrado en la base de datos.'
            });
        }

        const nuevoInsumo = await Insumo.update(resto, { where: { identificador } });

        res.json({
            ok: true,
            msg: 'Insumo actualizado correctamente.',
            nuevoInsumo
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}
