"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Insumo = connection_1.default.define("Insumos", {
    identificador: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    disponibilidad: {
        type: sequelize_1.DataTypes.STRING
    },
    unidades: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad: {
        type: sequelize_1.DataTypes.BIGINT
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Insumo;
//# sourceMappingURL=insumo.js.map