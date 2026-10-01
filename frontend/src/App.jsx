import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Fields from './pages/Fields';
import Crops from './pages/Crops';
import CropPlanning from './pages/CropPlanning';
import CropRotation from './pages/CropRotation';
import Operations from './pages/Operations';
import Expenses from './pages/Expenses';
import Yield from './pages/Yield';
import Equipment from './pages/Equipment';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        {children}
      </main>
    </div>
  ) : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/fields" element={<PrivateRoute><Fields /></PrivateRoute>} />
        <Route path="/crops" element={<PrivateRoute><Crops /></PrivateRoute>} />
        <Route path="/crop-planning" element={<PrivateRoute><CropPlanning /></PrivateRoute>} />
        <Route path="/rotation" element={<PrivateRoute><CropRotation /></PrivateRoute>} />
        <Route path="/operations" element={<PrivateRoute><Operations /></PrivateRoute>} />
        <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
        <Route path="/yield" element={<PrivateRoute><Yield /></PrivateRoute>} />
        <Route path="/equipment" element={<PrivateRoute><Equipment /></PrivateRoute>} />
        <Route path="/maintenance" element={<PrivateRoute><Maintenance /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
