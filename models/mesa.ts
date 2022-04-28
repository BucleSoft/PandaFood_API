import { DataTypes } from "sequelize";
import db from "../database/connection";

const Mesa = db.define("Mesa", {
    identificador: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    }
});

export default Mesa;