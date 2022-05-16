import { Request, Response } from "express";
import Venta from "../models/venta";
import Producto from '../models/producto';
import Insumo from "../models/insumo";
import Cliente from "../models/cliente";
import Detalle_Producto from '../models/detalle_producto';
import Detalle_Venta from "../models/detalle_venta";
import { Op } from "sequelize";
import Observacion from '../models/observaciones';
import Excepcion from "../models/excepcion";
import moment from "moment";

export const obtenerVenta = async (req: Request, res: Response) => {

    try {

        const { idVenta } = req.query;

        const identificador: number = parseInt(idVenta as string);

        if (idVenta === null || idVenta === "" || idVenta === undefined) {
            return res.json({
                ok: false,
                msg: "No se encontró la venta, intentelo nuevamente."
            });
        }

        const venta = await Venta.findOne({ where: { identificador } });

        if (!venta) {
            return res.json({
                ok: false,
                msg: "No existe la venta solicitada."
            });
        }

        res.json({
            ok: true,
            venta
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Error interno al encontrar la venta, contacte a los desarrolladores."
        });
    }
}

export const obtenerVentas = async (req: Request, res: Response) => {

    const ventas = await Venta.findAll();

    ventas.map((venta) => {
        const puntos = venta.get("puntosGanados");
        venta.setDataValue("puntosAnteriores", puntos);
    });

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

export const restarStock = async (identificador: number, cantidad: number) => {

    try {

        let producto: any = await Producto.findOne({ where: { identificador } });

        const stock_producto: any = producto.get("stock");

        await Producto.update({ stock: stock_producto - cantidad }, { where: { identificador } });

    } catch (err) {
        console.log(err);
    }
}

export const restarInsumo = async (insumos: []) => {
    try {

        insumos?.map(async (insumo: any) => {

            const insumoBD = await Insumo.findOne({ where: { identificador: insumo.id_insumo } });

            const stockInsumo: any = insumoBD?.get("cantidad");

            await Insumo.update({ cantidad: stockInsumo - insumo.cantidad }, { where: { identificador: insumo.id_insumo } });

        });

    } catch (err) {
        console.log(err);
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

        let { identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, productos, total, puntosGanados, descuento, observaciones, banco } = req.body;

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
        venta = Venta.build({ identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, total, puntosGanados, descuento, banco });

        await venta.save();

        let insumos: any = [];

        for (const producto of productos) {

            const cantidadPdto = parseInt(producto.cantidad);

            if (producto.tipoUnidad === "Insumos") {

                let excepciones: any = [];

                const insumosBD = await Detalle_Producto.findAll({ where: { id_producto: producto.identificador } });

                for (const insumoBD of insumosBD) {

                    let exc = 0;

                    const id_insumo = insumoBD.get("id_insumo");
                    const cantidadUsar = parseInt(insumoBD.get("cantidad") as string);

                    if (producto.excepciones !== undefined) {
                        excepciones.push(...producto.excepciones);

                        if (excepciones.length > 0) {

                            const index = excepciones.findIndex((x: any) => x.identificador === id_insumo);

                            if (index !== -1) {

                                exc = excepciones[index].cantidad;

                                const excepcion = Excepcion.build({ id_venta: identificador, id_producto: producto.identificador, id_insumo: excepciones[index].identificador, cantidad: exc });

                                await excepcion.save();
                            } else {
                                exc = 0;
                            }
                        }
                    }

                    const indexInsumo = insumos?.findIndex((x: any) => x.id_insumo === id_insumo);

                    if (indexInsumo === -1) {

                        insumos.push({ id_insumo, cantidad: cantidadUsar * (cantidadPdto - exc) });

                    } else {

                        const cantidad = insumos[indexInsumo].cantidad;

                        insumos[indexInsumo].cantidad = (cantidadUsar * (cantidadPdto - exc)) + cantidad;

                    }
                }

            } else {

                restarStock(producto.identificador, cantidadPdto);

            }

            const detalle = Detalle_Venta.build({ id_venta: identificador, id_producto: producto.identificador, cantidad: producto.cantidad, subtotal: producto.precio * producto.cantidad, excepcion: producto.excepcion, id_insumo: producto.id_insumo, cantExc: producto.cantExc });
            await detalle.save();
        };

        if (insumos.length > 0) {
            restarInsumo(insumos);
        }

        observaciones?.map(async (obs: any) => {
            const observacion = Observacion.build({ id_venta: identificador, observacion: obs });
            await observacion.save();
        });

        res.json({
            ok: true,
            msg: "Venta registrada correctamente"
        });

    } catch (err) {
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

        let insumos: any = [];

        if (carrito.length > 0) {

            for (const producto of carrito) {

                const cantidadPdto = parseInt(producto.cantidad);

                if (producto.tipoUnidad === "Stock") {

                    restarStock(producto.identificador, producto.cantidad);

                } else if (producto.tipoUnidad === "Insumos") {

                    let excepciones: any = [];

                    const insumosBD = await Detalle_Producto.findAll({ where: { id_producto: producto.identificador } });

                    for (const insumoBD of insumosBD) {

                        let exc = 0;

                        const id_insumo: any = insumoBD.get("id_insumo");
                        const cantidadUsar = parseInt(insumoBD.get("cantidad") as string);

                        if (producto.excepciones !== undefined) {
                            excepciones.push(...producto.excepciones);

                            if (excepciones.length > 0) {

                                const index = excepciones.findIndex((x: any) => x.identificador === id_insumo);

                                if (index !== -1) {

                                    exc = parseInt(excepciones[index].cantidad);

                                    const excBD = await Excepcion.findOne({ where: { id_producto: producto.identificador, id_venta: identificador, id_insumo: id_insumo } });

                                    if (!excBD) {

                                        const excepcion = Excepcion.build({ id_venta: identificador, id_producto: producto.identificador, id_insumo: excepciones[index].identificador, cantidad: exc });

                                        await excepcion.save();

                                    } else {

                                        const cantidadBD = parseInt(excBD.get("cantidad") as string);

                                        await Excepcion.update({ cantidad: cantidadBD + exc }, { where: { id_producto: producto.identificador, id_venta: identificador, id_insumo: id_insumo } });

                                    }

                                } else {
                                    exc = 0;
                                }
                            }
                        }

                        const indexInsumo = insumos?.findIndex((x: any) => x.id_insumo === id_insumo);

                        if (indexInsumo === -1) {

                            insumos.push({ id_insumo, cantidad: cantidadUsar * (cantidadPdto - exc) });

                        } else {

                            const cantidad = insumos[indexInsumo].cantidad;

                            insumos[indexInsumo].cantidad = (cantidadUsar * (cantidadPdto - exc)) + cantidad;
                        }
                    }
                }

                const detalleBD = await Detalle_Venta.findOne({ where: { id_producto: producto.identificador, id_venta: identificador } });

                if (!detalleBD) {

                    const cantidadPdto = parseInt(producto.cantidad);

                    const detalle = Detalle_Venta.build({ id_producto: producto.identificador, id_venta: identificador, cantidad: cantidadPdto, subtotal: producto.precio * cantidadPdto });

                    const guardar = await detalle.save();

                    if (!guardar) {
                        return resultado = {
                            ok: false,
                            msg: "Error al registrar el detalle de la venta en la base de datos."
                        }
                    }
                } else {

                    const cantidadBD = parseInt(detalleBD.get("cantidad") as string);

                    const cantidadPdto = parseInt(producto.cantidad);

                    const actualizar = await Detalle_Venta.update({ cantidad: cantidadBD + cantidadPdto, subtotal: producto.precio * (cantidadBD + cantidadPdto) }, { where: { id_venta: identificador, id_producto: producto.identificador } });

                    if (!actualizar) {
                        return resultado = {
                            ok: false,
                            msg: "Error al actualizar el detalle de la venta en la base de datos."
                        }
                    }
                }
            }

        }

        if (insumos.length > 0) {
            restarInsumo(insumos);
        }
        const actualizarInfo = await Venta.update(infoEditar, { where: { identificador } });

        if (!actualizarInfo) {
            resultado = {
                ok: false,
                msg: "Error al editar la información de la venta."
            }
        }

        const cliente = await Cliente.findOne({ where: { cedula: infoEditar.cliente } });

        if (!cliente) {
            return res.json({
                ok: false,
                msg: "Error al actualizar los puntos del cliente!"
            });
        }

        const puntosCliente: any = cliente.get("puntos");

        const actualizarPuntos = await Cliente.update({ puntos: (puntosCliente - infoEditar.puntosAnteriores) + infoEditar.puntosGanados }, { where: { cedula: infoEditar.cliente } });

        if (!actualizarPuntos) {
            return res.json({
                ok: false,
                msg: "Error al actualizar los puntos del cliente!"
            });
        }

        return res.json(resultado);

    } catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            msg: "Error al actualizar la venta, verifica tu información."
        });
    }
}

