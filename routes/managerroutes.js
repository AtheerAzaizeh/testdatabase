const express = require('express');
const router = express.Router();
const ManagerController = require('../controllers/managerController');
const { validateManager } = require('../middleware/validateManager');

router.post('/managers', validateManager, ManagerController.createManager);
router.get('/managers', ManagerController.getManagers);
router.get('/managers/:id', ManagerController.getManagerById);
router.put('/managers/:id', validateManager, ManagerController.updateManager);
router.delete('/managers/:id', ManagerController.deleteManager);

module.exports = router;