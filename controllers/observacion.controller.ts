import { Request, Response } from "express";
import Observaciones from '../models/observaciones';
import Venta from "../models/venta";

export const obtenerObservaciones = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const observaciones = await Observaciones.findAll({ where: { id_venta: id } });

        if (!observaciones) {
            return res.json({
                ok: false,
                msg: "Error al obtener las observaciones."
            });
        }

        res.json({
            ok: true,
            observaciones
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
};

export const agregarObservacion = async (req: Request, res: Response) => {

    try {

        const { body } = req;

        const observacion = Observaciones.build(body);

        const guardar = await observacion.save();

        if (!guardar) {
            return res.json({
                ok: false,
                msg: "Error al crear la observación."
            });
        }

        res.json({
            ok: true,
            msg: "Observación creada correctamente."
        })

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
}

export const eliminarObservacion = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const eliminar = await Observaciones.destroy({ where: { id } });

        if (!eliminar) {
            return res.json({
                ok: false,
                msg: "Error al eliminar la observación!"
            });
        }

        res.json({
            ok: true,
            msg: "Observación eliminada correctamente!"
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
}

export const registrarObservaciones = async (req: Request, res: Response) => {

    try {

        const { observaciones } = req.body;
        const { id } = req.params;

        const buscarVenta = await Venta.findByPk(id);

        if (!buscarVenta) {
            return res.json({
                ok: false,
                msg: "No se encontró la venta a editar observaciones."
            });
        }

        observaciones.map(async (observacion: any) => {

            const obs = Observaciones.build({ id_venta: id, observacion });

            const registrarObs = await obs.save();

            if (!registrarObs) {

                return res.json({
                    ok: false,
                    msg: "Error al registrar la observación"
                });
            }

        });

        return res.json({
            ok: true,
            msg: "Observaciones registradas correctamente!"
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }

}