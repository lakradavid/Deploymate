const Deployment = require('../models/Deployment');
const { deploymentQueue } = require('../queue/deploymentQueue');

exports.handleWebhook = async (req, res) => {
  try {
    const { repo, branch, commitHash, version, metadata } = req.body;

    if (!repo || !branch || !commitHash || !version) {
      return res.status(400).json({ error: 'Missing required deployment fields' });
    }

    // 1. Create Deployment Record
    const deployment = new Deployment({
      repo,
      branch,
      commitHash,
      version,
      status: 'QUEUED',
      metadata: metadata || {}
    });

    await deployment.save();

    // 2. Push Deployment Job to BullMQ
    await deploymentQueue.add('deploy', {
      deploymentId: deployment._id,
      repo,
      branch,
      commitHash,
      version
    });

    return res.status(201).json({
      message: 'Deployment queued successfully',
      deploymentId: deployment._id
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
