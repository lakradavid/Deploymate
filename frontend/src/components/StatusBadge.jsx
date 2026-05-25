import React from 'react';

export const StatusBadge = ({ status }) => {
  const normalizedStatus = (status || 'PENDING').toUpperCase();
  return (
    <span className={`status-badge ${normalizedStatus}`}>
      <span className="status-dot"></span>
      {normalizedStatus}
    </span>
  );
};
