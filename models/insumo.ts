import { DataTypes } from "sequelize";
import db from "../database/connection";

const Insumo = db.define("Insumos", {
    identificador: {
        type: DataTypes.BIGINT,
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
        type: DataTypes.BIGINT
    },
    categoria: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
});

export default Insumo;