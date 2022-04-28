"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('cedula', 'La cédula es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.default
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map