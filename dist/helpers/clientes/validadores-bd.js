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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cedulaExiste = void 0;
const cliente_1 = __importDefault(require("../../models/cliente"));
const cedulaExiste = (cedula = 0) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si la cédula existe
    const existeCedula = yield cliente_1.default.findOne({ where: { cedula } });
    if (existeCedula) {
        throw new Error(`El número de cédula ${cedula} ya se encuentra registrado.`);
    }
});
exports.cedulaExiste = cedulaExiste;
//# sourceMappingURL=validadores-bd.js.map