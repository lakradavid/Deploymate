const Deployment = require('../models/Deployment');
const DeploymentLog = require('../models/DeploymentLog');

exports.getDeployments = async (req, res) => {
  try {
    const deployments = await Deployment.find().sort({ createdAt: -1 });
    return res.json(deployments);
  } catch (error) {
    console.error('Error fetching deployments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDeploymentById = async (req, res) => {
  try {
    const deployment = await Deployment.findById(req.params.id);
    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }
    return res.json(deployment);
  } catch (error) {
    console.error('Error fetching deployment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await DeploymentLog.find({ deploymentId: req.params.deploymentId }).sort({ timestamp: 1 });
    return res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
