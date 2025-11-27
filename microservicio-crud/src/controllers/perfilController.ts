import { Request, Response } from 'express';
import { getDatabase } from '../config/database';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { Perfil } from '../models/Perfil';

const JWT_SECRET = process.env.JWT_SECRET || 'mi-secreto-super-seguro-cambiar-en-produccion';

// Validar email
function esEmailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono
function esTelefonoValido(telefono: string): boolean {
    const regex = /^[0-9\-\+\(\)\s]+$/;
    return regex.test(telefono) && telefono.length >= 7;
}

// CREATE - Crear perfil
export async function crearPerfil(req: Request, res: Response): Promise<void> {
    try {
        const { nombre, apellido, telefono, email, direccion } = req.body;

        // Validaciones
        if (!nombre || !apellido || !telefono || !email || !direccion) {
            res.status(400).json({
                error: 'Datos incompletos',
                message: 'Todos los campos son requeridos: nombre, apellido, telefono, email, direccion'
            });
            return;
        }

        if (!esEmailValido(email)) {
            res.status(400).json({
                error: 'Email inválido',
                message: 'El formato del email no es válido'
            });
            return;
        }

        if (!esTelefonoValido(telefono)) {
            res.status(400).json({
                error: 'Teléfono inválido',
                message: 'El formato del teléfono no es válido'
            });
            return;
        }

        const db = getDatabase();

        // Verificar si el email ya existe
        const perfilExistente = await db.collection('perfiles').findOne({ email });
        if (perfilExistente) {
            res.status(409).json({
                error: 'Email duplicado',
                message: 'Ya existe un perfil con este email'
            });
            return;
        }

        // Crear nuevo perfil
        const nuevoPerfil: Perfil = {
            nombre,
            apellido,
            telefono,
            email,
            direccion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        };

        const resultado = await db.collection('perfiles').insertOne(nuevoPerfil);

        // Generar token JWT
        const token = jwt.sign(
            {
                userId: resultado.insertedId.toString(),
                email: email
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'Perfil creado exitosamente',
            token: token,
            data: {
                id: resultado.insertedId,
                ...nuevoPerfil
            }
        });
    } catch (error) {
        console.error('Error creando perfil:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}

// UPDATE - Actualizar perfil
export async function actualizarPerfil(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { nombre, apellido, telefono, email, direccion } = req.body;

        // Validar que se proporcione al menos un campo para actualizar
        if (!nombre && !apellido && !telefono && !email && !direccion) {
            res.status(400).json({
                error: 'Datos requeridos',
                message: 'Debe proporcionar al menos un campo para actualizar'
            });
            return;
        }

        // Validar formato de email si se proporciona
        if (email && !esEmailValido(email)) {
            res.status(400).json({
                error: 'Email inválido',
                message: 'El formato del email no es válido'
            });
            return;
        }

        // Validar formato de teléfono si se proporciona
        if (telefono && !esTelefonoValido(telefono)) {
            res.status(400).json({
                error: 'Teléfono inválido',
                message: 'El formato del teléfono no es válido'
            });
            return;
        }

        const db = getDatabase();

        // Construir objeto de actualización
        const actualizacion: any = {
            fechaActualizacion: new Date()
        };

        if (nombre) actualizacion.nombre = nombre;
        if (apellido) actualizacion.apellido = apellido;
        if (telefono) actualizacion.telefono = telefono;
        if (email) actualizacion.email = email;
        if (direccion) actualizacion.direccion = direccion;

        // Actualizar perfil
        const resultado = await db.collection('perfiles').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: actualizacion },
            { returnDocument: 'after' }
        );

        if (!resultado) {
            res.status(404).json({
                error: 'Perfil no encontrado',
                message: 'No existe un perfil con el ID proporcionado'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado exitosamente',
            data: resultado
        });
    } catch (error) {
        console.error('Error actualizando perfil:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}

// DELETE - Eliminar perfil
export async function eliminarPerfil(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        const db = getDatabase();

        // Eliminar perfil
        const resultado = await db.collection('perfiles').deleteOne({
            _id: new ObjectId(id)
        });

        if (resultado.deletedCount === 0) {
            res.status(404).json({
                error: 'Perfil no encontrado',
                message: 'No existe un perfil con el ID proporcionado'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Perfil eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error eliminando perfil:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}
