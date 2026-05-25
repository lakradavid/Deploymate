const deployService = require('../services/deployService');

const triggerDeploy = (req, res) => {
  const deployParams = req.body;
  deployService.startDeploy(deployParams);
  res.status(202).json({ message: 'Deployment triggered' });
};

module.exports = {
  triggerDeploy
};
