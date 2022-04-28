import express, { Application } from "express";
import cors from "cors";
import usuariosRoutes from "../routes/usuario.routes";
import db from "../database/connection";
import authRoutes from "../routes/auth.routes";
import clientesRoutes from "../routes/cliente.routes";
import productosRoutes from "../routes/producto.routes";
import detalleProductosRoutes from "../routes/detalle_producto.routes";
import insumosRoutes from "../routes/insumo.routes";
import categoriasRoutes from "../routes/categoria_productos.routes";
import serverInfoRoutes from "../routes/serverInfo.routes";
import ventasRoutes from "../routes/venta.routes";
import mesasRoutes from "../routes/mesa.routes";
import detalleVentasRoutes from "../routes/detalle_venta.routes";
import observacionesRoutes from "../routes/observaciones.routes";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: "/usuarios",
        auth: "/login",
        clientes: "/clientes",
        productos: "/productos",
        detalleProducto: "/detalle_producto",
        insumos: "/insumos",
        categorias: "/categorias",
        ventas: "/ventas",
        detalleVenta: "/detalle_venta",
        serverInfo: "/server",
        mesas: "/mesas",
        observaciones: "/observaciones"
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '3001';

        // Conectar a la base de datos
        this.conectarDB();

        // Lectura y parseo del body
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        try {

            await db.authenticate();
            console.log("Base de datos en línea!");

        } catch (err: any) {
            throw new Error(err);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, usuariosRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.clientes, clientesRoutes);
        this.app.use(this.apiPaths.productos, productosRoutes);
        this.app.use(this.apiPaths.detalleProducto, detalleProductosRoutes);
        this.app.use(this.apiPaths.insumos, insumosRoutes);
        this.app.use(this.apiPaths.categorias, categoriasRoutes);
        this.app.use(this.apiPaths.ventas, ventasRoutes);
        this.app.use(this.apiPaths.detalleVenta, detalleVentasRoutes);
        this.app.use(this.apiPaths.serverInfo, serverInfoRoutes);
        this.app.use(this.apiPaths.mesas, mesasRoutes);
        this.app.use(this.apiPaths.observaciones, observacionesRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

export default Server;