const express = require('express');
const { env } = require('./config/env');

const healthRoutes = require('./routes/healthRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const deployRoutes = require('./routes/deployRoutes');

const app = express();
app.use(express.json());

// Register routes
app.use('/health', healthRoutes);
app.use('/webhook', webhookRoutes);
app.use('/deploy', deployRoutes);

app.listen(env.PORT, () => {
  console.log(`API running on port ${env.PORT}`);
});
