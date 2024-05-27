//google
const express = require('express');
const router = express.Router();
const activoController = require('../controllers/activoController');
const authenticateJWT = require('../middlewares/auth');
const upload = require('../middlewares/upload'); 

// Rutas para los activos protegidas por authenticateJWT
router.get('/', authenticateJWT, activoController.getAll);
router.get('/:id', authenticateJWT, activoController.getById);
router.post('/', authenticateJWT, upload.single('imagen'), activoController.create);
router.put('/:id', authenticateJWT, upload.single('imagen'), activoController.update);
router.delete('/:id', authenticateJWT, activoController.delete);

module.exports = router;
