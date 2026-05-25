import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  githubRepoUrl: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    default: 'main',
  },
  port: {
    type: Number,
    required: true,
  },
  envVars: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  webhookSecret: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'failed'],
    default: 'active',
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
