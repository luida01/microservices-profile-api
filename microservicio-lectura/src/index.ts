import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import perfilRoutes from './routes/perfilRoutes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Ruta de health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        servicio: 'Microservicio de Lectura',
        timestamp: new Date().toISOString()
    });
});

// Rutas de la API
app.use('/api', perfilRoutes);

// Iniciar servidor
async function iniciarServidor() {
    try {
        // Conectar a la base de datos
        await connectToDatabase();

        // Iniciar servidor HTTP
        app.listen(PORT, () => {
            console.log(`🚀 Microservicio de Lectura corriendo en puerto ${PORT}`);
            console.log(`📡 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
}

iniciarServidor();
