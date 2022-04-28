"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Mesa = connection_1.default.define("Mesa", {
    identificador: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Mesa;
//# sourceMappingURL=mesa.js.map