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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gestionarAcceso = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUnUsuario = exports.obtenerUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        ok: true,
        usuarios
    });
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUnUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const usuario = yield usuario_1.default.findByPk(cedula);
        if (usuario) {
            res.json({
                ok: true,
                usuario
            });
        }
        else {
            res.json({
                ok: false,
                msg: 'No se encontr?? el usuario.'
            });
        }
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error fatal, comun??quese con los desarrolladores.'
        });
    }
});
exports.obtenerUnUsuario = obtenerUnUsuario;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Encriptar la contrase??a
        const salt = bcrypt_1.default.genSaltSync();
        body.contrase??a = bcrypt_1.default.hashSync(body.contrase??a, salt);
        const usuario = usuario_1.default.build(body);
        // Guardar en la bd
        yield usuario.save();
        res.json({
            ok: true,
            usuario
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error interno, hable con los desarrolladores"
        });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        let _a = req.body, { contrase??aActual } = _a, resto = __rest(_a, ["contrase\u00F1aActual"]);
        const usuario = yield usuario_1.default.findByPk(cedula);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no se encuentra registrado en la base de datos.'
            });
        }
        const contrase??a = usuario.get("contrase??a");
        if (contrase??aActual !== '') {
            const validPassword = bcrypt_1.default.compareSync(contrase??aActual, contrase??a);
            if (!validPassword) {
                return res.json({
                    ok: false,
                    msg: 'La contrase??a actual es incorrecta, corr??gela o b??rrala.'
                });
            }
            if (resto.contrase??a.length < 4) {
                return res.json({
                    ok: false,
                    msg: 'La contrase??a nueva debe tener al menos 4 caract??res.'
                });
            }
            const salt = bcrypt_1.default.genSaltSync();
            resto.contrase??a = bcrypt_1.default.hashSync(resto.contrase??a, salt);
        }
        else {
            resto.contrase??a = contrase??a;
        }
        const nuevoUsuario = yield usuario_1.default.update(resto, {
            where: {
                cedula
            }
        });
        res.json({
            ok: true,
            msg: 'Usuario actualizado correctamente.',
            nuevoUsuario
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comun??quese con los desarrolladores.',
            err
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const gestionarAcceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const { estado } = req.body;
        yield usuario_1.default.update({ estado: estado }, {
            where: {
                cedula
            }
        });
        res.json({
            ok: true,
            msg: 'Usuario deshabilitado correctamente.'
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comun??quese con los desarrolladores.'
        });
    }
});
exports.gestionarAcceso = gestionarAcceso;
//# sourceMappingURL=usuario.controller.js.map