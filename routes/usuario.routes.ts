import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";
import { cedulaExiste } from "../helpers/usuarios/validadores-bd";

import { obtenerUsuarios, crearUsuario, obtenerUnUsuario, actualizarUsuario, gestionarAcceso } from "../controllers/usuario.controller";

const router = Router();

router.get('/', obtenerUsuarios);
router.get('/:cedula', obtenerUnUsuario);

router.post('/', [
    check('cedula', 'La cédula es obligatoria.').not().isEmpty(),
    check('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
    check('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
    check('cedula').custom(cedulaExiste),
    check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    check('celular', 'El celular es obligatorio.').not().isEmpty(),
    check('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
    check('contraseña', 'La contraseña es obligatoria.').not().isEmpty(),
    check('contraseña', 'La contraseña debe tener al menos 6 caractéres.').isLength({ min: 6 }),
    check('tipo_usuario', "El tipo de usuario es obligatorio.").trim().not().isEmpty(),
    check('estado', 'El estado del usuario es obligatorio.').trim().not().isEmpty(),
    check('estado', 'El estado del usuario no puede ser numérico.').isString(),
    validarCampos
], crearUsuario);

router.put('/:cedula',
    [
        check('cedula', 'La cédula es obligatoria.').not().isEmpty(),
        check('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
        check('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
        check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
        check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
        check('celular', 'El celular es obligatorio.').not().isEmpty(),
        check('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
        check('tipo_usuario', "El tipo de usuario es obligatorio.").not().isEmpty(),
        check('estado', 'El estado del usuario es obligatorio.').not().isEmpty(),
        check('estado', 'El estado del usuario no puede ser numérico.').isString(),
        // check("tipo_usuario").custom(esTipoValido),
        validarCampos
    ], actualizarUsuario);

router.put('/acceso/:cedula',
    [
        check('estado', 'El estado del usuario es obligatorio.').trim().not().isEmpty(),
        check('estado', 'El estado del usuario no puede ser numérico.').isString(),
        // check("tipo_usuario").custom(esTipoValido),
        validarCampos
    ], gestionarAcceso);

export default router;