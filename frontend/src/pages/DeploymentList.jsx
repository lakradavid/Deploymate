import React from 'react';
import { usePolling } from '../hooks/usePolling';
import { apiClient } from '../api/client';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

export const DeploymentList = () => {
  const { data, loading, error, refetch } = usePolling(() => apiClient.get('/deployments'), 5000);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Deployments</h1>
          <p className="page-subtitle">View and manage all deployments across projects</p>
        </div>
        <button onClick={() => refetch()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)' }}>
          <RefreshCw size={14} className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading && !data ? <div style={{ padding: '2rem' }}><SkeletonLoader rows={8} /></div> : null}
        {error ? <div style={{ padding: '2rem' }}><ErrorState message={error} onRetry={refetch} /></div> : null}
        
        {!loading && !error && (!data?.deployments || data.deployments.length === 0) ? (
          <EmptyState message="No deployments found" description="When a deployment is triggered, it will appear here." />
        ) : null}

        {data?.deployments?.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Deployment ID</th>
                <th>Project</th>
                <th>Branch</th>
                <th>Commit</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {data.deployments.map(dep => (
                <tr key={dep.id}>
                  <td><Link to={`/deployment/${dep.id}`} style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{dep.id}</Link></td>
                  <td style={{ fontWeight: 500 }}>{dep.projectId}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{dep.branch || 'main'}</td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{dep.commitId?.substring(0,7) || 'N/A'}</td>
                  <td><StatusBadge status={dep.status} /></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{new Date(dep.createdAt || Date.now()).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
