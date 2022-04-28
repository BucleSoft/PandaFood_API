import { Router } from "express";
import { check } from "express-validator";

import validarCampos from "../middlewares/validar-campos";
import { cedulaExiste } from "../helpers/clientes/validadores-bd";

import { obtenerClientes, crearCliente, obtenerUnCliente, actualizarCliente, inhabilitarCliente } from "../controllers/cliente.controller";

const router = Router();

router.get('/', obtenerClientes);
router.get('/:cedula', obtenerUnCliente);

router.post('/', [
    check('cedula', 'La cédula es obligatoria.').not().isEmpty(),
    check('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
    check('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
    check('cedula').custom(cedulaExiste),
    check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
    check('celular', 'El celular es obligatorio.').not().isEmpty(),
    check('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
    check('estado', 'El estado del cliente es obligatorio.').trim().not().isEmpty(),
    check('estado', 'El estado del cliente no puede ser numérico.').isString(),
    validarCampos
], crearCliente);

router.put('/:cedula',
    [
        check('cedula', 'La cédula es obligatoria.').not().isEmpty(),
        check('cedula', 'La cédula debe tener al menos 8 dígitos.').isLength({ min: 8 }),
        check('cedula', 'La cédula debe ser un valor numérico.').isNumeric(),
        check('nombre', 'El nombre es obligatorio.').trim().not().isEmpty(),
        check('nombre', 'El nombre debe tener al menos 3 caractéres.').isLength({ min: 3 }),
        check('celular', 'El celular es obligatorio.').not().isEmpty(),
        check('celular', 'El celular debe tener 10 dígitos.').isLength({ min: 10 }),
        check('estado', 'El estado del cliente es obligatorio.').not().isEmpty(),
        check('estado', 'El estado del cliente no puede ser numérico.').isString(),
        check('puntos', 'Los puntos del cliente son obligatorios').not().isEmpty(),
        validarCampos
    ], actualizarCliente);

router.put('/estado/:cedula',
    [
        check('estado', 'El estado del cliente es obligatorio.').trim().not().isEmpty(),
        check('estado', 'El estado del cliente no puede ser numérico.').isString(),
        validarCampos
    ], inhabilitarCliente);

export default router;