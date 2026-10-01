import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Fields() {
  const [fields, setFields] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fieldName: '',
    area: '',
    soilType: '',
    location: '',
    irrigationType: ''
  });

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    try {
      const response = await api.get('/fields');
      setFields(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load fields.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await api.post('/fields', {
        ...form,
        area: form.area ? Number(form.area) : null
      });
      setForm({ fieldName: '', area: '', soilType: '', location: '', irrigationType: '' });
      setShowForm(false);
      await loadFields();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add field.');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Fields</h2>
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Field'}
        </button>
      </div>

      <ContextGuide
        eyebrow="Build your farm map"
        title="Start with the land you manage."
        description="Add each field with its area, soil and irrigation details. That information powers crop plans and rotation recommendations."
        actions={[{ label: 'View crop planning', to: '/crop-planning' }, { label: 'See rotation advice', to: '/rotation' }]}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="fieldName" className="form-label">Field Name</label>
                <input id="fieldName" className="form-control" value={form.fieldName} onChange={event => setForm({ ...form, fieldName: event.target.value })} placeholder="Example: North Field" required />
              </div>
              <div className="col-md-4">
                <label htmlFor="area" className="form-label">Area</label>
                <input id="area" type="number" min="0" step="0.01" className="form-control" value={form.area} onChange={event => setForm({ ...form, area: event.target.value })} />
              </div>
              <div className="col-md-4">
                <label htmlFor="soilType" className="form-label">Soil Type</label>
                <input id="soilType" className="form-control" value={form.soilType} onChange={event => setForm({ ...form, soilType: event.target.value })} placeholder="Example: Loam" />
              </div>
              <div className="col-md-4">
                <label htmlFor="location" className="form-label">Location</label>
                <input id="location" className="form-control" value={form.location} onChange={event => setForm({ ...form, location: event.target.value })} placeholder="Example: East side" />
              </div>
              <div className="col-md-4">
                <label htmlFor="irrigationType" className="form-label">Irrigation</label>
                <input id="irrigationType" className="form-control" value={form.irrigationType} onChange={event => setForm({ ...form, irrigationType: event.target.value })} />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">Save Field</button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      <div className="card shadow-sm border-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Field Name</th>
              <th>Area</th>
              <th>Soil Type</th>
              <th>Location</th>
              <th>Irrigation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(f => (
              <tr key={f.id}>
                <td>{f.fieldName}</td>
                <td>{f.area}</td>
                <td>{f.soilType}</td>
                <td>{f.location}</td>
                <td>{f.irrigationType}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
            {fields.length === 0 && (
              <tr><td colSpan="6" className="text-center py-3">No fields added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fields;
