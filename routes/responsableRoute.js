const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsableController');
const authenticateJWT = require('../middlewares/auth');
const upload = require('../middlewares/upload'); 

router.get('/', authenticateJWT, responsableController.getAll);
router.get('/:id', authenticateJWT, responsableController.getById);
router.post('/', authenticateJWT, upload.single('imagen'), responsableController.create);
router.put('/:id', authenticateJWT, upload.single('imagen'), responsableController.update);
router.delete('/:id', authenticateJWT, responsableController.delete);

module.exports = router;