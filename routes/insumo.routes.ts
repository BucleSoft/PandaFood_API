import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";

import { obtenerInsumos, crearInsumo, obtenerUnInsumo, actualizarInsumo, maxInsumo } from "../controllers/insumo.controller";
import { insumoExiste } from "../helpers/insumos/validadores-bd";

const router = Router();

const middlewares = [
    check('identificador', 'El identificador del insumo es obligatorio.').not().isEmpty(),
    check('identificador', 'El identificador debe tener al menos 2 dígitos.').isLength({ min: 2 }),
    check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    check('categoria', 'La categoría del insumo es obligatoria.').not().isEmpty(),
    check('unidades', 'Las unidades son obligatorias').not().isEmpty(),
    check("cantidad", "Ingrese el stock o gramaje del insumo.").not().isEmpty(),
    check("cantidad", "El stock o gramaje debe ser un valor numérico.").isNumeric(),
    validarCampos
]

router.get('/max', maxInsumo);
router.get('/', obtenerInsumos);
router.get('/:identificador', obtenerUnInsumo);

router.post('/', [check('identificador').custom(insumoExiste), ...middlewares], crearInsumo);

router.put('/:identificador', middlewares, actualizarInsumo);

export default router;