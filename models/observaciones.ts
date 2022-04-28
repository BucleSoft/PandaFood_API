import { DataTypes } from "sequelize";
import db from "../database/connection";

const Observaciones = db.define("Observaciones", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    id_venta: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Observaciones;