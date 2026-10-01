import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Reports() {
  const [yields, setYields] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/yields/summary').then(res => setYields(res.data)).catch(console.error);
    api.get('/dashboard').then(res => setStats(res.data)).catch(console.error);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = stats ? [
    { name: 'Active Crops', value: stats.activeCrops },
    { name: 'Planned Crops', value: stats.plannedCrops },
  ] : [];

  return (
    <div>
      <h2 className="mb-4">Reports & Analytics</h2>

      <ContextGuide
        eyebrow="Read the season"
        title="Compare expectations with reality."
        description="The more yield records you add, the clearer these charts become. Use the gap between expected and actual yield to guide your next plan."
        actions={[{ label: 'Record a yield', to: '/yield' }, { label: 'Review expenses', to: '/expenses' }]}
      />

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Expected vs Actual Yield</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yields}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cropName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expected" fill="#8884d8" name="Expected Yield" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual Yield" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Crop Distribution</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