export const ventaPlataforma = async (req: Request, res: Response) => {

    try {

        const { identificador, plataforma, total } = req.body;

        const baseFecha = moment(new Date()).format("YYYY-MM-DD");
        const startedDate = baseFecha + " " + "00:00:00";
        const endDate = baseFecha + " " + "23:59:59";

        const registradoHoy = await Venta.findOne({
            where: {
                fecha: {

                    [Op.between]: [startedDate, endDate]

                },
                tipoVenta: "Plataformas",
                plataforma
            }
        });

        if (registradoHoy) {

            const id: any = registradoHoy.get("identificador");

            const buscar = await Venta.findOne({ where: { identificador: id } });

            if (!buscar) {
                return res.json({
                    ok: false,
                    msg: "Error al registrar venta en plataforma."
                });
            }

            const totalVenta: any = parseInt(buscar.get("total") as string) + parseInt(total);

            const actualizar = Venta.update({ total: totalVenta }, { where: { identificador: id } });

            if (!actualizar) {
                return res.json({
                    ok: false,
                    msg: "Error al actualizar la venta en plataforma!"
                });
            }

            return res.json({
                ok: true,
                msg: "Venta registrada correctamente!"
            });

        } else {

            const existeVenta = await Venta.findByPk(identificador);

            if (existeVenta) {
                return res.json({
                    ok: false,
                    msg: "Error, el identificador de venta ya está registrado."
                });
            }

            const venta = Venta.build(req.body);

            const guardar = await venta.save();

            if (!guardar) {
                return res.json({
                    ok: false,
                    msg: "Error al registrar la venta!"
                });
            }

            return res.json({
                ok: true,
                msg: "Venta registrada correctamente!"
            });

        }

    } catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            msg: "Error al registrar la venta en plataforma, contacta a los desarrolladores."
        });
    }
}

