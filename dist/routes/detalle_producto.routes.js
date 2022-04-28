"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const detalle_producto_controller_1 = require("../controllers/detalle_producto.controller");
const router = (0, express_1.Router)();
const middlewares = [
    (0, express_validator_1.check)("id_producto", "El identificador del producto es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)("id_insumo", "El identificador del insumo es obligatorio.").not().isEmpty(),
    validar_campos_1.default
];
router.post("/", middlewares, detalle_producto_controller_1.crearDetalle);
router.get("/:id", detalle_producto_controller_1.buscarInsumos);
exports.default = router;
//# sourceMappingURL=detalle_producto.routes.js.map