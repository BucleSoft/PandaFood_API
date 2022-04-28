"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const observacion_controller_1 = require("../controllers/observacion.controller");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
const middlewares = [
    (0, express_validator_1.check)("id_venta", "El identificador de venta es obligatorio!").not().isEmpty(),
    (0, express_validator_1.check)("observacion", "La observación no puede estar vacía!").not().isEmpty(),
    validar_campos_1.default
];
router.get("/:id", observacion_controller_1.obtenerObservaciones);
router.post("/", middlewares, observacion_controller_1.agregarObservacion);
router.post("/registrar/:id", observacion_controller_1.registrarObservaciones);
router.delete("/:id", observacion_controller_1.eliminarObservacion);
exports.default = router;
//# sourceMappingURL=observaciones.routes.js.map