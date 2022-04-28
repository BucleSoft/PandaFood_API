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
exports.actualizarInsumo = exports.crearInsumo = exports.obtenerUnInsumo = exports.obtenerInsumos = exports.maxInsumo = void 0;
const insumo_1 = __importDefault(require("../models/insumo"));
const maxInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxInsumo = (yield insumo_1.default.findAll()).reverse();
        let maxCodigo = 1;
        if (maxInsumo.length !== 0) {
            maxCodigo = parseInt(maxInsumo.at(0).identificador.split('IN')[1]);
            maxCodigo = maxCodigo + 1;
        }
        res.json({
            ok: true,
            maxCodigo: "IN" + maxCodigo
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error al obtener el último insumo, comuníquese con los desarrolladores.'
        });
    }
});
exports.maxInsumo = maxInsumo;
const obtenerInsumos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insumos = yield insumo_1.default.findAll();
        res.json({
            ok: true,
            insumos
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error al consultar los insumos, comuníquese con los desarrolladores.'
        });
    }
});
exports.obtenerInsumos = obtenerInsumos;
const obtenerUnInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identificador } = req.params;
        const insumo = yield insumo_1.default.findOne({ where: { identificador } });
        if (insumo) {
            res.json({
                ok: true,
                insumo
            });
        }
        else {
            res.json({
                ok: false,
                msg: `No se encontró el insumo. ${identificador}`
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
exports.obtenerUnInsumo = obtenerUnInsumo;
const crearInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificador, nombre, unidades, cantidad, categoria, disponibilidad, estado } = req.body;
    const insumo = insumo_1.default.build({ identificador, nombre, unidades, cantidad, categoria, disponibilidad, estado });
    // Guardar en la bd
    yield insumo.save();
    res.json({
        ok: true,
        insumo
    });
});
exports.crearInsumo = crearInsumo;
const actualizarInsumo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identificador } = req.params;
        const resto = __rest(req.body, []);
        const insumo = yield insumo_1.default.findOne({ where: { identificador } });
        if (!insumo) {
            return res.json({
                ok: false,
                msg: 'El insumo no se encuentra registrado en la base de datos.'
            });
        }
        const nuevoInsumo = yield insumo_1.default.update(resto, { where: { identificador } });
        res.json({
            ok: true,
            msg: 'Insumo actualizado correctamente.',
            nuevoInsumo
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
exports.actualizarInsumo = actualizarInsumo;
//# sourceMappingURL=insumo.controller.js.map