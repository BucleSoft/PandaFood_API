import { DataTypes } from "sequelize";
import db from "../database/connection";

const Usuario = db.define("Usuario", {
    cedula: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    celular: {
        type: DataTypes.BIGINT
    },
    contraseña: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    tipo_usuario: {
        type: DataTypes.STRING
    }
});

export default Usuario;