"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const perfilRoutes_1 = __importDefault(require("./routes/perfilRoutes"));
// Cargar variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares de seguridad
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta de health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        servicio: 'Microservicio CRUD',
        timestamp: new Date().toISOString()
    });
});
// Rutas de la API
app.use('/api', perfilRoutes_1.default);
// Iniciar servidor
async function iniciarServidor() {
    try {
        // Conectar a la base de datos
        await (0, database_1.connectToDatabase)();
        // Iniciar servidor HTTP
        app.listen(PORT, () => {
            console.log(`🚀 Microservicio CRUD corriendo en puerto ${PORT}`);
            console.log(`📡 Health check: http://localhost:${PORT}/health`);
        });
    }
    catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
}
iniciarServidor();
