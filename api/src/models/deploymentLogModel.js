import mongoose from "mongoose";

const deploymentLogSchema = new mongoose.Schema({
  deploymentId: {
    type: String,
    required: true,
    index: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['INFO', 'SUCCESS', 'FAILED', 'ERROR', 'WARN', 'PENDING', 'BUILDING'],
    default: 'INFO'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'deploymentLogs',
  timestamps: true
});

module.exports = mongoose.model('DeploymentLog', deploymentLogSchema);
