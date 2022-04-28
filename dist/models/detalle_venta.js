"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
const Detalle_Venta = connection_1.default.define("Detalle_Ventas", {
    identificador: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_producto: {
        type: sequelize_1.DataTypes.BIGINT
    },
    id_venta: {
        type: sequelize_1.DataTypes.BIGINT
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    subtotal: {
        type: sequelize_1.DataTypes.BIGINT
    }
});
exports.default = Detalle_Venta;
//# sourceMappingURL=detalle_venta.js.map