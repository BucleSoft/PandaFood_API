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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = __importDefault(require("../helpers/usuarios/generar-jwt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula, contraseña } = req.body;
    try {
        // Verificar si la cédula existe
        const usuario = yield usuario_1.default.findOne({ where: { cedula } });
        // Si el usuario no existe en la BD
        if (!usuario) {
            return res.json({
                ok: false,
                msg: 'El usuario no se encuentra registrado en la base de datos.'
            });
        }
        // Si el usuario no está activo en la BD
        if (usuario.get("estado") === "No autorizado") {
            return res.json({
                ok: false,
                msg: 'El usuario tiene acceso restringido'
            });
        }
        // Verificar la contraseña
        const validPassword = bcrypt_1.default.compareSync(contraseña, usuario.get("contraseña"));
        if (!validPassword) {
            return res.json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        // Generar JWT
        const token = yield (0, generar_jwt_1.default)(usuario.get("cedula"));
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map