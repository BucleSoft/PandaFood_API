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
exports.registrarObservaciones = exports.eliminarObservacion = exports.agregarObservacion = exports.obtenerObservaciones = void 0;
const observaciones_1 = __importDefault(require("../models/observaciones"));
const venta_1 = __importDefault(require("../models/venta"));
const obtenerObservaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const observaciones = yield observaciones_1.default.findAll({ where: { id_venta: id } });
        if (!observaciones) {
            return res.json({
                ok: false,
                msg: "Error al obtener las observaciones."
            });
        }
        res.json({
            ok: true,
            observaciones
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
});
exports.obtenerObservaciones = obtenerObservaciones;
const agregarObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const observacion = observaciones_1.default.build(body);
        const guardar = yield observacion.save();
        if (!guardar) {
            return res.json({
                ok: false,
                msg: "Error al crear la observación."
            });
        }
        res.json({
            ok: true,
            msg: "Observación creada correctamente."
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error interno, contacte a los desarrolladores."
        });
    }
});
exports.agregarObservacion = agregarObservacion;
const eliminarObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eliminar = yield observaciones_1.default.destroy({ where: { id } });
        if (!eliminar) {
            return res.json({
                ok: false,
                msg: "Error al eliminar la observación!"
            });
        }
        res.json({
            ok: true,
            msg: "Observación eliminada correctamente!"
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
exports.eliminarObservacion = eliminarObservacion;
const registrarObservaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { observaciones } = req.body;
        const { id } = req.params;
        const buscarVenta = yield venta_1.default.findByPk(id);
        if (!buscarVenta) {
            return res.json({
                ok: false,
                msg: "No se encontró la venta a editar observaciones."
            });
        }
        observaciones.map((observacion) => __awaiter(void 0, void 0, void 0, function* () {
            const obs = observaciones_1.default.build({ id_venta: id, observacion });
            const registrarObs = yield obs.save();
            if (!registrarObs) {
                return res.json({
                    ok: false,
                    msg: "Error al registrar la observación"
                });
            }
        }));
        return res.json({
            ok: true,
            msg: "Observaciones registradas correctamente!"
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
exports.registrarObservaciones = registrarObservaciones;
//# sourceMappingURL=observacion.controller.js.map