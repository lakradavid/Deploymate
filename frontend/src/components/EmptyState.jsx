import React from 'react';
import { Archive } from 'lucide-react';

export const EmptyState = ({ message = 'No data available', description }) => {
  return (
    <div className="empty-state">
      <Archive size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
      <h3 style={{ color: 'var(--text-primary)' }}>{message}</h3>
      {description && <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>{description}</p>}
    </div>
  );
};
