"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serverInfo_controller_1 = require("../controllers/serverInfo.controller");
const router = (0, express_1.Router)();
router.get("/fecha", serverInfo_controller_1.fechaActual);
exports.default = router;
//# sourceMappingURL=serverInfo.routes.js.map