import express from 'express';
import { triggerDeployment, getStatus } from '../controllers/deploymentController.js';

const router = express.Router();

router.post('/', triggerDeployment);
router.get('/:id/status', getStatus);

export default router;
