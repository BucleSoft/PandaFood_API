"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Producto = connection_1.default.define("Producto", {
    identificador: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    precio: {
        type: sequelize_1.DataTypes.INTEGER
    },
    puntos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    categoria_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    tipoUnidad: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map