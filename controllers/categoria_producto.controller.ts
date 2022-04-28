import { Request, Response } from "express";
import Categoria from "../models/categoria_productos";

export const obtenerCategorias = async (req: Request, res: Response) => {

    const categorias = await Categoria.findAll();

    res.json({
        ok: true,
        categorias
    });
}

export const obtenerCategoria = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const categoria = await Categoria.findOne({ where: { identificador: id } });

        if (!categoria) {
            return res.json({
                ok: false,
                msg: `No se ha encontrado la categoría con identificador ${id}`
            });
        }

        res.json({
            ok: true,
            categoria
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores."
        });
    }

}

export const crearCategoria = async (req: Request, res: Response) => {

    const { identificador, nombre, tipo } = req.body;

    const categoria = Categoria.build({ identificador, nombre, tipo });

    // Guardar en la bd
    await categoria.save();

    res.json({
        ok: true,
        categoria
    });
}

export const actualizarCategoria = async (req: Request, res: Response) => {

    try {
        const { identificador } = req.params;

        const categoria = await Categoria.findOne({ where: { identificador } });

        if (!categoria) {
            return res.json({
                ok: false,
                msg: 'La categoria no se encuentra registrada en la base de datos.'
            });
        }

        const { nombre, stock } = req.body;

        const nuevaCategoria = await Categoria.update({ nombre, stock }, { where: { identificador } });

        res.json({
            ok: true,
            msg: 'Categoria actualizada correctamente.',
            nuevaCategoria
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}
