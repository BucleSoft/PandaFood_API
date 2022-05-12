import { Router } from "express";
import { check } from "express-validator";
import { fehaActual, registrarVenta, maxVenta, obtenerVentas, obtenerVentasRango, actualizarFormaPago, actualizarVenta, ventaPlataforma, totalPlataformas, eliminarPlataforma, eliminarVenta } from '../controllers/venta.controller';
import validarCampos from "../middlewares/validar-campos";

const router = Router();

const middlewares = [
    check("identificador", "El código de venta es obligatorio").not().isEmpty(),
    check("fecha", "La fecha de venta es obligatoria").trim().not().isEmpty(),
    check("tipoVenta", "El tipo de venta es obligatorio").trim().not().isEmpty(),
    check("formaPago", "La forma de pago es obligatoria").trim().not().isEmpty(),
    check("cliente", "La información del cliente es obligatoria").trim().not().isEmpty(),
    check("productos", "Los productos deben estar en una lista").isArray(),
    check("productos", "No se puede registrar una venta sin productos").isLength({ min: 1 }),
    check("total", "El total de la venta es obligatorio").trim().not().isEmpty(),
    check("total", "El total de la venta debe ser un valor numérico").isNumeric(),
    check("puntosGanados", "Los puntos obtenidos en la venta son obligatorios").not().isEmpty(),
    check("puntosGanados", "Los puntos obtenidos en la venta deben ser un valor numérico").isNumeric(),
    check("descuento", "El descuento de la venta es obligatorio").not().isEmpty(),
    check("descuento", "El descuento de la venta debe ser un valor numérico").isNumeric(),
    validarCampos
]

router.get("/", obtenerVentas);

router.get("/fecha", fehaActual);

router.get("/max", maxVenta);

router.get("/plataformas", totalPlataformas);

router.post("/rango", [
    check("desde", "La fecha inicial es obligatoria.").not().isEmpty(),
    check("desde", "La fecha inicial debe ser una cadena de texto.").isString(),
    check("hasta", "La fecha final es obligatoria.").not().isEmpty(),
    check("hasta", "La fecha final debe ser una cadena de texto.").isString(),
], obtenerVentasRango);

router.post("/domicilio", [
    check("precioDomicilio", "El precio del domicilio es obligatorio").not().isEmpty(),
    check("precioDomicilio", "El precio del domicilio debe ser un valor numérico").isNumeric(),
    check("direccionDomicilio", "La dirección es obligatoria para un domicilio").not().isEmpty(),
    ...middlewares
], registrarVenta);

router.post("/", middlewares, registrarVenta);

router.put("/:id", [
    check("tipoVenta", "El tipo de venta es obligatorio!").not().isEmpty(),
    validarCampos
], actualizarFormaPago);

router.put("/editar/:id", [
    check("infoVenta", "La información de la venta a editar es obligatoria.").not().isEmpty(),
    validarCampos
], actualizarVenta);

router.post("/plataformas", [
    check("identificador", "El identificador es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("plataforma", "La plataforma es obligatoria.").not().isEmpty(),
    validarCampos
],
    ventaPlataforma);

router.delete("/plataformas/:id", eliminarPlataforma);

router.delete("/:id", eliminarVenta);

export default router;