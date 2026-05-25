const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
  repo: { type: String, required: true },
  branch: { type: String, required: true },
  commitHash: { type: String, required: true },
  version: { type: String, required: true },
  containerId: { type: String, default: null },
  status: {
    type: String,
    enum: ['PENDING', 'QUEUED', 'BUILDING', 'DEPLOYING', 'HEALTH_CHECKING', 'SUCCESS', 'FAILED', 'ROLLED_BACK'],
    default: 'PENDING',
    required: true
  },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', default: null },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  startedAt: { type: Date, default: null },
  finishedAt: { type: Date, default: null }
}, {
  timestamps: true 
});

deploymentSchema.index({ status: 1 });
deploymentSchema.index({ repo: 1, branch: 1 });
deploymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Deployment', deploymentSchema);
