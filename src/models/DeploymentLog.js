const mongoose = require('mongoose');

const deploymentLogSchema = new mongoose.Schema({
  deploymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deployment', required: true },
  stage: { type: String, required: true },
  level: {
    type: String,
    enum: ['INFO', 'WARN', 'ERROR'],
    default: 'INFO',
    required: true
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, required: true }
}, {
  timestamps: false
});

deploymentLogSchema.index({ deploymentId: 1, timestamp: 1 });

module.exports = mongoose.model('DeploymentLog', deploymentLogSchema);
