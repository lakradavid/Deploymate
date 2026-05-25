const webhookService = require('../services/webhookService');

const handleWebhook = (req, res) => {
  const payload = req.body;
  webhookService.processPayload(payload);
  res.status(202).json({ message: 'Webhook accepted' });
};

module.exports = {
  handleWebhook
};
