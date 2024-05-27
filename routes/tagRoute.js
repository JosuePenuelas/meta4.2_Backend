const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authenticateJWT = require('../middlewares/auth');

// Rutas para los activos
router.get('/', authenticateJWT, tagController.getAll);
router.get('/:id', authenticateJWT, tagController.getById);
router.post('/', authenticateJWT, tagController.create);
router.put('/:id', authenticateJWT, tagController.update);
router.delete('/:id', authenticateJWT, tagController.delete);

module.exports = router;
