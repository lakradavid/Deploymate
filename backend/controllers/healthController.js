import { checkSystemHealth } from '../services/healthService.js';

export const getHealth = async (req, res) => {
  try {
    const health = await checkSystemHealth();
    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
};
