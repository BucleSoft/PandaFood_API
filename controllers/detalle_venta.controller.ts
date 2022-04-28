import { Request, Response } from "express";
import Detalle_Venta from "../models/detalle_venta";

export const buscarDetalle = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const detalle = await Detalle_Venta.findAll({ where: { id_venta: id } });

        if (!detalle) {
            return res.json({
                ok: false,
                msg: "No se encontró ningún detalle de venta."
            });
        }

        res.json({
            ok: true,
            detalle
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error al crear el detalle de venta, contacta a los desarrolladores."
        })
    }
}