import React from 'react';
import { usePolling } from '../hooks/usePolling';
import { apiClient } from '../api/client';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { Database, Server, Activity } from 'lucide-react';

export const SystemHealthOverview = () => {
  const { data, loading, error, refetch } = usePolling(() => apiClient.get('/health'), 10000);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">System Health</h1>
        <p className="page-subtitle">Infrastructure and dependency status</p>
      </div>

      {loading && !data ? <div className="card"><SkeletonLoader rows={4} /></div> : null}
      {error ? <div className="card"><ErrorState message={error} onRetry={refetch} /></div> : null}

      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                <Activity size={24} color="var(--status-health)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>API Server</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Uptime: {Math.floor(data.uptime || 0)}s</div>
              </div>
            </div>
            <StatusBadge status={data.status === 'healthy' ? 'SUCCESS' : 'FAILED'} />
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                <Database size={24} color="var(--status-deploying)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Database (MongoDB)</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Connection state</div>
              </div>
            </div>
            <StatusBadge status={data.dependencies?.database === 'connected' ? 'SUCCESS' : 'FAILED'} />
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                <Server size={24} color="var(--status-building)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Redis Cache & Queue</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>BullMQ backing store</div>
              </div>
            </div>
            <StatusBadge status={data.dependencies?.redis === 'connected' ? 'SUCCESS' : 'FAILED'} />
          </div>
        </div>
      )}
    </div>
  );
};
