import { Router } from 'express';
import { obtenerPerfil, listarPerfiles } from '../controllers/perfilController';
import { verificarAPIKey } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(verificarAPIKey);

// GET /get-profile?id=xxx o /get-profile?email=xxx
router.get('/get-profile', obtenerPerfil);

// GET /list-profiles?limite=10&pagina=1
router.get('/list-profiles', listarPerfiles);

export default router;
