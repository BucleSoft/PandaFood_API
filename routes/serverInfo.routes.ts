import { Router } from "express";

import { fechaActual } from "../controllers/serverInfo.controller";

const router = Router();

router.get("/fecha", fechaActual);

export default router;