"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validadores_bd_1 = require("../helpers/categorias/validadores-bd");
const categoria_producto_controller_1 = require("../controllers/categoria_producto.controller");
const router = (0, express_1.Router)();
router.get('/:id', categoria_producto_controller_1.obtenerCategoria);
router.get('/', categoria_producto_controller_1.obtenerCategorias);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('nombre').custom(validadores_bd_1.categoriaExiste),
    (0, express_validator_1.check)('tipo', 'El tipo de categoría es obligario').not().isEmpty(),
    validar_campos_1.default
], categoria_producto_controller_1.crearCategoria);
router.put('/:id', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('tipo', 'El tipo de categoria es obligatorio.').not().isEmpty(),
    validar_campos_1.default
], categoria_producto_controller_1.actualizarCategoria);
exports.default = router;
//# sourceMappingURL=categoria_productos.routes.js.map