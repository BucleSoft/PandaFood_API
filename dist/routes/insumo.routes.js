"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const insumo_controller_1 = require("../controllers/insumo.controller");
const validadores_bd_1 = require("../helpers/insumos/validadores-bd");
const router = (0, express_1.Router)();
const middlewares = [
    (0, express_validator_1.check)('identificador', 'El identificador del insumo es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('identificador', 'El identificador debe ser un valor numérico.').isNumeric(),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('categoria', 'La categoría del insumo es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('unidades', 'Las unidades son obligatorias').not().isEmpty(),
    (0, express_validator_1.check)("cantidad", "Ingrese el stock o gramaje del insumo.").not().isEmpty(),
    (0, express_validator_1.check)("cantidad", "El stock o gramaje debe ser un valor numérico.").isNumeric(),
    validar_campos_1.default
];
router.get('/max', insumo_controller_1.maxInsumo);
router.get('/', insumo_controller_1.obtenerInsumos);
router.get('/:identificador', insumo_controller_1.obtenerUnInsumo);
router.post('/', [(0, express_validator_1.check)('identificador').custom(validadores_bd_1.insumoExiste), ...middlewares], insumo_controller_1.crearInsumo);
router.put('/:identificador', middlewares, insumo_controller_1.actualizarInsumo);
exports.default = router;
//# sourceMappingURL=insumo.routes.js.map