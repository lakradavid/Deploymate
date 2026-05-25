import React, { useState } from 'react';
import './DeploymentCard.css';
import StatusBadge from '../StatusBadge/StatusBadge';

const DeploymentCard = ({ deployment }) => {
  const [showLogs, setShowLogs] = useState(false);
  const { repo, branch, commitHash, version, status, createdAt, logs } = deployment;

  const timeAgo = new Date(createdAt).toLocaleString();

  return (
    <div className="deployment-card">
      <div className="dc-header">
        <h3 className="dc-repo">{repo}</h3>
        <StatusBadge status={status} />
      </div>
      <div className="dc-body">
        <div className="dc-row">
          <span className="dc-label">Branch</span>
          <span className="dc-value">{branch}</span>
        </div>
        <div className="dc-row">
          <span className="dc-label">Commit</span>
          <span className="dc-value dc-mono">{commitHash.substring(0, 7)}</span>
        </div>
        <div className="dc-row">
          <span className="dc-label">Version</span>
          <span className="dc-value">{version}</span>
        </div>
      </div>
      <div className="dc-footer">
        <span className="dc-time">{timeAgo}</span>
        <button className="dc-btn" onClick={() => setShowLogs(!showLogs)}>
          {showLogs ? 'Hide Logs' : 'View Logs'}
        </button>
      </div>
      {showLogs && (
        <div className="dc-logs-container">
          <pre className="dc-logs">{logs || 'No logs available.'}</pre>
        </div>
      )}
    </div>
  );
};

export default DeploymentCard;
