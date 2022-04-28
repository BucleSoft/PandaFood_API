"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Venta = connection_1.default.define("Ventas", {
    identificador: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    tipoVenta: {
        type: sequelize_1.DataTypes.STRING
    },
    formaPago: {
        type: sequelize_1.DataTypes.STRING
    },
    precioDomicilio: {
        type: sequelize_1.DataTypes.INTEGER
    },
    direccionDomicilio: {
        type: sequelize_1.DataTypes.STRING
    },
    consume: {
        type: sequelize_1.DataTypes.STRING
    },
    idMesa: {
        type: sequelize_1.DataTypes.BIGINT
    },
    cliente: {
        type: sequelize_1.DataTypes.INTEGER
    },
    vendedor: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total: {
        type: sequelize_1.DataTypes.BIGINT
    },
    puntosGanados: {
        type: sequelize_1.DataTypes.BIGINT
    },
    descuento: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Venta;
//# sourceMappingURL=venta.js.map