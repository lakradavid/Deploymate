const express = require('express');
const router = express.Router();
const deployController = require('../controllers/deployController');

router.post('/', deployController.triggerDeploy);

module.exports = router;
