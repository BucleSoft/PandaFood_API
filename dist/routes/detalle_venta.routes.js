"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_venta_controller_1 = require("../controllers/detalle_venta.controller");
const router = (0, express_1.Router)();
router.get("/:id", detalle_venta_controller_1.buscarDetalle);
exports.default = router;
//# sourceMappingURL=detalle_venta.routes.js.map