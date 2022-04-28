import { DataTypes } from "sequelize";
import db from "../database/connection";

const Cliente = db.define("Cliente", {
    cedula: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    celular: {
        type: DataTypes.BIGINT
    },
    direccion: {
        type: DataTypes.STRING
    },
    puntos: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.STRING
    }
});

export default Cliente;