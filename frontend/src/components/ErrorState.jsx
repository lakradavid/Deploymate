import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <AlertCircle size={32} style={{ marginBottom: '1rem' }} />
      <h3>Something went wrong</h3>
      <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', opacity: 0.8 }}>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--status-failed)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 500,
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};
