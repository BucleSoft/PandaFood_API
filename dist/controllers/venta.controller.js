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
exports.actualizarVenta = exports.actualizarFormaPago = exports.registrarVenta = exports.restarPuntos = exports.sumarPuntos = exports.restarInsumo = exports.restarStock = exports.maxVenta = exports.fehaActual = exports.obtenerVentasRango = exports.obtenerVentas = void 0;
const venta_1 = __importDefault(require("../models/venta"));
const producto_1 = __importDefault(require("../models/producto"));
const insumo_1 = __importDefault(require("../models/insumo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const detalle_producto_1 = __importDefault(require("../models/detalle_producto"));
const detalle_venta_1 = __importDefault(require("../models/detalle_venta"));
const sequelize_1 = require("sequelize");
const observaciones_1 = __importDefault(require("../models/observaciones"));
const obtenerVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ventas = yield venta_1.default.findAll();
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
const restarStock = (res, identificador, cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let producto = yield producto_1.default.findOne({ where: { identificador } });
        if (!producto) {
            return res.json({
                ok: false,
                msg: "Error, el producto no existe."
            });
        }
        const stock_producto = producto.get("stock");
        yield producto_1.default.update({ stock: stock_producto - cantidad }, { where: { identificador } });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno al restar el stock, contacte a los desarrolladores."
        });
    }
});
exports.restarStock = restarStock;
const restarInsumo = (res, identificador, cantidad, excepciones) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let producto = yield producto_1.default.findOne({ where: { identificador } });
        if (!producto) {
            return res.json({
                ok: false,
                msg: "Error, el producto no existe."
            });
        }
        const insumos = yield detalle_producto_1.default.findAll({ where: { id_producto: identificador } });
        if (insumos) {
            insumos.map((insumo) => __awaiter(void 0, void 0, void 0, function* () {
                const insumoId = insumo.id_insumo;
                const cantidadInsumo = insumo.cantidad;
                const insumoActual = yield insumo_1.default.findOne({ where: { identificador: insumoId } });
                let cantidadUsar = cantidad;
                if (!insumoId) {
                    return res.json({
                        ok: false,
                        msg: "Error al encontrar el insumo y restarlo."
                    });
                }
                excepciones === null || excepciones === void 0 ? void 0 : excepciones.map((excepcion) => {
                    if (excepcion.identificador === insumoId) {
                        cantidadUsar = cantidad - excepcion.cantidad;
                    }
                });
                const cantidadActual = insumoActual.get("cantidad");
                yield insumo_1.default.update({ cantidad: cantidadActual - (cantidadInsumo * cantidadUsar) }, { where: { identificador: insumoId } });
            }));
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno al restar el insumo, contacte a los desarrolladores."
        });
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
        let { identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, productos, total, puntosGanados, descuento, observaciones } = req.body;
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
        venta = venta_1.default.build({ identificador, fecha, tipoVenta, formaPago, precioDomicilio, direccionDomicilio, consume, idMesa, cliente, vendedor, total, puntosGanados, descuento });
        yield venta.save();
        productos.map((producto) => __awaiter(void 0, void 0, void 0, function* () {
            if (producto.tipoUnidad === 'Stock') {
                (0, exports.restarStock)(res, producto.identificador, producto.cantidad);
            }
            else {
                (0, exports.restarInsumo)(res, producto.identificador, producto.cantidad, producto.excepciones);
            }
            const detalle = detalle_venta_1.default.build({ id_venta: identificador, id_producto: producto.identificador, cantidad: producto.cantidad, subtotal: producto.precio * producto.cantidad });
            yield detalle.save();
        }));
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
        console.log("REGISTRARVENTA:" + err);
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
        if (carrito.length > 0) {
            carrito.map((producto) => __awaiter(void 0, void 0, void 0, function* () {
                const pdto = yield producto_1.default.findByPk(producto.identificador);
                if (!pdto) {
                    return resultado = {
                        ok: false,
                        msg: "Error al restar el stock del producto."
                    };
                }
                if (producto.tipoUnidad === "Stock") {
                    (0, exports.restarStock)(res, producto.identificador, producto.cantidad);
                }
                else if (producto.tipoUnidad === "Insumos") {
                    (0, exports.restarInsumo)(res, producto.identificador, producto.cantidad, producto.excepciones);
                }
                const detalle = detalle_venta_1.default.build({ id_producto: producto.identificador, id_venta: identificador, cantidad: producto.cantidad, subtotal: producto.precio * producto.cantidad });
                const guardar = yield detalle.save();
                if (!guardar) {
                    return resultado = {
                        ok: false,
                        msg: "Error al registrar el detalle de la venta en la base de datos."
                    };
                }
            }));
        }
        console.log("INFOEDITAR", infoEditar);
        const actualizarInfo = yield venta_1.default.update(infoEditar, { where: { identificador } });
        if (!actualizarInfo) {
            resultado = {
                ok: false,
                msg: "Error al editar la información de la venta."
            };
        }
        return res.json(resultado);
    }
    catch (err) {
        return res.json({
            ok: false,
            msg: "Error al actualizar la forma de pago en la base de datos."
        });
    }
});
exports.actualizarVenta = actualizarVenta;
//# sourceMappingURL=venta.controller.js.map