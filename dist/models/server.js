"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
const connection_1 = __importDefault(require("../database/connection"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const cliente_routes_1 = __importDefault(require("../routes/cliente.routes"));
const producto_routes_1 = __importDefault(require("../routes/producto.routes"));
const detalle_producto_routes_1 = __importDefault(require("../routes/detalle_producto.routes"));
const insumo_routes_1 = __importDefault(require("../routes/insumo.routes"));
const categoria_productos_routes_1 = __importDefault(require("../routes/categoria_productos.routes"));
const serverInfo_routes_1 = __importDefault(require("../routes/serverInfo.routes"));
const venta_routes_1 = __importDefault(require("../routes/venta.routes"));
const mesa_routes_1 = __importDefault(require("../routes/mesa.routes"));
const detalle_venta_routes_1 = __importDefault(require("../routes/detalle_venta.routes"));
const observaciones_routes_1 = __importDefault(require("../routes/observaciones.routes"));
class Server {
    constructor() {
        this.apiPaths = {
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
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        // Conectar a la base de datos
        this.conectarDB();
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Base de datos en línea!");
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_routes_1.default);
        this.app.use(this.apiPaths.auth, auth_routes_1.default);
        this.app.use(this.apiPaths.clientes, cliente_routes_1.default);
        this.app.use(this.apiPaths.productos, producto_routes_1.default);
        this.app.use(this.apiPaths.detalleProducto, detalle_producto_routes_1.default);
        this.app.use(this.apiPaths.insumos, insumo_routes_1.default);
        this.app.use(this.apiPaths.categorias, categoria_productos_routes_1.default);
        this.app.use(this.apiPaths.ventas, venta_routes_1.default);
        this.app.use(this.apiPaths.detalleVenta, detalle_venta_routes_1.default);
        this.app.use(this.apiPaths.serverInfo, serverInfo_routes_1.default);
        this.app.use(this.apiPaths.mesas, mesa_routes_1.default);
        this.app.use(this.apiPaths.observaciones, observaciones_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map