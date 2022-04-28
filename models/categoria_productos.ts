import db from "../database/connection";
import { DataTypes } from "sequelize";

const Categoria = db.define("Categorias", {
    identificador: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    }
});

export default Categoria;
