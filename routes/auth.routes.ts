import { Router } from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.controller";
import validarCampos from "../middlewares/validar-campos";

const router = Router();

router.post('/', [
    check('cedula', 'La cédula es obligatoria').not().isEmpty(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

export default router;