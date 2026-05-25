import { processWebhook } from '../services/webhookService.js';

export const handleWebhook = async (req, res) => {
  try {
    const result = await processWebhook(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
