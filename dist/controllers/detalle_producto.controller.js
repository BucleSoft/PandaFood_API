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
exports.crearDetalle = exports.buscarInsumos = void 0;
const detalle_producto_1 = __importDefault(require("../models/detalle_producto"));
const insumo_1 = __importDefault(require("../models/insumo"));
const buscarInsumos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const detalles = yield detalle_producto_1.default.findAll({ where: { id_producto: id } });
        if (!detalles) {
            return res.json({
                ok: false,
                msg: "Error al encontrar los insumos"
            });
        }
        const insumos = [];
        for (let i = 0; i < detalles.length; i++) {
            const id_insumo = detalles[i].id_insumo;
            const insumo = yield insumo_1.default.findOne({ where: { identificador: id_insumo } });
            insumos.push(Object.assign(Object.assign({}, insumo.dataValues), { cantidad: detalles[i].cantidad }));
        }
        res.json({
            ok: true,
            insumos
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores"
        });
    }
});
exports.buscarInsumos = buscarInsumos;
const crearDetalle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detalle = detalle_producto_1.default.build(req.body);
        yield detalle.save();
        res.json({
            ok: true,
            msg: "Detalle agregado correctamente"
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error al crear el detalle del producto."
        });
    }
});
exports.crearDetalle = crearDetalle;
//# sourceMappingURL=detalle_producto.controller.js.map