import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePolling } from '../hooks/usePolling';
import { apiClient } from '../api/client';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ErrorState } from '../components/ErrorState';
import { StatusBadge } from '../components/StatusBadge';
import { LiveLogStream } from '../components/LiveLogStream';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const DeploymentDetails = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = usePolling(() => apiClient.get(`/deployment/${id}`), 3000);

  if (loading && !data) {
    return <div style={{ padding: '2rem' }}><SkeletonLoader rows={10} /></div>;
  }

  if (error && !data) {
    return <div style={{ padding: '2rem' }}><ErrorState message={error} onRetry={refetch} /></div>;
  }

  return (
    <div>
      <div className="page-header">
        <Link to="/deployments" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to deployments
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {data?.projectId || 'Unknown Project'}
              <StatusBadge status={data?.status} />
            </h1>
            <p className="page-subtitle">Deployment ID: {id}</p>
          </div>
          <Link to={`/deployment/${id}/logs`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '8px 16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
            <ExternalLink size={16} /> Fullscreen Logs
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div className="card" style={{ alignSelf: 'start' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Metadata</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Branch</div>
              <div style={{ fontWeight: 500 }}>{data?.branch || 'main'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Commit</div>
              <div style={{ fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{data?.commitId || 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Created At</div>
              <div>{data?.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed At</div>
              <div>{data?.completedAt ? new Date(data.completedAt).toLocaleString() : 'Pending'}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Live Logs</h3>
          <div style={{ flex: 1, minHeight: '400px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <LiveLogStream logs={data?.logs || []} />
          </div>
        </div>
      </div>
    </div>
  );
};
