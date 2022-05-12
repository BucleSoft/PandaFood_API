import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";

import { obtenerMesas, crearMesa, nombreMesa, maxMesa } from '../controllers/mesa.controller';

const router = Router();

router.get("/", obtenerMesas);

router.get("/nombre/:id", nombreMesa);

router.post("/", [
    check("identificador", "El identificador de mesa es obligatorio.").not().isEmpty(),
    check("identificador", "El identificador de la mesa debe ser un valor numérico.").isNumeric(),
    check("nombre", "El nombre de la mesa es obligatorio.").not().isEmpty(),
    check("nombre", "El nombre debe contener al menos 4 caracteres.").isLength({ min: 4 }),
    validarCampos
], crearMesa);

router.get("/max", maxMesa);

export default router;