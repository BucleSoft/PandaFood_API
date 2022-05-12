"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const venta_controller_1 = require("../controllers/venta.controller");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
const middlewares = [
    (0, express_validator_1.check)("identificador", "El código de venta es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("fecha", "La fecha de venta es obligatoria").trim().not().isEmpty(),
    (0, express_validator_1.check)("tipoVenta", "El tipo de venta es obligatorio").trim().not().isEmpty(),
    (0, express_validator_1.check)("formaPago", "La forma de pago es obligatoria").trim().not().isEmpty(),
    (0, express_validator_1.check)("cliente", "La información del cliente es obligatoria").trim().not().isEmpty(),
    (0, express_validator_1.check)("productos", "Los productos deben estar en una lista").isArray(),
    (0, express_validator_1.check)("productos", "No se puede registrar una venta sin productos").isLength({ min: 1 }),
    (0, express_validator_1.check)("total", "El total de la venta es obligatorio").trim().not().isEmpty(),
    (0, express_validator_1.check)("total", "El total de la venta debe ser un valor numérico").isNumeric(),
    (0, express_validator_1.check)("puntosGanados", "Los puntos obtenidos en la venta son obligatorios").not().isEmpty(),
    (0, express_validator_1.check)("puntosGanados", "Los puntos obtenidos en la venta deben ser un valor numérico").isNumeric(),
    (0, express_validator_1.check)("descuento", "El descuento de la venta es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("descuento", "El descuento de la venta debe ser un valor numérico").isNumeric(),
    validar_campos_1.default
];
router.get("/", venta_controller_1.obtenerVentas);
router.get("/fecha", venta_controller_1.fehaActual);
router.get("/max", venta_controller_1.maxVenta);
router.get("/plataformas", venta_controller_1.totalPlataformas);
router.post("/rango", [
    (0, express_validator_1.check)("desde", "La fecha inicial es obligatoria.").not().isEmpty(),
    (0, express_validator_1.check)("desde", "La fecha inicial debe ser una cadena de texto.").isString(),
    (0, express_validator_1.check)("hasta", "La fecha final es obligatoria.").not().isEmpty(),
    (0, express_validator_1.check)("hasta", "La fecha final debe ser una cadena de texto.").isString(),
], venta_controller_1.obtenerVentasRango);
router.post("/domicilio", [
    (0, express_validator_1.check)("precioDomicilio", "El precio del domicilio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("precioDomicilio", "El precio del domicilio debe ser un valor numérico").isNumeric(),
    (0, express_validator_1.check)("direccionDomicilio", "La dirección es obligatoria para un domicilio").not().isEmpty(),
    ...middlewares
], venta_controller_1.registrarVenta);
router.post("/", middlewares, venta_controller_1.registrarVenta);
router.put("/:id", [
    (0, express_validator_1.check)("tipoVenta", "El tipo de venta es obligatorio!").not().isEmpty(),
    validar_campos_1.default
], venta_controller_1.actualizarFormaPago);
router.put("/editar/:id", [
    (0, express_validator_1.check)("infoVenta", "La información de la venta a editar es obligatoria.").not().isEmpty(),
    validar_campos_1.default
], venta_controller_1.actualizarVenta);
router.post("/plataformas", [
    (0, express_validator_1.check)("identificador", "El identificador es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("total", "El total es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("plataforma", "La plataforma es obligatoria.").not().isEmpty(),
    validar_campos_1.default
], venta_controller_1.ventaPlataforma);
router.delete("/plataformas/:id", venta_controller_1.eliminarPlataforma);
router.delete("/:id", venta_controller_1.eliminarVenta);
exports.default = router;
//# sourceMappingURL=venta.routes.js.map