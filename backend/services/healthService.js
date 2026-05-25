export const checkSystemHealth = async () => {
  // In a real application, check DB connections, Redis, etc.
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
};
