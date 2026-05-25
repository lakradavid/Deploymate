import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePolling } from '../hooks/usePolling';
import { apiClient } from '../api/client';
import { LiveLogStream } from '../components/LiveLogStream';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const DeploymentLogsViewer = () => {
  const { id } = useParams();
  const { data, loading, error } = usePolling(() => apiClient.get(`/logs/${id}`), 2000);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <div className="page-header" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to={`/deployment/${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} /> Back to details
          </Link>
          <h1 className="page-title" style={{ fontSize: '1.2rem', marginBottom: 0 }}>Deployment Logs: {id}</h1>
        </div>
        {loading && <Loader2 size={20} className="spinning" style={{ color: 'var(--text-secondary)' }} />}
      </div>
      
      {error && <div style={{ color: 'var(--status-failed)', padding: '1rem', backgroundColor: 'var(--status-failed-bg)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>Error loading logs: {error}</div>}

      <div style={{ flex: 1, backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
         <LiveLogStream logs={data?.logs || data || []} />
      </div>
    </div>
  );
};
