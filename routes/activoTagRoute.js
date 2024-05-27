const express = require('express');
const router = express.Router();
const activoTagsController = require('../controllers/activoTagController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', authenticateJWT, activoTagsController.getAll);
router.post('/asignar', authenticateJWT, activoTagsController.assignTagToActivo);
router.delete('/desasignar', authenticateJWT, activoTagsController.unassignTagFromActivo);

module.exports = router;
