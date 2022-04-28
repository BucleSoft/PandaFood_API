"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
const Categoria = connection_1.default.define("Categorias", {
    identificador: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Categoria;
//# sourceMappingURL=categoria_productos.js.map