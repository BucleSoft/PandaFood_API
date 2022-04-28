import { Request, Response } from "express";
import Venta from "../models/venta";
import Producto from "../models/producto";
import Insumo from "../models/insumo";
import Cliente from "../models/cliente";
import Detalle_Producto from '../models/detalle_producto';
import Detalle_Venta from "../models/detalle_venta";
import { Op } from "sequelize";
import Observacion from '../models/observaciones';

export const obtenerVentas = async (req: Request, res: Response) => {

    const ventas = await Venta.findAll();

    res.json({
        ok: true,
        ventas
    });
}

export const obtenerVentasRango = async (req: Request, res: Response) => {

    try {

        const { desde, hasta } = req.body;

        const startedDate = new Date(desde);
        const endDate = new Date(hasta);

        const ventas = await Venta.findAll({
            where: {
                fecha: {
                    [Op.between]: [startedDate, endDate]
                }
            }
        });

        if (!ventas) {
            return res.json({
                ok: false,
                msg: "Error al obtener las fechas por rango"
            })
        }

        res.json({
            ok: true,
            ventas
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
}

export const fehaActual = async (req: Request, res: Response) => {
    try {
        const fecha = new Date(Date.now()).toLocaleDateString();

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

export const maxVenta = async (req: Request, res: Response) => {

    try {

        const maxVenta: any = await Venta.max("identificador");
        let maxCodigo = 1;

        if (maxVenta) {
            maxCodigo = maxVenta + 1;
        }


        res.json({
            ok: true,
            maxCodigo
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno al registrar la venta, contacte a los desarrolladores."
        });
    }

}

export const restarStock = async (res: Response, identificador: number, cantidad: number) => {

    try {

        let producto = await Producto.findOne({ where: { identificador } });

        if (!producto) {
            return res.json({
                ok: false,
                msg: "Error, el producto no existe."
            });
        }

        const stock_producto: any = producto.get("stock");

        await Producto.update({ stock: stock_producto - cantidad }, { where: { identificador } });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno al restar el stock, contacte a los desarrolladores."
        });
    }
}

export const restarInsumo = async (res: Response, identificador: number, cantidad: number, excepciones: any) => {
    try {


        let producto = await Producto.findOne({ where: { identificador } });

        if (!producto) {
            return res.json({
                ok: false,
                msg: "Error, el producto no existe."
            });
        }

        const insumos = await Detalle_Producto.findAll({ where: { id_producto: identificador } });

        if (insumos) {

            insumos.map(async (insumo: any) => {
                const insumoId: any = insumo.id_insumo;
                const cantidadInsumo: any = insumo.cantidad;
                const insumoActual: any = await Insumo.findOne({ where: { identificador: insumoId } });
                let cantidadUsar = cantidad;

                if (!insumoId) {
                    return res.json({
                        ok: false,
                        msg: "Error al encontrar el insumo y restarlo."
                    })
                }

                excepciones?.map((excepcion: any) => {
                    if (excepcion.identificador === insumoId) {
                        cantidadUsar = cantidad - excepcion.cantidad;
                    }
                });

                const cantidadActual: any = insumoActual.get("cantidad");
                await Insumo.update({ cantidad: cantidadActual - (cantidadInsumo * cantidadUsar) }, { where: { identificador: insumoId } });
            });
        }

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno al restar el insumo, contacte a los desarrolladores."
        });
    }
}

export const sumarPuntos = async (identificador: number, puntosGanados: number) => {
    try {

        const limite = 200;

        const cliente = await Cliente.findOne({ where: { cedula: identificador } });

        if (!cliente) {
            return {
                ok: false,
                msg: "Error al encontrar el cliente para sumar puntos"
            };
        }

        const pts: any = cliente.get("puntos");

        const puntosCliente: any = parseInt(pts);

        if (puntosCliente !== limite) {
            if ((puntosCliente + puntosGanados) <= limite) {
                const sumaPuntos = puntosCliente + puntosGanados;
                await Cliente.update({ puntos: sumaPuntos }, { where: { cedula: identificador } });
            } else if ((puntosCliente + puntosGanados) > limite) {
                await Cliente.update({ puntos: limite }, { where: { cedula: identificador } });
            }
        }

        return { ok: true, msg: "" }

    } catch (err) {
        return {
            ok: false,
            msg: "Error al sumar los puntos del cliente."
        };
    }
}
export const restarPuntos = async (identificador: number, puntosVenta: number) => {
    try {

        const cliente = await Cliente.findOne({ where: { cedula: identificador } });

        if (!cliente) {
            return {
                ok: false,
                msg: "Error al encontrar el cliente para redimir puntos"
            };
        }

        const pts: any = cliente.get("puntos");

        const puntosCliente = parseInt(pts);

        if (puntosVenta > puntosCliente) {
            return {
                ok: false,
                msg: "El precio de los productos exceden a los puntos del cliente"
            }
        }

        const puntosRedimidos = puntosCliente - puntosVenta;

        await Cliente.update({ puntos: puntosRedimidos }, { where: { cedula: identificador } });

        return {
            ok: true,
            msg: ""
        }

    } catch (err) {
        return {
            ok: false,
            msg: "Error al sumar los puntos del cliente."
        };
    }
}

export const registrarVenta = async (req: Request, res: Response) => {
    try {

        let { identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, productos, total, puntosGanados, descuento, observaciones } = req.body;

        let venta = await Venta.findOne({ where: { identificador: identificador } });

        if (venta) {
            return res.json({
                ok: false,
                msg: "Ya hay una venta con ese código de venta"
            });
        }

        if (precioDomicilio === '') {
            precioDomicilio = null;
        }

        if (idMesa === '') {
            idMesa = null;
        }


        if (tipoVenta === 'Redimir') {
            if (cliente === '0' || cliente === 0) {
                return res.json({
                    ok: false,
                    msg: "El cliente cero no puede redimir puntos"
                });
            }

            let redimir = {
                ok: true,
                msg: ""
            };

            productos.map((dato: any) => {
                if (dato.puntos === null || dato.puntos === '' || dato.puntos === '0' || dato.puntos === 0) {
                    redimir = {
                        ok: false,
                        msg: "No se puede redimir un producto sin puntos asignados"
                    };
                }
            });

            if (redimir.ok === false) {
                return res.json(redimir);
            }

            redimir = await restarPuntos(cliente, total);

            if (redimir.ok === false) {
                return res.json(redimir);
            }

        } else {
            const sumar = await sumarPuntos(cliente, puntosGanados);
            if (sumar.ok === false) {
                return res.json(sumar);
            }
        }


        fecha = Date();
        venta = Venta.build({ identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, total, puntosGanados, descuento });

        await venta.save();

        productos.map(async (producto: any) => {
            if (producto.tipoUnidad === 'Stock') {
                restarStock(res, producto.identificador, producto.cantidad);
            } else {
                restarInsumo(res, producto.identificador, producto.cantidad, producto.excepciones);
            }
            const detalle = Detalle_Venta.build({ id_venta: identificador, id_producto: producto.identificador, cantidad: producto.cantidad, subtotal: producto.precio * producto.cantidad });
            await detalle.save();
        });

        observaciones?.map(async (obs: any) => {
            const observacion = Observacion.build({ id_venta: identificador, observacion: obs });
            await observacion.save();
        });

        res.json({
            ok: true,
            msg: "Venta registrada correctamente"
        });

    } catch (err) {
        console.log("REGISTRARVENTA:" + err);
        res.json({
            ok: false,
            msg: "Error al registrar la venta"
        });
    }
}

export const actualizarFormaPago = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const { formaPago } = req.body;

        const actualizar = await Venta.update({ formaPago }, { where: { identificador: id } });

        if (!actualizar) {
            return res.json({
                ok: false,
                msg: "Error al actualizar la forma de pago en la base de datos."
            });
        }

        return res.json({
            ok: true
        });


    } catch (err) {
        return res.json({
            ok: false,
            msg: "Error al actualizar la forma de pago en la base de datos."
        });
    }
}

