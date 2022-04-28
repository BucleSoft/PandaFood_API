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
exports.buscarDetalle = void 0;
const detalle_venta_1 = __importDefault(require("../models/detalle_venta"));
const buscarDetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const detalle = yield detalle_venta_1.default.findAll({ where: { id_venta: id } });
        if (!detalle) {
            return res.json({
                ok: false,
                msg: "No se encontró ningún detalle de venta."
            });
        }
        res.json({
            ok: true,
            detalle
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error al crear el detalle de venta, contacta a los desarrolladores."
        });
    }
});
exports.buscarDetalle = buscarDetalle;
//# sourceMappingURL=detalle_venta.controller.js.map