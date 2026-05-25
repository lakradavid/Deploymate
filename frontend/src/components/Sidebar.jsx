import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, List, Activity, Settings, Terminal } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Deployments', path: '/deployments', icon: List },
    { name: 'Worker Status', path: '/worker', icon: Terminal },
    { name: 'System Health', path: '/health', icon: Activity },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/favicon.png" alt="Logo" className="sidebar-logo" />
        DeployMate
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
