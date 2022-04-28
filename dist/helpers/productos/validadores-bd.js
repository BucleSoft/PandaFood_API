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
exports.puntos = exports.mediciones = exports.productoExiste = void 0;
const producto_1 = __importDefault(require("../../models/producto"));
const productoExiste = (identificador) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el identificador del producto
    const existeProducto = yield producto_1.default.findOne({ where: { identificador } });
    if (existeProducto) {
        throw new Error(`El producto identificado con ${identificador} ya se encuentra registrado.`);
    }
});
exports.productoExiste = productoExiste;
const mediciones = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { stock, insumos, tipoUnidad } = req.body;
    if (tipoUnidad === "Insumos") {
        if (insumos.length === 0) {
            return res.json({
                ok: false,
                msg: "Ingresa al menos un insumo al producto"
            });
        }
        if (stock !== '') {
            return res.json({
                ok: false,
                msg: "El producto es de insumos, no ingreses un stock"
            });
        }
    }
    else {
        if (stock === '') {
            return res.json({
                ok: false,
                msg: "Ingresa el stock del producto"
            });
        }
    }
    next();
});
exports.mediciones = mediciones;
const puntos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { puntos } = req.body;
    if (puntos !== null && puntos !== '' && puntos !== undefined) {
        if (typeof puntos !== "number") {
            return res.json({
                ok: false,
                msg: 'Los puntos deben ser un valor numérico.'
            });
        }
    }
    next();
});
exports.puntos = puntos;
//# sourceMappingURL=validadores-bd.js.map