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
exports.nombreMesa = exports.crearMesa = exports.obtenerMesas = exports.maxMesa = void 0;
const mesa_1 = __importDefault(require("../models/mesa"));
const maxMesa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxMesa = yield mesa_1.default.max("identificador");
        let maxCodigo = 1;
        if (maxMesa) {
            maxCodigo = maxMesa + 1;
        }
        return res.json({
            ok: true,
            maxCodigo
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error al obtener la última mesa, contacte a los desarrolladores."
        });
    }
});
exports.maxMesa = maxMesa;
const obtenerMesas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mesas = yield mesa_1.default.findAll();
        if (!mesas) {
            return res.json({
                ok: false,
                msg: "Error al cargar las mesas"
            });
        }
        res.json({
            ok: true,
            mesas
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
exports.obtenerMesas = obtenerMesas;
const crearMesa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mesa = mesa_1.default.build(req.body);
        const creacion = yield mesa.save();
        if (!creacion) {
            return res.json({
                ok: false,
                msg: "Error al crear la mesa"
            });
        }
        res.json({
            ok: true,
            msg: "Mesa creada correctamente"
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
});
exports.crearMesa = crearMesa;
const nombreMesa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const mesa = yield mesa_1.default.findOne({ where: { identificador: id } });
        if (!mesa) {
            return res.json({
                ok: false,
                msg: "Error al encontrar nombre de una mesa."
            });
        }
        res.json({
            ok: true,
            mesa: mesa.get("nombre")
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
exports.nombreMesa = nombreMesa;
//# sourceMappingURL=mesa.controller.js.map