import { Request, Response, NextFunction } from 'express';
import { getDatabase } from '../config/database';

export async function verificarAPIKey(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        // 1. Obtener API Key del header
        const apiKey = req.headers['x-api-key'] as string;

        // 2. Verificar que existe
        if (!apiKey) {
            res.status(401).json({
                error: 'API Key requerida',
                message: 'Debe proporcionar una API Key en el header x-api-key'
            });
            return;
        }

        // 3. Buscar en base de datos
        const db = getDatabase();
        const keyValida = await db.collection('api_keys').findOne({
            key: apiKey,
            activa: true
        });

        // 4. Verificar validez
        if (!keyValida) {
            res.status(403).json({
                error: 'API Key inválida',
                message: 'La API Key proporcionada no es válida o está inactiva'
            });
            return;
        }

        // 5. Guardar información del servicio en la petición
        (req as any).servicioAutenticado = keyValida.servicio;

        // 6. Continuar con la petición
        next();
    } catch (error) {
        console.error('Error en autenticación:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}
