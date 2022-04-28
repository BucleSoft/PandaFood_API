"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const producto_controller_1 = require("../controllers/producto.controller");
const validadores_bd_1 = require("../helpers/productos/validadores-bd");
const router = (0, express_1.Router)();
const middlewares = [
    (0, express_validator_1.check)('identificador', 'El identificador del producto es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('identificador', 'El identificador debe ser un valor numérico.').isNumeric(),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    (0, express_validator_1.check)('categoria_id', 'La categoría del producto es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('precio', 'El precio del producto es obligatorio.').trim().not().isEmpty(),
    (0, express_validator_1.check)('precio', 'El precio del producto debe ser numérico.').isNumeric(),
    (0, express_validator_1.check)('tipoUnidad', 'El tipo de unidad es obligatorio (stock o insumos).').not().isEmpty(),
    validadores_bd_1.mediciones,
    validadores_bd_1.puntos,
    validar_campos_1.default
];
router.get('/max', producto_controller_1.maxProducto);
router.get('/', producto_controller_1.obtenerProductos);
router.get('/:identificador', producto_controller_1.obtenerUnProducto);
router.get('/vendidoshoy', producto_controller_1.productosMasVendidosHoy);
router.post('/', [(0, express_validator_1.check)("identificador", "El producto ya se encuentra registrado en la base de datos.").custom(validadores_bd_1.productoExiste), ...middlewares], producto_controller_1.crearProducto);
router.put('/:identificador', middlewares, producto_controller_1.actualizarProducto);
exports.default = router;
//# sourceMappingURL=producto.routes.js.map