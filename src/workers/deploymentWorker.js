const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const Deployment = require('../models/Deployment');

const deploymentWorker = new Worker('deploymentQueue', async job => {
  const { deploymentId, repo, branch, commitHash } = job.data;
  
  console.log(`[Worker] Picked up deployment job: ${job.id}`);
  console.log(`[Worker] Deployment ID: ${deploymentId}`);
  console.log(`[Worker] Repo: ${repo} | Branch: ${branch} | Commit: ${commitHash}`);

  // In a real flow, you'd update status to 'BUILDING' etc.
  try {
    const deployment = await Deployment.findById(deploymentId);
    if (deployment) {
      deployment.status = 'BUILDING';
      await deployment.save();
      console.log(`[Worker] Updated deployment ${deploymentId} status to BUILDING`);
    }
  } catch (error) {
    console.error(`[Worker] Error handling job ${job.id}:`, error);
    throw error;
  }
  
  console.log(`[Worker] Finished processing job: ${job.id}`);
}, {
  connection: redisConnection
});

deploymentWorker.on('completed', job => {
  console.log(`[Worker] Job ${job.id} completed successfully`);
});

deploymentWorker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job.id} failed with error: ${err.message}`);
});

module.exports = deploymentWorker;
