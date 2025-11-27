import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectToDatabase(): Promise<Db> {
    const uri = process.env.MONGODB_URI || 'mongodb://admin:password123@mongodb:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Conectado a MongoDB');
        db = client.db('perfiles_db');
        return db;
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error;
    }
}

export function getDatabase(): Db {
    if (!db) {
        throw new Error('Base de datos no inicializada');
    }
    return db;
}
