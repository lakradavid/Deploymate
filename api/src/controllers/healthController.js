const healthService = require('../services/healthService');

const checkHealth = (req, res) => {
  const status = healthService.getHealthStatus();
  res.status(200).json(status);
};

module.exports = {
  checkHealth
};
