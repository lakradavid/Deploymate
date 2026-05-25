const DeploymentLog = require('../models/deploymentLogModel');

/**
 * Creates a new deployment log entry and saves it to the deploymentLogs collection.
 * 
 * @param {string} deploymentId - The unique identifier of the deployment
 * @param {string} message - The log message detailing what happened
 * @param {string} status - The status of the event (e.g., INFO, SUCCESS, ERROR)
 * @returns {Promise<Object>} The saved log document
 */
const createLog = async (deploymentId, message, status = 'INFO') => {
  try {
    const logEntry = new DeploymentLog({
      deploymentId,
      message,
      status
    });
    
    const savedLog = await logEntry.save();
    return savedLog;
  } catch (error) {
    console.error(`Failed to create deployment log for deploymentId: ${deploymentId}`, error);
    throw new Error('Failed to create deployment log');
  }
};

module.exports = {
  createLog
};
