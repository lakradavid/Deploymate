import React from 'react';
import { usePolling } from '../hooks/usePolling';
import { apiClient } from '../api/client';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { data, loading, error, refetch } = usePolling(() => apiClient.get('/deployments?limit=5'), 5000);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Overview</h1>
        <p className="page-subtitle">Platform health and recent activity</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Deployments</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600 }}>{loading ? '...' : (data?.meta?.total || 0)}</div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Success Rate</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--status-success)' }}>98.5%</div>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Workers</h3>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--status-deploying)' }}>3</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Deployments</h2>
          <Link to="/deployments" style={{ fontSize: '0.85rem', color: 'var(--status-deploying)' }}>View All</Link>
        </div>
        
        {loading && !data ? <SkeletonLoader rows={5} /> : null}
        {error ? <ErrorState message={error} onRetry={refetch} /> : null}
        
        {!loading && !error && data?.deployments?.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No recent deployments.</div>
        ) : null}

        {data?.deployments?.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.deployments.map(dep => (
                <tr key={dep.id}>
                  <td><Link to={`/deployment/${dep.id}`} style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{dep.id.substring(0,8)}</Link></td>
                  <td>{dep.projectId}</td>
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
