import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Crops() {
  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ cropName: '', cropType: '', season: '', durationDays: '' });

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      const response = await api.get('/crops');
      setCrops(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load crops.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await api.post('/crops', {
        ...form,
        durationDays: form.durationDays ? Number(form.durationDays) : null
      });
      setForm({ cropName: '', cropType: '', season: '', durationDays: '' });
      setShowForm(false);
      await loadCrops();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add crop.');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Crops</h2>
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Crop'}
        </button>
      </div>

      <ContextGuide
        eyebrow="Create your crop library"
        title="Save the crops you grow most."
        description="Include the season and growing duration once, then reuse the crop in plans, rotation suggestions and yield tracking."
        actions={[{ label: 'Plan a crop', to: '/crop-planning' }, { label: 'View yield data', to: '/yield' }]}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label htmlFor="cropName" className="form-label">Crop Name</label>
                <input id="cropName" className="form-control" value={form.cropName} onChange={event => setForm({ ...form, cropName: event.target.value })} placeholder="Example: Rice" required />
              </div>
              <div className="col-md-3">
                <label htmlFor="cropType" className="form-label">Type</label>
                <input id="cropType" className="form-control" value={form.cropType} onChange={event => setForm({ ...form, cropType: event.target.value })} placeholder="Example: Cereal" />
              </div>
              <div className="col-md-3">
                <label htmlFor="season" className="form-label">Season</label>
                <input id="season" className="form-control" value={form.season} onChange={event => setForm({ ...form, season: event.target.value })} placeholder="Example: Kharif" />
              </div>
              <div className="col-md-3">
                <label htmlFor="durationDays" className="form-label">Duration (Days)</label>
                <input id="durationDays" type="number" min="1" className="form-control" value={form.durationDays} onChange={event => setForm({ ...form, durationDays: event.target.value })} />
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary">Save Crop</button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      <div className="card shadow-sm border-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Crop Name</th>
              <th>Type</th>
              <th>Season</th>
              <th>Duration (Days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(c => (
              <tr key={c.id}>
                <td>{c.cropName}</td>
                <td>{c.cropType}</td>
                <td>{c.season}</td>
                <td>{c.durationDays}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
            {crops.length === 0 && (
              <tr><td colSpan="5" className="text-center py-3">No crops added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Crops;
