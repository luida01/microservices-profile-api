import { Router } from 'express';
import { crearPerfil, actualizarPerfil, eliminarPerfil } from '../controllers/perfilController';
import { verificarAPIKey } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(verificarAPIKey);

// POST /create-profile
router.post('/create-profile', crearPerfil);

// PUT /update-profile/:id
router.put('/update-profile/:id', actualizarPerfil);

// DELETE /delete-profile/:id
router.delete('/delete-profile/:id', eliminarPerfil);

export default router;
