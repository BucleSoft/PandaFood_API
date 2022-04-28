import Producto from "../../models/producto";
import * as express from "express";

export const productoExiste = async (identificador: any) => {
    // Verificar si el identificador del producto
    const existeProducto = await Producto.findOne({ where: { identificador } });
    if (existeProducto) {
        throw new Error(`El producto identificado con ${identificador} ya se encuentra registrado.`);
    }
}

export const mediciones = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { stock, insumos, tipoUnidad } = req.body;

    if (tipoUnidad === "Insumos") {

        if (insumos.length === 0) {
            return res.json({
                ok: false,
                msg: "Ingresa al menos un insumo al producto"
            });
        }

        if (stock !== '') {
            return res.json({
                ok: false,
                msg: "El producto es de insumos, no ingreses un stock"
            });
        }

    } else {

        if (stock === '') {
            return res.json({
                ok: false,
                msg: "Ingresa el stock del producto"
            });
        }

    }


    next();

}

export const puntos = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const { puntos } = req.body;

    if (puntos !== null && puntos !== '' && puntos !== undefined) {
        if (typeof puntos !== "number") {
            return res.json({
                ok: false,
                msg: 'Los puntos deben ser un valor numérico.'
            });
        }
    }
    next();

}