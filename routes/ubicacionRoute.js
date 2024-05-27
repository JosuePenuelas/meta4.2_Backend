const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');
const authenticateJWT = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // Importa el middleware de subida de archivos

// Rutas para los activos
router.get('/', authenticateJWT, ubicacionController.getAll);
router.get('/:id', authenticateJWT, ubicacionController.getById);
router.post('/', authenticateJWT, upload.single('imagen'), ubicacionController.create); // Modifica para aceptar un archivo
router.put('/:id', authenticateJWT, upload.single('imagen'), ubicacionController.update); // Modifica para aceptar un archivo
router.delete('/:id', authenticateJWT, ubicacionController.delete);

module.exports = router;
