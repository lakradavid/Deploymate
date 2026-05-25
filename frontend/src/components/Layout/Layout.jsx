import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>DeployMate</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li><a href="#">Repositories</a></li>
            <li><a href="#">Workers</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
      </aside>
      
      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-search">
            <input type="text" placeholder="Search deployments..." />
          </div>
          <div className="topbar-profile">
            <div className="avatar">A</div>
            <span>Admin</span>
          </div>
        </header>
        
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
