import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Fields', path: '/fields' },
    { label: 'Crops', path: '/crops' },
    { label: 'Crop Planning', path: '/crop-planning' },
    { label: 'Crop Rotation', path: '/rotation' },
    { label: 'Operations', path: '/operations' },
    { label: 'Expenses', path: '/expenses' },
    { label: 'Yield', path: '/yield' },
    { label: 'Equipment', path: '/equipment' },
    { label: 'Maintenance', path: '/maintenance' },
    { label: 'Reports', path: '/reports' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="app-sidebar">
      <Link to="/dashboard" className="brand-lockup">
        <span className="brand-mark">H</span>
        <span><strong>HarvestHub</strong><small>Field intelligence</small></span>
      </Link>
      <p className="sidebar-label">Workspace</p>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map(item => (
          <Link key={item.path} to={item.path} className={`sidebar-link ${location.pathname === item.path ? 'is-active' : ''}`}>
            <span className="nav-dot" />{item.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="season-note"><span className="season-icon">24</span><span><strong>Growing season</strong><small>Good morning, farmer</small></span></div>
        <button onClick={handleLogout} className="logout-button">Log out</button>
      </div>
    </aside>
  );
}

export default Sidebar;
