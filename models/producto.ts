import { DataTypes } from "sequelize";
import db from "../database/connection";

const Producto = db.define("Producto", {
    identificador: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.INTEGER
    },
    puntos: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    },
    categoria_id: {
        type: DataTypes.INTEGER
    },
    tipoUnidad: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }

});

export default Producto;
