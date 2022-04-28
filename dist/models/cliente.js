"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Cliente = connection_1.default.define("Cliente", {
    cedula: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    celular: {
        type: sequelize_1.DataTypes.BIGINT
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    puntos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Cliente;
//# sourceMappingURL=cliente.js.map