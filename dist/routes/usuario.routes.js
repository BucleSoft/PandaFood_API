"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validadores_bd_1 = require("../helpers/usuarios/validadores-bd");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.obtenerUsuarios);
router.get('/:cedula', usuario_controller_1.obtenerUnUsuario);
router.post('/', [
    (0, express_validator_1.check)('cedula', 'La cédula es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
    (0, express_validator_1.check)('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
    (0, express_validator_1.check)('cedula').custom(validadores_bd_1.cedulaExiste),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('celular', 'El celular es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
    (0, express_validator_1.check)('contraseña', 'La contraseña es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('contraseña', 'La contraseña debe tener al menos 6 caractéres.').isLength({ min: 6 }),
    (0, express_validator_1.check)('tipo_usuario', "El tipo de usuario es obligatorio.").trim().not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del usuario es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del usuario no puede ser numérico.').isString(),
    validar_campos_1.default
], usuario_controller_1.crearUsuario);
router.put('/:cedula', [
    (0, express_validator_1.check)('cedula', 'La cédula es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
    (0, express_validator_1.check)('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('celular', 'El celular es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
    (0, express_validator_1.check)('tipo_usuario', "El tipo de usuario es obligatorio.").not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del usuario es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del usuario no puede ser numérico.').isString(),
    // check("tipo_usuario").custom(esTipoValido),
    validar_campos_1.default
], usuario_controller_1.actualizarUsuario);
router.put('/acceso/:cedula', [
    (0, express_validator_1.check)('estado', 'El estado del usuario es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('estado', 'El estado del usuario no puede ser numérico.').isString(),
    // check("tipo_usuario").custom(esTipoValido),
    validar_campos_1.default
], usuario_controller_1.gestionarAcceso);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map