import { DataTypes } from "sequelize";
import db from "../database/connection";

const Excepcion = db.define("Excepciones", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    id_venta: {
        type: DataTypes.BIGINT
    },
    id_producto: {
        type: DataTypes.BIGINT
    },
    id_insumo: {
        type: DataTypes.BIGINT
    },
    cantidad: {
        type: DataTypes.INTEGER
    }
});

export default Excepcion;