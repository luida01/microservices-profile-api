export interface Perfil {
    _id?: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}