export const actualizarVenta = async (req: Request, res: Response) => {

    try {

        const { carrito, infoVenta } = req.body;

        const { identificador, ...infoEditar } = infoVenta;

        let resultado: any = {
            ok: true,
            msg: "Venta actualizada correctamente!"
        }

        const ventaExiste = await Venta.findByPk(identificador);

        if (!ventaExiste) {
            return res.json({
                ok: false,
                msg: "No se encontró la venta a actualizar."
            });
        }

        if (carrito.length > 0) {

            carrito.map(async (producto: any) => {

                const pdto = await Producto.findByPk(producto.identificador);

                if (!pdto) {
                    return resultado = {
                        ok: false,
                        msg: "Error al restar el stock del producto."
                    }
                }

                if (producto.tipoUnidad === "Stock") {

                    restarStock(res, producto.identificador, producto.cantidad);

                } else if (producto.tipoUnidad === "Insumos") {

                    restarInsumo(res, producto.identificador, producto.cantidad, producto.excepciones);

                }

                const detalle = Detalle_Venta.build({ id_producto: producto.identificador, id_venta: identificador, cantidad: producto.cantidad, subtotal: producto.precio * producto.cantidad });

                const guardar = await detalle.save();

                if (!guardar) {
                    return resultado = {
                        ok: false,
                        msg: "Error al registrar el detalle de la venta en la base de datos."
                    }
                }

            });
        }

        console.log("INFOEDITAR", infoEditar);
        const actualizarInfo = await Venta.update(infoEditar, { where: { identificador } });

        if (!actualizarInfo) {
            resultado = {
                ok: false,
                msg: "Error al editar la información de la venta."
            }
        }

        return res.json(resultado);

    } catch (err) {
        return res.json({
            ok: false,
            msg: "Error al actualizar la forma de pago en la base de datos."
        });
    }
}
