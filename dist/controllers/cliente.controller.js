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
exports.inhabilitarCliente = exports.actualizarCliente = exports.crearCliente = exports.obtenerUnCliente = exports.obtenerClientes = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const obtenerClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield cliente_1.default.findAll();
    res.json({
        ok: true,
        clientes
    });
});
exports.obtenerClientes = obtenerClientes;
const obtenerUnCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const cliente = yield cliente_1.default.findByPk(cedula);
        if (cliente) {
            res.json({
                ok: true,
                cliente
            });
        }
        else {
            res.json({
                ok: false,
                msg: 'No se encontró el cliente.'
            });
        }
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }
});
exports.obtenerUnCliente = obtenerUnCliente;
const crearCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { cedula, nombre, direccion, celular, puntos, estado } = req.body;
        if (puntos === "" || puntos === undefined || puntos === null) {
            puntos = 0;
        }
        const cliente = cliente_1.default.build({ cedula, nombre, direccion, celular, puntos, estado });
        // Guardar en la bd
        yield cliente.save();
        res.json({
            ok: true,
            cliente
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error al crear el cliente."
        });
    }
});
exports.crearCliente = crearCliente;
const actualizarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const resto = __rest(req.body, []);
        const cliente = yield cliente_1.default.findOne({ where: { cedula } });
        if (!cliente) {
            return res.json({
                ok: false,
                msg: 'El cliente no se encuentra registrado en la base de datos.'
            });
        }
        const nuevoCliente = yield cliente_1.default.update(resto, { where: { cedula } });
        res.json({
            ok: true,
            msg: 'Cliente actualizado correctamente.',
            nuevoCliente
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.',
            err
        });
    }
});
exports.actualizarCliente = actualizarCliente;
const inhabilitarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula } = req.params;
        const { estado } = req.body;
        yield cliente_1.default.update({ estado }, { where: { cedula } });
        res.json({
            ok: true,
            msg: 'Cliente deshabilitado correctamente.'
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: 'Error interno, comuníquese con los desarrolladores.'
        });
    }
});
exports.inhabilitarCliente = inhabilitarCliente;
//# sourceMappingURL=cliente.controller.js.map