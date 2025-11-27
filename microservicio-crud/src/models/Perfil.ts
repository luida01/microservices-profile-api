import { ObjectId } from 'mongodb';

export interface Perfil {
    _id?: ObjectId;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}
