"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validadores_bd_1 = require("../helpers/clientes/validadores-bd");
const cliente_controller_1 = require("../controllers/cliente.controller");
const router = (0, express_1.Router)();
router.get('/', cliente_controller_1.obtenerClientes);
router.get('/:cedula', cliente_controller_1.obtenerUnCliente);
router.post('/', [
    (0, express_validator_1.check)('cedula', 'La cédula es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
    (0, express_validator_1.check)('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
    (0, express_validator_1.check)('cedula').custom(validadores_bd_1.cedulaExiste),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('celular', 'El celular es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
    (0, express_validator_1.check)('estado', 'El estado del cliente es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del cliente no puede ser numérico.').isString(),
    validar_campos_1.default
], cliente_controller_1.crearCliente);
router.put('/:cedula', [
    (0, express_validator_1.check)('cedula', 'La cédula es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
    (0, express_validator_1.check)('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('celular', 'El celular es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
    (0, express_validator_1.check)('estado', 'El estado del cliente es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del cliente no puede ser numérico.').isString(),
    (0, express_validator_1.check)('puntos', 'Los puntos del cliente son obligatorios').not().isEmpty(),
    validar_campos_1.default
], cliente_controller_1.actualizarCliente);
router.put('/estado/:cedula', [
    (0, express_validator_1.check)('estado', 'El estado del cliente es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del cliente no puede ser numérico.').isString(),
    validar_campos_1.default
], cliente_controller_1.inhabilitarCliente);
exports.default = router;
//# sourceMappingURL=cliente.routes.js.map