import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = (s) => {
    switch (s.toUpperCase()) {
      case 'PENDING':
      case 'QUEUED':
        return 'status-pending';
      case 'BUILDING':
      case 'DEPLOYING':
        return 'status-building';
      case 'SUCCESS':
        return 'status-success';
      case 'FAILED':
      case 'ROLLED_BACK':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  const isAnimated = status === 'BUILDING' || status === 'DEPLOYING';

  return (
    <div className={`status-badge ${getStatusClass(status)}`}>
      <span className={`status-dot ${isAnimated ? 'animated' : ''}`}></span>
      <span className="status-text">{status}</span>
    </div>
  );
};

export default StatusBadge;
