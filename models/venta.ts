import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Venta = db.define("Ventas", {
    identificador: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    tipoVenta: {
        type: DataTypes.STRING
    },
    formaPago: {
        type: DataTypes.STRING
    },
    precioDomicilio: {
        type: DataTypes.INTEGER
    },
    direccionDomicilio: {
        type: DataTypes.STRING
    },
    consume: {
        type: DataTypes.STRING
    },
    idMesa: {
        type: DataTypes.BIGINT
    },
    cliente: {
        type: DataTypes.INTEGER
    },
    vendedor: {
        type: DataTypes.INTEGER
    },
    total: {
        type: DataTypes.BIGINT
    },
    puntosGanados: {
        type: DataTypes.BIGINT
    },
    descuento: {
        type: DataTypes.INTEGER
    },
    plataforma: {
        type: DataTypes.STRING
    },
    banco: {
        type: DataTypes.STRING
    }
});

export default Venta;
