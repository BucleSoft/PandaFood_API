"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const mesa_controller_1 = require("../controllers/mesa.controller");
const router = (0, express_1.Router)();
router.get("/", mesa_controller_1.obtenerMesas);
router.get("/nombre/:id", mesa_controller_1.nombreMesa);
router.post("/", [
    (0, express_validator_1.check)("identificador", "El identificador de mesa es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)("identificador", "El identificador de la mesa debe ser un valor numérico.").isNumeric(),
    (0, express_validator_1.check)("nombre", "El nombre de la mesa es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)("nombre", "El nombre debe contener al menos 4 caracteres.").isLength({ min: 4 }),
    validar_campos_1.default
], mesa_controller_1.crearMesa);
exports.default = router;
//# sourceMappingURL=mesa.routes.js.map