"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fechaActual = void 0;
const fechaActual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fecha = new Date(Date.now());
        res.json({
            ok: true,
            fecha
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Error al obtener la fecha de venta, contacte a los desarrolladores."
        });
    }
});
exports.fechaActual = fechaActual;
//# sourceMappingURL=serverInfo.controller.js.map