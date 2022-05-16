"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarVenta = exports.eliminarPlataforma = exports.totalPlataformas = exports.ventaPlataforma = exports.actualizarVenta = exports.actualizarFormaPago = exports.registrarVenta = exports.restarPuntos = exports.sumarPuntos = exports.restarInsumo = exports.restarStock = exports.maxVenta = exports.fehaActual = exports.obtenerVentasRango = exports.obtenerVentas = exports.obtenerVenta = void 0;
const venta_1 = __importDefault(require("../models/venta"));
const producto_1 = __importDefault(require("../models/producto"));
const insumo_1 = __importDefault(require("../models/insumo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const detalle_producto_1 = __importDefault(require("../models/detalle_producto"));
const detalle_venta_1 = __importDefault(require("../models/detalle_venta"));
const sequelize_1 = require("sequelize");
const observaciones_1 = __importDefault(require("../models/observaciones"));
const excepcion_1 = __importDefault(require("../models/excepcion"));
const moment_1 = __importDefault(require("moment"));
const obtenerVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idVenta } = req.query;
        const identificador = parseInt(idVenta);
        if (idVenta === null || idVenta === "" || idVenta === undefined) {
            return res.json({
                ok: false,
                msg: "No se encontró la venta, intentelo nuevamente."
            });
        }
        const venta = yield venta_1.default.findOne({ where: { identificador } });
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
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno al encontrar la venta, contacte a los desarrolladores."
        });
    }
});
exports.obtenerVenta = obtenerVenta;
const obtenerVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ventas = yield venta_1.default.findAll();
    ventas.map((venta) => {
        const puntos = venta.get("puntosGanados");
        venta.setDataValue("puntosAnteriores", puntos);
    });
    res.json({
        ok: true,
        ventas
    });
});
exports.obtenerVentas = obtenerVentas;
const obtenerVentasRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { desde, hasta } = req.body;
        const startedDate = new Date(desde);
        const endDate = new Date(hasta);
        const ventas = yield venta_1.default.findAll({
            where: {
                fecha: {
                    [sequelize_1.Op.between]: [startedDate, endDate]
                }
            }
        });
        if (!ventas) {
            return res.json({
                ok: false,
                msg: "Error al obtener las fechas por rango"
            });
        }
        res.json({
            ok: true,
            ventas
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
});
exports.obtenerVentasRango = obtenerVentasRango;
const fehaActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fecha = new Date(Date.now()).toLocaleDateString();
        res.json({
            ok: true,
            fecha
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error al obtener la fecha de venta, contacte a los desarrolladores."
        });
    }
});
exports.fehaActual = fehaActual;
const maxVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxVenta = yield venta_1.default.max("identificador");
        let maxCodigo = 1;
        if (maxVenta) {
            maxCodigo = maxVenta + 1;
        }
        res.json({
            ok: true,
            maxCodigo
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno al registrar la venta, contacte a los desarrolladores."
        });
    }
});
exports.maxVenta = maxVenta;
const restarStock = (identificador, cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let producto = yield producto_1.default.findOne({ where: { identificador } });
        const stock_producto = producto.get("stock");
        yield producto_1.default.update({ stock: stock_producto - cantidad }, { where: { identificador } });
    }
    catch (err) {
        console.log(err);
    }
});
exports.restarStock = restarStock;
const restarInsumo = (insumos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        insumos === null || insumos === void 0 ? void 0 : insumos.map((insumo) => __awaiter(void 0, void 0, void 0, function* () {
            const insumoBD = yield insumo_1.default.findOne({ where: { identificador: insumo.id_insumo } });
            const stockInsumo = insumoBD === null || insumoBD === void 0 ? void 0 : insumoBD.get("cantidad");
            yield insumo_1.default.update({ cantidad: stockInsumo - insumo.cantidad }, { where: { identificador: insumo.id_insumo } });
        }));
    }
    catch (err) {
        console.log(err);
    }
});
exports.restarInsumo = restarInsumo;
const sumarPuntos = (identificador, puntosGanados) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limite = 200;
        const cliente = yield cliente_1.default.findOne({ where: { cedula: identificador } });
        if (!cliente) {
            return {
                ok: false,
                msg: "Error al encontrar el cliente para sumar puntos"
            };
        }
        const pts = cliente.get("puntos");
        const puntosCliente = parseInt(pts);
        if (puntosCliente !== limite) {
            if ((puntosCliente + puntosGanados) <= limite) {
                const sumaPuntos = puntosCliente + puntosGanados;
                yield cliente_1.default.update({ puntos: sumaPuntos }, { where: { cedula: identificador } });
            }
            else if ((puntosCliente + puntosGanados) > limite) {
                yield cliente_1.default.update({ puntos: limite }, { where: { cedula: identificador } });
            }
        }
        return { ok: true, msg: "" };
    }
    catch (err) {
        return {
            ok: false,
            msg: "Error al sumar los puntos del cliente."
        };
    }
});
exports.sumarPuntos = sumarPuntos;
const restarPuntos = (identificador, puntosVenta) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield cliente_1.default.findOne({ where: { cedula: identificador } });
        if (!cliente) {
            return {
                ok: false,
                msg: "Error al encontrar el cliente para redimir puntos"
            };
        }
        const pts = cliente.get("puntos");
        const puntosCliente = parseInt(pts);
        if (puntosVenta > puntosCliente) {
            return {
                ok: false,
                msg: "El precio de los productos exceden a los puntos del cliente"
            };
        }
        const puntosRedimidos = puntosCliente - puntosVenta;
        yield cliente_1.default.update({ puntos: puntosRedimidos }, { where: { cedula: identificador } });
        return {
            ok: true,
            msg: ""
        };
    }
    catch (err) {
        return {
            ok: false,
            msg: "Error al sumar los puntos del cliente."
        };
    }
});
exports.restarPuntos = restarPuntos;
const registrarVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, productos, total, puntosGanados, descuento, observaciones, banco } = req.body;
        let venta = yield venta_1.default.findOne({ where: { identificador: identificador } });
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
            productos.map((dato) => {
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
            redimir = yield (0, exports.restarPuntos)(cliente, total);
            if (redimir.ok === false) {
                return res.json(redimir);
            }
        }
        else {
            const sumar = yield (0, exports.sumarPuntos)(cliente, puntosGanados);
            if (sumar.ok === false) {
                return res.json(sumar);
            }
        }
        fecha = Date();
        venta = venta_1.default.build({ identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, total, puntosGanados, descuento, banco });
        yield venta.save();
        let insumos = [];
        for (const producto of productos) {
            const cantidadPdto = parseInt(producto.cantidad);
            if (producto.tipoUnidad === "Insumos") {
                let excepciones = [];
                const insumosBD = yield detalle_producto_1.default.findAll({ where: { id_producto: producto.identificador } });
                for (const insumoBD of insumosBD) {
                    let exc = 0;
                    const id_insumo = insumoBD.get("id_insumo");
                    const cantidadUsar = parseInt(insumoBD.get("cantidad"));
                    if (producto.excepciones !== undefined) {
                        excepciones.push(...producto.excepciones);
                        if (excepciones.length > 0) {
                            const index = excepciones.findIndex((x) => x.identificador === id_insumo);
                            if (index !== -1) {
                                exc = excepciones[index].cantidad;
                                const excepcion = excepcion_1.default.build({ id_venta: identificador, id_producto: producto.identificador, id_insumo: excepciones[index].identificador, cantidad: exc });
                                yield excepcion.save();
                            }
                            else {
                                exc = 0;
                            }
                        }
                    }
                    const indexInsumo = insumos === null || insumos === void 0 ? void 0 : insumos.findIndex((x) => x.id_insumo === id_insumo);
                    if (indexInsumo === -1) {
                        insumos.push({ id_insumo, cantidad: cantidadUsar * (cantidadPdto - exc) });
                    }
                    else {
                        const cantidad = insumos[indexInsumo].cantidad;
                        insumos[indexInsumo].cantidad = (cantidadUsar * (cantidadPdto - exc)) + cantidad;
                    }
                }
            }
            else {
                (0, exports.restarStock)(producto.identificador, cantidadPdto);
            }
            const detalle = detalle_venta_1.default.build({ id_venta: identificador, id_producto: producto.identificador, cantidad: producto.cantidad, subtotal: producto.precio * producto.cantidad, excepcion: producto.excepcion, id_insumo: producto.id_insumo, cantExc: producto.cantExc });
            yield detalle.save();
        }
        ;
        if (insumos.length > 0) {
            (0, exports.restarInsumo)(insumos);
        }
        observaciones === null || observaciones === void 0 ? void 0 : observaciones.map((obs) => __awaiter(void 0, void 0, void 0, function* () {
            const observacion = observaciones_1.default.build({ id_venta: identificador, observacion: obs });
            yield observacion.save();
        }));
        res.json({
            ok: true,
            msg: "Venta registrada correctamente"
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error al registrar la venta"
        });
    }
});
exports.registrarVenta = registrarVenta;
const actualizarFormaPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { formaPago } = req.body;
        const actualizar = yield venta_1.default.update({ formaPago }, { where: { identificador: id } });
        if (!actualizar) {
            return res.json({
                ok: false,
                msg: "Error al actualizar la forma de pago en la base de datos."
            });
        }
        return res.json({
            ok: true
        });
    }
    catch (err) {
        return res.json({
            ok: false,
            msg: "Error al actualizar la forma de pago en la base de datos."
        });
    }
});
exports.actualizarFormaPago = actualizarFormaPago;
const actualizarVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carrito, infoVenta } = req.body;
        const { identificador } = infoVenta, infoEditar = __rest(infoVenta, ["identificador"]);
        let resultado = {
            ok: true,
            msg: "Venta actualizada correctamente!"
        };
        const ventaExiste = yield venta_1.default.findByPk(identificador);
        if (!ventaExiste) {
            return res.json({
                ok: false,
                msg: "No se encontró la venta a actualizar."
            });
        }
        let insumos = [];
        if (carrito.length > 0) {
            for (const producto of carrito) {
                const cantidadPdto = parseInt(producto.cantidad);
                if (producto.tipoUnidad === "Stock") {
                    (0, exports.restarStock)(producto.identificador, producto.cantidad);
                }
                else if (producto.tipoUnidad === "Insumos") {
                    let excepciones = [];
                    const insumosBD = yield detalle_producto_1.default.findAll({ where: { id_producto: producto.identificador } });
                    for (const insumoBD of insumosBD) {
                        let exc = 0;
                        const id_insumo = insumoBD.get("id_insumo");
                        const cantidadUsar = parseInt(insumoBD.get("cantidad"));
                        if (producto.excepciones !== undefined) {
                            excepciones.push(...producto.excepciones);
                            if (excepciones.length > 0) {
                                const index = excepciones.findIndex((x) => x.identificador === id_insumo);
                                if (index !== -1) {
                                    exc = parseInt(excepciones[index].cantidad);
                                    const excBD = yield excepcion_1.default.findOne({ where: { id_producto: producto.identificador, id_venta: identificador, id_insumo: id_insumo } });
                                    if (!excBD) {
                                        const excepcion = excepcion_1.default.build({ id_venta: identificador, id_producto: producto.identificador, id_insumo: excepciones[index].identificador, cantidad: exc });
                                        yield excepcion.save();
                                    }
                                    else {
                                        const cantidadBD = parseInt(excBD.get("cantidad"));
                                        yield excepcion_1.default.update({ cantidad: cantidadBD + exc }, { where: { id_producto: producto.identificador, id_venta: identificador, id_insumo: id_insumo } });
                                    }
                                }
                                else {
                                    exc = 0;
                                }
                            }
                        }
                        const indexInsumo = insumos === null || insumos === void 0 ? void 0 : insumos.findIndex((x) => x.id_insumo === id_insumo);
                        if (indexInsumo === -1) {
                            insumos.push({ id_insumo, cantidad: cantidadUsar * (cantidadPdto - exc) });
                        }
                        else {
                            const cantidad = insumos[indexInsumo].cantidad;
                            insumos[indexInsumo].cantidad = (cantidadUsar * (cantidadPdto - exc)) + cantidad;
                        }
                    }
                }
                const detalleBD = yield detalle_venta_1.default.findOne({ where: { id_producto: producto.identificador, id_venta: identificador } });
                if (!detalleBD) {
                    const cantidadPdto = parseInt(producto.cantidad);
                    const detalle = detalle_venta_1.default.build({ id_producto: producto.identificador, id_venta: identificador, cantidad: cantidadPdto, subtotal: producto.precio * cantidadPdto });
                    const guardar = yield detalle.save();
                    if (!guardar) {
                        return resultado = {
                            ok: false,
                            msg: "Error al registrar el detalle de la venta en la base de datos."
                        };
                    }
                }
                else {
                    const cantidadBD = parseInt(detalleBD.get("cantidad"));
                    const cantidadPdto = parseInt(producto.cantidad);
                    const actualizar = yield detalle_venta_1.default.update({ cantidad: cantidadBD + cantidadPdto, subtotal: producto.precio * (cantidadBD + cantidadPdto) }, { where: { id_venta: identificador, id_producto: producto.identificador } });
                    if (!actualizar) {
                        return resultado = {
                            ok: false,
                            msg: "Error al actualizar el detalle de la venta en la base de datos."
                        };
                    }
                }
            }
        }
        if (insumos.length > 0) {
            (0, exports.restarInsumo)(insumos);
        }
        const actualizarInfo = yield venta_1.default.update(infoEditar, { where: { identificador } });
        if (!actualizarInfo) {
            resultado = {
                ok: false,
                msg: "Error al editar la información de la venta."
            };
        }
        const cliente = yield cliente_1.default.findOne({ where: { cedula: infoEditar.cliente } });
        if (!cliente) {
            return res.json({
                ok: false,
                msg: "Error al actualizar los puntos del cliente!"
            });
        }
        const puntosCliente = cliente.get("puntos");
        const actualizarPuntos = yield cliente_1.default.update({ puntos: (puntosCliente - infoEditar.puntosAnteriores) + infoEditar.puntosGanados }, { where: { cedula: infoEditar.cliente } });
        if (!actualizarPuntos) {
            return res.json({
                ok: false,
                msg: "Error al actualizar los puntos del cliente!"
            });
        }
        return res.json(resultado);
    }
    catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            msg: "Error al actualizar la venta, verifica tu información."
        });
    }
});
exports.actualizarVenta = actualizarVenta;
const ventaPlataforma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identificador, plataforma, total } = req.body;
        const baseFecha = (0, moment_1.default)(new Date()).format("YYYY-MM-DD");
        const startedDate = baseFecha + " " + "00:00:00";
        const endDate = baseFecha + " " + "23:59:59";
        const registradoHoy = yield venta_1.default.findOne({
            where: {
                fecha: {
                    [sequelize_1.Op.between]: [startedDate, endDate]
                },
                tipoVenta: "Plataformas",
                plataforma
            }
        });
        if (registradoHoy) {
            const id = registradoHoy.get("identificador");
            const buscar = yield venta_1.default.findOne({ where: { identificador: id } });
            if (!buscar) {
                return res.json({
                    ok: false,
                    msg: "Error al registrar venta en plataforma."
                });
            }
            const totalVenta = parseInt(buscar.get("total")) + parseInt(total);
            const actualizar = venta_1.default.update({ total: totalVenta }, { where: { identificador: id } });
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
        }
        else {
            const existeVenta = yield venta_1.default.findByPk(identificador);
            if (existeVenta) {
                return res.json({
                    ok: false,
                    msg: "Error, el identificador de venta ya está registrado."
                });
            }
            const venta = venta_1.default.build(req.body);
            const guardar = yield venta.save();
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
    }
    catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            msg: "Error al registrar la venta en plataforma, contacta a los desarrolladores."
        });
    }
});
exports.ventaPlataforma = ventaPlataforma;
const totalPlataformas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fecha = (0, moment_1.default)(new Date()).format("YYYY-MM-DD");
        const startDate = fecha + " " + "00:00:00";
        const endDate = fecha + " " + "23:59:59";
        const suma = yield venta_1.default.sum("total", {
            where: {
                tipoVenta: "Plataformas",
                fecha: {
                    [sequelize_1.Op.between]: [startDate, endDate]
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
    }
    catch (err) {
        return res.json({
            ok: false,
            msg: "Error al obtener el total de ventas en plataforma, contacta a los desarrolladores."
        });
    }
});
exports.totalPlataformas = totalPlataformas;
const eliminarPlataforma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eliminar = yield venta_1.default.destroy({ where: { identificador: id } });
        if (!eliminar) {
            return res.json({
                ok: false,
                msg: "Error al eliminar la venta en plataforma."
            });
        }
        res.json({
            ok: true,
            msg: "Venta en plataforma eliminada correctamente!"
        });
    }
    catch (err) {
        return res.json({
            ok: false,
            msg: "Error al eliminar la venta por plataforma."
        });
    }
});
exports.eliminarPlataforma = eliminarPlataforma;
const eliminarVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productos = yield detalle_venta_1.default.findAll({ where: { id_venta: id } });
        let insumos = [];
        for (const pdto of productos) {
            let exc = 0;
            const id_producto = pdto.get("id_producto");
            const cantidadAUsar = parseInt(pdto.get("cantidad"));
            const pdtoBD = yield producto_1.default.findOne({ where: { identificador: id_producto } });
            const tipoUnidad = pdtoBD.get("tipoUnidad");
            if (tipoUnidad === "Stock") {
                const stockPdto = parseInt(pdtoBD === null || pdtoBD === void 0 ? void 0 : pdtoBD.get("stock"));
                const devolverStock = yield producto_1.default.update({ stock: stockPdto + cantidadAUsar }, { where: { identificador: id_producto } });
                if (!devolverStock) {
                    return res.json({
                        ok: false,
                        msg: "Error al devolver el stock del producto!"
                    });
                }
            }
            else {
                const detalle_producto = yield detalle_producto_1.default.findAll({ where: { id_producto } });
                for (const detalle of detalle_producto) {
                    const id_insumo = detalle.get("id_insumo");
                    const cantidadNecesitada = parseInt(detalle.get("cantidad"));
                    const excepcion = yield excepcion_1.default.findOne({ where: { id_venta: id, id_producto: id_producto, id_insumo: id_insumo } });
                    if (excepcion) {
                        const cant = excepcion.get("cantidad");
                        exc = parseInt(cant);
                    }
                    else {
                        exc = 0;
                    }
                    const indexInsumo = insumos.findIndex((x) => x.id_insumo === id_insumo);
                    if (indexInsumo !== -1) {
                        const cantidad = insumos[indexInsumo].cantidad;
                        insumos[indexInsumo].cantidad = cantidad + (cantidadNecesitada * (cantidadAUsar - exc));
                    }
                    else {
                        insumos.push({ id_insumo, cantidad: (cantidadNecesitada * (cantidadAUsar - exc)) });
                    }
                }
            }
        }
        if (insumos.length > 0) {
            insumos.map((insumo) => __awaiter(void 0, void 0, void 0, function* () {
                const insumoDB = yield insumo_1.default.findOne({ where: { identificador: insumo.id_insumo } });
                if (!insumoDB) {
                    return res.json({
                        ok: false,
                        msg: "Error al devolver el insumo!"
                    });
                }
                const stockInsumo = parseInt(insumoDB.get("cantidad"));
                const devolverInsumo = yield insumo_1.default.update({ cantidad: stockInsumo + insumo.cantidad }, { where: { identificador: insumo.id_insumo } });
                if (!devolverInsumo) {
                    return res.json({
                        ok: false,
                        msg: "Error al devolver el insumo!"
                    });
                }
            }));
        }
        yield detalle_venta_1.default.destroy({ where: { id_venta: id } });
        yield observaciones_1.default.destroy({ where: { id_venta: id } });
        yield excepcion_1.default.destroy({ where: { id_venta: id } });
        yield venta_1.default.destroy({ where: { identificador: id } });
        res.json({
            ok: true,
            msg: "Venta eliminada correctamente!"
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            ok: false,
            msg: "Error al eliminar la venta."
        });
    }
});
exports.eliminarVenta = eliminarVenta;
//# sourceMappingURL=venta.controller.js.map