export const totalPlataformas = async (req: Request, res: Response) => {

    try {

        const fecha = moment(new Date()).format("YYYY-MM-DD");
        const startDate = fecha + " " + "00:00:00";
        const endDate = fecha + " " + "23:59:59";

        const suma = await Venta.sum("total", {
            where: {
                tipoVenta: "Plataformas",
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        if (!suma) {
            return res.json({
                ok: false,
                suma: 0
            });
        }

        res.json({
            ok: true,
            suma
        });

    } catch (err) {
        return res.json({
            ok: false,
            msg: "Error al obtener el total de ventas en plataforma, contacta a los desarrolladores."
        });
    }
}

export const eliminarPlataforma = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const eliminar = await Venta.destroy({ where: { identificador: id } });

        if (!eliminar) {
            return res.json({
                ok: false,
                msg: "Error al eliminar la venta en plataforma."
            });
        }

        res.json({
            ok: true,
            msg: "Venta en plataforma eliminada correctamente!"
        })

    } catch (err) {
        return res.json({
            ok: false,
            msg: "Error al eliminar la venta por plataforma."
        });
    }
}

export const eliminarVenta = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const productos = await Detalle_Venta.findAll({ where: { id_venta: id } });

        let insumos: any = [];

        for (const pdto of productos) {

            let exc = 0;

            const id_producto: any = pdto.get("id_producto");

            const cantidadAUsar = parseInt(pdto.get("cantidad") as any);

            const pdtoBD: any = await Producto.findOne({ where: { identificador: id_producto } });

            const tipoUnidad: any = pdtoBD.get("tipoUnidad");

            if (tipoUnidad === "Stock") {

                const stockPdto = parseInt(pdtoBD?.get("stock") as string);

                const devolverStock = await Producto.update({ stock: stockPdto + cantidadAUsar }, { where: { identificador: id_producto } });

                if (!devolverStock) {
                    return res.json({
                        ok: false,
                        msg: "Error al devolver el stock del producto!"
                    });
                }
            } else {

                const detalle_producto: any = await Detalle_Producto.findAll({ where: { id_producto } });

                for (const detalle of detalle_producto) {

                    const id_insumo: any = detalle.get("id_insumo");

                    const cantidadNecesitada = parseInt(detalle.get("cantidad") as any);

                    const excepcion = await Excepcion.findOne({ where: { id_venta: id, id_producto: id_producto, id_insumo: id_insumo } });

                    if (excepcion) {
                        const cant: any = excepcion.get("cantidad");
                        exc = parseInt(cant);
                    } else {
                        exc = 0;
                    }

                    const indexInsumo = insumos.findIndex((x: any) => x.id_insumo === id_insumo);

                    if (indexInsumo !== -1) {

                        const cantidad = insumos[indexInsumo].cantidad;
                        insumos[indexInsumo].cantidad = cantidad + (cantidadNecesitada * (cantidadAUsar - exc));

                    } else {

                        insumos.push({ id_insumo, cantidad: (cantidadNecesitada * (cantidadAUsar - exc)) });
                    }
                }

            }
        }

        if (insumos.length > 0) {

            insumos.map(async (insumo: any) => {

                const insumoDB = await Insumo.findOne({ where: { identificador: insumo.id_insumo } });

                if (!insumoDB) {
                    return res.json({
                        ok: false,
                        msg: "Error al devolver el insumo!"
                    });
                }

                const stockInsumo = parseInt(insumoDB.get("cantidad") as string);

                const devolverInsumo = await Insumo.update({ cantidad: stockInsumo + insumo.cantidad }, { where: { identificador: insumo.id_insumo } });

                if (!devolverInsumo) {
                    return res.json({
                        ok: false,
                        msg: "Error al devolver el insumo!"
                    });
                }

            });

        }

        await Detalle_Venta.destroy({ where: { id_venta: id } });
        await Observacion.destroy({ where: { id_venta: id } });
        await Excepcion.destroy({ where: { id_venta: id } });
        await Venta.destroy({ where: { identificador: id } });

        res.json({
            ok: true,
            msg: "Venta eliminada correctamente!"
        });

    } catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            msg: "Error al eliminar la venta."
        });
    }

}
