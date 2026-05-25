import express from 'express';
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/deployments', apiController.getDeployments);
router.get('/deployment/:id', apiController.getDeploymentById);
router.get('/logs/:deploymentId', apiController.getLogs);

module.exports = router;
