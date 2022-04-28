import { Router } from "express";
import { buscarDetalle } from "../controllers/detalle_venta.controller";

const router = Router();

router.get("/:id", buscarDetalle);

export default router;