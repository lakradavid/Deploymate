const Deployment = require('../models/Deployment');
const DeploymentLog = require('../models/DeploymentLog');

exports.getDeployments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    let query = Deployment.find().sort({ createdAt: -1 });
    if (limit > 0) {
      query = query.limit(limit);
    }
    const deployments = await query;
    const total = await Deployment.countDocuments();
    
    // Map deployments for frontend compatibility
    const mappedDeployments = deployments.map(dep => {
      const depObj = dep.toJSON();
      return {
        id: depObj._id.toString(),
        projectId: depObj.repo, // repo maps to projectId in UI
        branch: depObj.branch,
        commitId: depObj.commitHash, // commitHash maps to commitId in UI
        status: depObj.status,
        createdAt: depObj.createdAt,
        completedAt: depObj.finishedAt
      };
    });

    return res.json({
      deployments: mappedDeployments,
      meta: {
        total
      }
    });
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
    const logs = await DeploymentLog.find({ deploymentId: req.params.id }).sort({ timestamp: 1 });
    
    const depObj = deployment.toJSON();
    depObj.id = depObj._id.toString();
    depObj.projectId = depObj.repo;
    depObj.commitId = depObj.commitHash;
    depObj.completedAt = depObj.finishedAt;
    
    // Map logs for frontend compatibility
    depObj.logs = logs.map(l => ({
      timestamp: l.timestamp,
      message: `[${l.stage}] [${l.level}] ${l.message}`
    }));

    return res.json(depObj);
  } catch (error) {
    console.error('Error fetching deployment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await DeploymentLog.find({ deploymentId: req.params.deploymentId }).sort({ timestamp: 1 });
    const formattedLogs = logs.map(l => ({
      timestamp: l.timestamp,
      message: `[${l.stage}] [${l.level}] ${l.message}`
    }));
    return res.json(formattedLogs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
