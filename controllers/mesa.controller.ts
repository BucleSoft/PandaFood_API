import { Request, Response } from "express";
import Mesa from "../models/mesa";

export const obtenerMesas = async (req: Request, res: Response) => {

    try {

        const mesas = await Mesa.findAll();

        if (!mesas) {
            return res.json({
                ok: false,
                msg: "Error al cargar las mesas"
            });
        }

        res.json({
            ok: true,
            mesas
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
}

export const crearMesa = async (req: Request, res: Response) => {

    try {

        const mesa = Mesa.build(req.body);

        const creacion = await mesa.save();

        if (!creacion) {
            return res.json({
                ok: false,
                msg: "Error al crear la mesa"
            });
        }

        res.json({
            ok: true,
            msg: "Mesa creada correctamente"
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }


}

export const nombreMesa = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const mesa = await Mesa.findOne({ where: { identificador: id } });

        if (!mesa) {
            return res.json({
                ok: false,
                msg: "Error al encontrar nombre de una mesa."
            });
        }

        res.json({
            ok: true,
            mesa: mesa.get("nombre")
        });


    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        })
    }
}

