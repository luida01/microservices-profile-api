import { Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { ObjectId } from 'mongodb';

export async function obtenerPerfil(req: Request, res: Response): Promise<void> {
    try {
        const { id, email } = req.query;

        // Validar que se proporcione al menos un parámetro
        if (!id && !email) {
            res.status(400).json({
                error: 'Parámetro requerido',
                message: 'Debe proporcionar id o email'
            });
            return;
        }

        const db = getDatabase();
        let perfil;

        // Buscar por ID o email
        if (id) {
            perfil = await db.collection('perfiles').findOne({
                _id: new ObjectId(id as string)
            });
        } else if (email) {
            perfil = await db.collection('perfiles').findOne({
                email: email as string
            });
        }

        // Verificar si se encontró el perfil
        if (!perfil) {
            res.status(404).json({
                error: 'Perfil no encontrado',
                message: 'No existe un perfil con los parámetros proporcionados'
            });
            return;
        }

        // Responder con el perfil
        res.status(200).json({
            success: true,
            data: perfil
        });
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'No se pudo obtener el perfil'
        });
    }
}

export async function listarPerfiles(req: Request, res: Response): Promise<void> {
    try {
        const db = getDatabase();
        const { limite = 10, pagina = 1 } = req.query;

        const limiteNum = parseInt(limite as string);
        const paginaNum = parseInt(pagina as string);
        const skip = (paginaNum - 1) * limiteNum;

        const perfiles = await db.collection('perfiles')
            .find({})
            .skip(skip)
            .limit(limiteNum)
            .toArray();

        const total = await db.collection('perfiles').countDocuments();

        res.status(200).json({
            success: true,
            data: perfiles,
            paginacion: {
                total,
                pagina: paginaNum,
                limite: limiteNum,
                totalPaginas: Math.ceil(total / limiteNum)
            }
        });
    } catch (error) {
        console.error('Error listando perfiles:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}
