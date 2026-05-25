import React from 'react';

export const SkeletonLoader = ({ rows = 3, height = '40px', style }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          className="skeleton" 
          style={{ height, width: i % 2 === 0 ? '100%' : '85%', ...style }} 
        />
      ))}
    </div>
  );
};
