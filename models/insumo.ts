import { DataTypes } from "sequelize";
import db from "../database/connection";

const Insumo = db.define("Insumos", {
    identificador: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    disponibilidad: {
        type: DataTypes.STRING
    },
    unidades: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    categoria: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
});

export default Insumo;