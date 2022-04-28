import { Request, Response } from "express";


export const fechaActual = async (req: Request, res: Response) => {
    try {
        const fecha = new Date(Date.now());

        res.json({
            ok: true,
            fecha
        });
    } catch (err) {
        res.json({
            ok: false,
            msg: "Error al obtener la fecha de venta, contacte a los desarrolladores."
        });
    }
}
