"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfilController_1 = require("../controllers/perfilController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Todas las rutas requieren autenticación
router.use(auth_1.verificarAPIKey);
// POST /create-profile
router.post('/create-profile', perfilController_1.crearPerfil);
// PUT /update-profile/:id
router.put('/update-profile/:id', perfilController_1.actualizarPerfil);
// DELETE /delete-profile/:id
router.delete('/delete-profile/:id', perfilController_1.eliminarPerfil);
exports.default = router;
