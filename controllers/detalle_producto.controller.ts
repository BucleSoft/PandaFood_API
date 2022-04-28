import Detalle_Producto from '../models/detalle_producto';
import Insumo from "../models/insumo";
import { Request, Response } from "express";
import { insumoExiste } from '../helpers/insumos/validadores-bd';

export const buscarInsumos = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const detalles: any = await Detalle_Producto.findAll({ where: { id_producto: id } });

        if (!detalles) {
            return res.json({
                ok: false,
                msg: "Error al encontrar los insumos"
            });
        }

        const insumos: any = [];

        for (let i = 0; i < detalles.length; i++) {

            const id_insumo: any = detalles[i].id_insumo;

            const insumo: any = await Insumo.findOne({ where: { identificador: id_insumo } });

            insumos.push({ ...insumo.dataValues, cantidad: detalles[i].cantidad });

        }

        res.json({
            ok: true,
            insumos
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores"
        });
    }

}

export const crearDetalle = async (req: Request, res: Response) => {

    try {

        const detalle = Detalle_Producto.build(req.body);

        await detalle.save();

        res.json({
            ok: true,
            msg: "Detalle agregado correctamente"
        })

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error al crear el detalle del producto."
        })
    }

}