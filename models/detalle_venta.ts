import db from "../database/connection";
import { DataTypes } from "sequelize";

const Detalle_Venta = db.define("Detalle_Ventas", {
    identificador: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_producto: {
        type: DataTypes.BIGINT
    },
    id_venta: {
        type: DataTypes.BIGINT
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    subtotal: {
        type: DataTypes.BIGINT
    }
});

export default Detalle_Venta;