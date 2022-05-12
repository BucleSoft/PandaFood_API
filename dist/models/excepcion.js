"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Excepcion = connection_1.default.define("Excepciones", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    id_venta: {
        type: sequelize_1.DataTypes.BIGINT
    },
    id_producto: {
        type: sequelize_1.DataTypes.BIGINT
    },
    id_insumo: {
        type: sequelize_1.DataTypes.BIGINT
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Excepcion;
//# sourceMappingURL=excepcion.js.map