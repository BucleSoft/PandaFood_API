import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";

import { categoriaExiste } from "../helpers/categorias/validadores-bd";

import { obtenerCategorias, crearCategoria, actualizarCategoria, obtenerCategoria } from "../controllers/categoria_producto.controller";

const router = Router();

router.get('/:id', obtenerCategoria);
router.get('/', obtenerCategorias);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    check('nombre').custom(categoriaExiste),
    check('tipo', 'El tipo de categoría es obligario').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
        check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
        check('tipo', 'El tipo de categoria es obligatorio.').not().isEmpty(),
        validarCampos
    ], actualizarCategoria);

export default router;