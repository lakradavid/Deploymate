import React, { useEffect, useRef } from 'react';

export const LiveLogStream = ({ logs = [] }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!logs || logs.length === 0) {
    return (
      <div className="log-viewer" style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
        No logs available.
      </div>
    );
  }

  return (
    <div className="log-viewer" ref={scrollRef}>
      {logs.map((log, idx) => (
        <div key={idx} className="log-line">
          <span className="log-timestamp">
            {log.timestamp ? new Date(log.timestamp).toISOString().split('T')[1].slice(0, -1) : ''}
          </span>
          <span className="log-message">{log.message || log}</span>
        </div>
      ))}
    </div>
  );
};
