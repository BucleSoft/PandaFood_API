import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";

import { crearDetalle, buscarInsumos } from '../controllers/detalle_producto.controller';

const router = Router();

const middlewares = [
    check("id_producto", "El identificador del producto es obligatorio.").not().isEmpty(),
    check("id_insumo", "El identificador del insumo es obligatorio.").not().isEmpty(),
    validarCampos
];

router.post("/", middlewares, crearDetalle);
router.get("/:id", buscarInsumos);

export default router;