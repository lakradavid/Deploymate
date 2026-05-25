import express from "express";
import connectDB from "./Models/db.js";
import { createClient } from 'redis';
import healthRoutes from './routes/healthRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import deploymentRoutes from './routes/deploymentRoutes.js';


const app = express();

const client = createClient();
await client.connect();

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());


// Routes
app.use('/api/health', healthRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/deployment', deploymentRoutes);

await client.json.set('user:1', '$', {
  name: 'Alice',
  emails: ['alice@example.com', 'alice@work.com'],
  address: { city: 'NYC', zip: '10001' }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is running at: http://localhost:${PORT}`);
});
