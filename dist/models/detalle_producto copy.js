"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
const Detalle_Producto = connection_1.default.define("Detalle_Producto", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_producto: {
        type: sequelize_1.DataTypes.STRING
    },
    id_insumo: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Detalle_Producto;
//# sourceMappingURL=detalle_producto%20copy.js.map