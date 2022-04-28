import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";

import { maxProducto, obtenerProductos, crearProducto, obtenerUnProducto, actualizarProducto, productosMasVendidosHoy } from "../controllers/producto.controller";
import { productoExiste, mediciones, puntos } from "../helpers/productos/validadores-bd";

const router = Router();

const middlewares = [
    check('identificador', 'El identificador del producto es obligatorio.').not().isEmpty(),
    check('identificador', 'El identificador debe ser un valor numérico.').isNumeric(),
    check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    check('categoria_id', 'La categoría del producto es obligatoria.').not().isEmpty(),
    check('precio', 'El precio del producto es obligatorio.').trim().not().isEmpty(),
    check('precio', 'El precio del producto debe ser numérico.').isNumeric(),
    check('tipoUnidad', 'El tipo de unidad es obligatorio (stock o insumos).').not().isEmpty(),
    mediciones,
    puntos,
    validarCampos
]

router.get('/max', maxProducto);
router.get('/', obtenerProductos);
router.get('/:identificador', obtenerUnProducto);
router.get('/vendidoshoy', productosMasVendidosHoy);

router.post('/', [check("identificador", "El producto ya se encuentra registrado en la base de datos.").custom(productoExiste), ...middlewares], crearProducto);

router.put('/:identificador', middlewares, actualizarProducto);

export default router;