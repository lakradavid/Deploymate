import mongoose from 'mongoose';

const deploymentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  commitHash: {
    type: String,
    required: true,
  },
  commitMessage: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'building', 'deploying', 'success', 'failed'],
    default: 'pending',
  },
  logs: [{
    type: String
  }],
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
}, { timestamps: true });

const Deployment = mongoose.model('Deployment', deploymentSchema);

export default Deployment;
