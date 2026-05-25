import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import DeploymentCard from '../../components/DeploymentCard/DeploymentCard';
import { fetchDeployments } from '../../api/client';

const Dashboard = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;
    const loadDeployments = async () => {
      try {
        const data = await fetchDeployments();
        setDeployments(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    // Initial fetch
    loadDeployments();
    
    // Poll every 5 seconds
    intervalId = setInterval(loadDeployments, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Overview</h1>
          <p className="dashboard-subtitle">Monitor and manage your active deployments.</p>
        </div>
        <button className="primary-btn">New Deployment</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Active Deployments</span>
          <h2 className="stat-value">{deployments.filter(d => ['BUILDING', 'DEPLOYING', 'HEALTH_CHECKING'].includes(d.status)).length}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <h2 className="stat-value">{deployments.length}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-label">Failed</span>
          <h2 className="stat-value failed">{deployments.filter(d => ['FAILED', 'ROLLED_BACK'].includes(d.status)).length}</h2>
        </div>
      </section>

      <section className="deployments-section">
        <h2 className="section-title">Recent Activity</h2>
        
        {loading && <p>Loading deployments...</p>}
        {error && <p className="error-text">Error: {error}</p>}
        {!loading && !error && deployments.length === 0 && <p>No deployments found.</p>}
        
        {!loading && !error && deployments.length > 0 && (
          <div className="deployments-grid">
            {deployments.map(dep => (
              <DeploymentCard key={dep._id} deployment={dep} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
