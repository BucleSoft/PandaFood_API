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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarCategoria = exports.crearCategoria = exports.obtenerCategoria = exports.obtenerCategorias = void 0;
const categoria_productos_1 = __importDefault(require("../models/categoria_productos"));
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield categoria_productos_1.default.findAll();
    res.json({
        ok: true,
        categorias
    });
});
exports.obtenerCategorias = obtenerCategorias;
const obtenerCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_productos_1.default.findOne({ where: { identificador: id } });
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
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores."
        });
    }
});
exports.obtenerCategoria = obtenerCategoria;
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificador, nombre, tipo } = req.body;
    const categoria = categoria_productos_1.default.build({ identificador, nombre, tipo });
    // Guardar en la bd
    yield categoria.save();
    res.json({
        ok: true,
        categoria
    });
});
exports.crearCategoria = crearCategoria;
const actualizarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identificador } = req.params;
        const categoria = yield categoria_productos_1.default.findOne({ where: { identificador } });
        if (!categoria) {
            return res.json({
                ok: false,
                msg: 'La categoria no se encuentra registrada en la base de datos.'
            });
        }
        const { nombre, stock } = req.body;
        const nuevaCategoria = yield categoria_productos_1.default.update({ nombre, stock }, { where: { identificador } });
        res.json({
            ok: true,
            msg: 'Categoria actualizada correctamente.',
            nuevaCategoria
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
});
exports.actualizarCategoria = actualizarCategoria;
//# sourceMappingURL=categoria_producto.controller.js.map