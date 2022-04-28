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
exports.productosMasVendidosHoy = exports.actualizarProducto = exports.crearProducto = exports.obtenerTipoUnidad = exports.obtenerUnProducto = exports.obtenerProductos = exports.maxProducto = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const detalle_producto_1 = __importDefault(require("../models/detalle_producto"));
const maxProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxProducto = yield producto_1.default.max('identificador');
        let maxCodigo = 1;
        if (maxProducto) {
            maxCodigo = maxProducto + 1;
        }
        return res.json({
            ok: true,
            maxCodigo
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error al obtener el último producto, comuníquese con los desarrolladores.'
        });
    }
});
exports.maxProducto = maxProducto;
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield producto_1.default.findAll();
        res.json({
            ok: true,
            productos
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error al consultar los productos, comuníquese con los desarrolladores.'
        });
    }
});
exports.obtenerProductos = obtenerProductos;
const obtenerUnProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identificador } = req.params;
        const producto = yield producto_1.default.findOne({ where: { identificador } });
        if (producto) {
            res.json({
                ok: true,
                producto
            });
        }
        else {
            res.json({
                ok: false,
                msg: 'No se encontró el producto.'
            });
        }
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }
});
exports.obtenerUnProducto = obtenerUnProducto;
const obtenerTipoUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield producto_1.default.findOne({ where: { identificador: id } });
        if (!producto) {
            return res.json({
                ok: false,
                msg: "Error al obtener la categoría del producto."
            });
        }
        res.json({
            ok: true,
            categoria: producto === null || producto === void 0 ? void 0 : producto.get("tipoUnidad")
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores."
        });
    }
});
exports.obtenerTipoUnidad = obtenerTipoUnidad;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { identificador, nombre, precio, puntos, insumos, stock, tipoUnidad, categoria_id, estado } = req.body;
        if (puntos === '') {
            puntos = 0;
        }
        else if (typeof puntos === "string") {
            puntos = parseInt(puntos);
        }
        if (stock === '') {
            stock = null;
        }
        else if (typeof stock === "string") {
            stock = parseInt(stock);
        }
        const producto = producto_1.default.build({ identificador, nombre, precio, puntos, stock, tipoUnidad, categoria_id, estado });
        // Guardar en la bd
        yield producto.save();
        if (insumos.length > 0) {
            insumos.map((insumo) => __awaiter(void 0, void 0, void 0, function* () {
                const id_producto = identificador;
                const id_insumo = insumo.id_insumo;
                const cantidad = insumo.cantidad;
                const detalle = detalle_producto_1.default.build({ id_producto, id_insumo, cantidad });
                yield detalle.save();
            }));
        }
        res.json({
            ok: true,
            producto
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.crearProducto = crearProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identificador } = req.params;
        let _a = req.body, { insumos } = _a, resto = __rest(_a, ["insumos"]);
        const producto = yield producto_1.default.findOne({ where: { identificador } });
        if (!producto) {
            return res.json({
                ok: false,
                msg: 'El producto no se encuentra registrado en la base de datos.'
            });
        }
        yield detalle_producto_1.default.destroy({ where: { id_producto: identificador } });
        if (resto.tipoUnidad === "Insumos") {
            resto.stock = null;
        }
        else {
            insumos = [];
        }
        if (resto.puntos === '') {
            resto.puntos = 0;
        }
        if (resto.tipoUnidad === "Insumos") {
            if (insumos.length !== 0) {
                insumos.map((insumo) => __awaiter(void 0, void 0, void 0, function* () {
                    const detalle = detalle_producto_1.default.build(Object.assign({ id_producto: identificador }, insumo));
                    const guardar = yield detalle.save();
                    if (!guardar) {
                        return res.json({
                            ok: false,
                            msg: `Error al registrar el insumo ${insumo.nombre}`
                        });
                    }
                }));
            }
        }
        const nuevoProducto = yield producto_1.default.update(resto, { where: { identificador } });
        res.json({
            ok: true,
            msg: 'Producto actualizado correctamente.',
            nuevoProducto
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
});
exports.actualizarProducto = actualizarProducto;
const productosMasVendidosHoy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fecha = new Date(Date.now());
        const productos = yield producto_1.default.findAll();
        res.json({
            ok: true,
            productos
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores"
        });
    }
});
exports.productosMasVendidosHoy = productosMasVendidosHoy;
//# sourceMappingURL=producto.controller.js.map