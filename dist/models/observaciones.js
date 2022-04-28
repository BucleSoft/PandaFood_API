"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Observaciones = connection_1.default.define("Observaciones", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    id_venta: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    observacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Observaciones;
//# sourceMappingURL=observaciones.js.map