import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DeploymentDetails.css';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { fetchDeploymentById, fetchDeploymentLogs } from '../../api/client';

const DeploymentDetails = () => {
  const { id } = useParams();
  const [deployment, setDeployment] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [depData, logsData] = await Promise.all([
          fetchDeploymentById(id),
          fetchDeploymentLogs(id)
        ]);
        setDeployment(depData);
        setLogs(logsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div className="details-container"><p>Loading deployment details...</p></div>;
  if (error) return <div className="details-container"><p className="error-text">Error: {error}</p></div>;
  if (!deployment) return <div className="details-container"><p>Deployment not found.</p></div>;

  return (
    <div className="details-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      
      <header className="details-header">
        <div>
          <h1 className="details-title">{deployment.repo}</h1>
          <p className="details-subtitle">ID: {deployment._id}</p>
        </div>
        <StatusBadge status={deployment.status} />
      </header>

      <section className="details-info-grid">
        <div className="info-box">
          <span className="info-label">Branch</span>
          <span className="info-value">{deployment.branch}</span>
        </div>
        <div className="info-box">
          <span className="info-label">Commit</span>
          <span className="info-value dc-mono">{deployment.commitHash}</span>
        </div>
        <div className="info-box">
          <span className="info-label">Version</span>
          <span className="info-value">{deployment.version}</span>
        </div>
        <div className="info-box">
          <span className="info-label">Created</span>
          <span className="info-value">{new Date(deployment.createdAt).toLocaleString()}</span>
        </div>
      </section>

      <section className="logs-section">
        <h2 className="section-title">Deployment Logs</h2>
        <div className="terminal-window">
          {logs.length === 0 ? (
            <div className="terminal-empty">No logs available for this deployment yet.</div>
          ) : (
            logs.map(log => (
              <div key={log._id} className={`log-line log-${log.level.toLowerCase()}`}>
                <span className="log-time">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className="log-stage">[{log.stage}]</span>
                <span className="log-msg">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default DeploymentDetails;
