import React from 'react';
import { usePolling } from '../hooks/usePolling';
import { apiClient } from '../api/client';
import { StatusBadge } from '../components/StatusBadge';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';

export const WorkerStatusPanel = () => {
  // We'll use the health endpoint for now since there's no dedicated worker endpoint
  const { data, loading, error, refetch } = usePolling(() => apiClient.get('/health'), 10000);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Worker Status</h1>
        <p className="page-subtitle">Monitor BullMQ worker queues and processing health</p>
      </div>

      <div className="card">
        {loading && !data ? <SkeletonLoader rows={4} /> : null}
        {error ? <ErrorState message={error} onRetry={refetch} /> : null}

        {data && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>deployment-queue</h3>
              <StatusBadge status={data.status === 'healthy' ? 'SUCCESS' : 'FAILED'} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Jobs</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--status-deploying)' }}>1</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Waiting</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>0</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Failed</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--status-failed)' }}>2</div>
              </div>
            </div>
            
            <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Note: This is a placeholder panel based on system health data. Real BullMQ integration requires a dedicated backend metrics endpoint.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
