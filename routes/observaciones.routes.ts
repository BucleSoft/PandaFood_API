import { Router } from "express";
import { check } from "express-validator";
import { obtenerObservaciones, agregarObservacion, eliminarObservacion, registrarObservaciones } from '../controllers/observacion.controller';
import validarCampos from "../middlewares/validar-campos";

const router = Router();

const middlewares = [
    check("id_venta", "El identificador de venta es obligatorio!").not().isEmpty(),
    check("observacion", "La observación no puede estar vacía!").not().isEmpty(),
    validarCampos
]

router.get("/:id", obtenerObservaciones);

router.post("/", middlewares, agregarObservacion);

router.post("/registrar/:id", registrarObservaciones);

router.delete("/:id", eliminarObservacion);

export default router;