const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const mongoose = require('mongoose');
const redisConnection = require('../config/redis');

router.get('/deployments', apiController.getDeployments);
router.get('/deployment/:id', apiController.getDeploymentById);
router.get('/logs/:deploymentId', apiController.getLogs);

// Health check endpoint — returns real MongoDB + Redis status
router.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected
  let redisStatus = 'disconnected';
  try {
    await redisConnection.ping();
    redisStatus = 'connected';
  } catch (_) {
    redisStatus = 'disconnected';
  }

  const healthy = dbState === 1 && redisStatus === 'connected';
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'degraded',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dependencies: {
      database: dbState === 1 ? 'connected' : 'disconnected',
      redis: redisStatus,
    },
  });
});

module.exports = router;
