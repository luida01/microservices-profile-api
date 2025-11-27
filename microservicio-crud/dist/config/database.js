"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.getDatabase = getDatabase;
const mongodb_1 = require("mongodb");
let db;
async function connectToDatabase() {
    const uri = process.env.MONGODB_URI || 'mongodb://admin:password123@mongodb:27017';
    const client = new mongodb_1.MongoClient(uri);
    try {
        await client.connect();
        console.log('✅ Conectado a MongoDB');
        db = client.db('perfiles_db');
        return db;
    }
    catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error;
    }
}
function getDatabase() {
    if (!db) {
        throw new Error('Base de datos no inicializada');
    }
    return db;
}
