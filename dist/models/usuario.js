"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Usuario = connection_1.default.define("Usuario", {
    cedula: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    celular: {
        type: sequelize_1.DataTypes.BIGINT
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    tipo_usuario: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map