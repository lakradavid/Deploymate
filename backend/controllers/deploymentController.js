import {
  triggerDeployment as triggerDeploymentService,
  getDeploymentStatus,
} from '../services/deploymentService.js';

export const triggerDeployment = async (req, res) => {
  try {
    const result = await triggerDeploymentService(req.body);
    res.status(202).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStatus = async (req, res) => {
  try {
    const status = await getDeploymentStatus(req.params.id);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
