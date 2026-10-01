import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  useEffect(() => {
    if (!token) return;

    api.get('/dashboard')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <Navigate to="/login" replace />;
  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-page">
      <div className="page-heading"><div><p className="eyebrow">{today}</p><h1>Good morning, let&apos;s grow.</h1><p className="page-subtitle">Your farm at a glance, from first sowing to final harvest.</p></div><Link to="/crop-planning" className="button button-primary">Plan a crop <span>→</span></Link></div>
      <section className="dashboard-hero">
        <div className="hero-copy"><span className="hero-kicker">This season</span><h2>Small decisions make<br />stronger harvests.</h2><p>Keep your fields, inputs, equipment and yields in one calm, clear view.</p><Link to="/fields" className="button button-light">View your fields <span>→</span></Link></div>
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85" alt="Sunlit rows of a green farm field" />
      </section>
      <div className="section-heading"><div><p className="eyebrow">Live overview</p><h2>Farm pulse</h2></div><span className="status-chip"><span /> Updated just now</span></div>
      <div className="stats-grid">
        <div className="stat-card stat-green"><span className="stat-label">Total fields</span><strong>{stats.totalFields}</strong><small>Land under management</small></div>
        <div className="stat-card stat-blue"><span className="stat-label">Active crops</span><strong>{stats.activeCrops}</strong><small>{stats.plannedCrops} planned next</small></div>
        <div className="stat-card stat-sand"><span className="stat-label">Total expenses</span><strong>${Number(stats.totalExpenses).toLocaleString()}</strong><small>Across your operation</small></div>
        <div className="stat-card stat-coral"><span className="stat-label">Maintenance due</span><strong>{stats.upcomingMaintenance + stats.overdueMaintenance}</strong><small>{stats.overdueMaintenance} overdue now</small></div>
      </div>
      <section className="quick-actions"><div><p className="eyebrow">Keep moving</p><h2>What needs your attention?</h2></div><div className="action-links"><Link to="/fields"><span>01</span>Add a field <b>↗</b></Link><Link to="/crops"><span>02</span>Register a crop <b>↗</b></Link><Link to="/maintenance"><span>03</span>Check maintenance <b>↗</b></Link></div></section>
    </div>
  );
}

export default Dashboard;
