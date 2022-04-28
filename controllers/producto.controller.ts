import { Request, Response } from "express";
import Producto from "../models/producto";
import Detalle_Producto from "../models/detalle_producto";

export const maxProducto = async (req: Request, res: Response) => {
    try {

        const maxProducto: any = await Producto.max('identificador');
        let maxCodigo = 1;

        if (maxProducto) {

            maxCodigo = maxProducto + 1;

        }

        return res.json({
            ok: true,
            maxCodigo
        });
    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error al obtener el último producto, comuníquese con los desarrolladores.'
        });
    }
}

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const productos = await Producto.findAll();

        res.json({
            ok: true,
            productos
        });
    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error al consultar los productos, comuníquese con los desarrolladores.'
        });
    }
}

export const obtenerUnProducto = async (req: Request, res: Response) => {

    try {
        const { identificador } = req.params;
        const producto = await Producto.findOne({ where: { identificador } });
        if (producto) {
            res.json({
                ok: true,
                producto
            });
        } else {
            res.json({
                ok: false,
                msg: 'No se encontró el producto.'
            });
        }
    } catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }
}

export const obtenerTipoUnidad = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const producto = await Producto.findOne({ where: { identificador: id } });

        if (!producto) {
            return res.json({
                ok: false,
                msg: "Error al obtener la categoría del producto."
            });
        }

        res.json({
            ok: true,
            categoria: producto?.get("tipoUnidad")
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores."
        });
    }
}

export const crearProducto = async (req: Request, res: Response) => {

    try {

        let { identificador, nombre, precio, puntos, insumos, stock, tipoUnidad, categoria_id, estado } = req.body;

        if (puntos === '') {
            puntos = 0;
        } else if (typeof puntos === "string") {
            puntos = parseInt(puntos);
        }

        if (stock === '') {
            stock = null;
        } else if (typeof stock === "string") {
            stock = parseInt(stock);
        }

        const producto = Producto.build({ identificador, nombre, precio, puntos, stock, tipoUnidad, categoria_id, estado });

        // Guardar en la bd
        await producto.save();

        if (insumos.length > 0) {

            insumos.map(async (insumo: any) => {

                const id_producto = identificador;
                const id_insumo = insumo.id_insumo;
                const cantidad = insumo.cantidad;

                const detalle = Detalle_Producto.build({ id_producto, id_insumo, cantidad });

                await detalle.save();


            });

        }

        res.json({
            ok: true,
            producto
        });

    } catch (err) {
        console.log(err);
    }


}

export const actualizarProducto = async (req: Request, res: Response) => {
    try {
        const { identificador } = req.params;

        let { insumos, ...resto } = req.body;
        const producto = await Producto.findOne({ where: { identificador } });

        if (!producto) {
            return res.json({
                ok: false,
                msg: 'El producto no se encuentra registrado en la base de datos.'
            });
        }

        await Detalle_Producto.destroy({ where: { id_producto: identificador } });

        if (resto.tipoUnidad === "Insumos") {
            resto.stock = null;
        } else {
            insumos = [];
        }

        if (resto.puntos === '') {
            resto.puntos = 0;
        }

        if (resto.tipoUnidad === "Insumos") {

            if (insumos.length !== 0) {
                insumos.map(async (insumo: any) => {
                    const detalle = Detalle_Producto.build({ id_producto: identificador, ...insumo });

                    const guardar = await detalle.save();

                    if (!guardar) {
                        return res.json({
                            ok: false,
                            msg: `Error al registrar el insumo ${insumo.nombre}`
                        });
                    }
                });
            }

        }


        const nuevoProducto = await Producto.update(resto, { where: { identificador } });

        res.json({
            ok: true,
            msg: 'Producto actualizado correctamente.',
            nuevoProducto
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
}

export const productosMasVendidosHoy = async (req: Request, res: Response) => {
    try {

        const fecha = new Date(Date.now());

        const productos = await Producto.findAll();

        res.json({
            ok: true,
            productos
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores"
        });
    }
}