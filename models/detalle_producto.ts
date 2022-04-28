import db from "../database/connection";
import { DataTypes } from "sequelize";

const Detalle_Producto = db.define("Detalle_Producto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_producto: {
        type: DataTypes.BIGINT
    },
    id_insumo: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.INTEGER
    }
});

export default Detalle_Producto;