// Conectar a la base de datos
db = db.getSiblingDB('perfiles_db');

// Crear colección de API Keys
db.createCollection('api_keys');

// Insertar API Keys de ejemplo
db.api_keys.insertMany([
    {
        key: 'ms-lectura-key-12345',
        servicio: 'microservicio-lectura',
        activa: true,
        fechaCreacion: new Date()
    },
    {
        key: 'ms-crud-key-67890',
        servicio: 'microservicio-crud',
        activa: true,
        fechaCreacion: new Date()
    },
    {
        key: 'cliente-externo-key-abcde',
        servicio: 'cliente-externo',
        activa: true,
        fechaCreacion: new Date()
    }
]);

// Crear colección de perfiles
db.createCollection('perfiles');

// Crear índice único en email
db.perfiles.createIndex({ email: 1 }, { unique: true });

// Insertar perfiles de ejemplo
db.perfiles.insertMany([
    {
        nombre: 'Juan',
        apellido: 'Pérez',
        telefono: '+1-555-0101',
        email: 'juan.perez@example.com',
        direccion: '123 Main St, Ciudad, País',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
    },
    {
        nombre: 'María',
        apellido: 'González',
        telefono: '+1-555-0102',
        email: 'maria.gonzalez@example.com',
        direccion: '456 Oak Ave, Ciudad, País',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
    }
]);

print('✅ Base de datos inicializada correctamente');
