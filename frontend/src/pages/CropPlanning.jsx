import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function CropPlanning() {
  const [plans, setPlans] = useState([]);
  const [fields, setFields] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [form, setForm] = useState({ fieldId: '', cropId: '', sowingDate: '', notes: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const results = await Promise.allSettled([
      api.get('/crop-plans'),
      api.get('/fields'),
      api.get('/crops')
    ]);

    const [plansResult, fieldsResult, cropsResult] = results;
    const failedResources = [];

    if (plansResult.status === 'fulfilled') setPlans(plansResult.value.data);
    else failedResources.push('plans');
    if (fieldsResult.status === 'fulfilled') setFields(fieldsResult.value.data);
    else failedResources.push('fields');
    if (cropsResult.status === 'fulfilled') setCrops(cropsResult.value.data);
    else failedResources.push('crops');

    setLoadError(failedResources.length > 0
      ? `Some planning data could not be loaded: ${failedResources.join(', ')}.`
      : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/crop-plans', form);
      fetchData();
      setForm({ fieldId: '', cropId: '', sowingDate: '', notes: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Crop Planning</h2>

      <ContextGuide
        eyebrow="Turn plans into harvests"
        title="Pair a crop with a field and date."
        description="Choose a field, select a crop and set the sowing date. HarvestHub will calculate the expected harvest window for you."
        actions={[{ label: 'Add a field', to: '/fields' }, { label: 'Add a crop', to: '/crops' }]}
      />

      {loadError && <div className="alert alert-warning">{loadError} You can still add fields and crops from their pages.</div>}
      
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h5 className="mb-3">Create New Plan</h5>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <label>Field</label>
              <select className="form-select" value={form.fieldId} onChange={e => setForm({...form, fieldId: e.target.value})} required>
                <option value="">{fields.length > 0 ? 'Select Field...' : 'No fields yet - add one first'}</option>
                {fields.map(f => <option key={f.id} value={f.id}>{f.fieldName}</option>)}
              </select>
              {fields.length === 0 && <small className="select-hint">Start in <Link to="/fields">Fields</Link>.</small>}
            </div>
            <div className="col-md-3">
              <label>Crop</label>
              <select className="form-select" value={form.cropId} onChange={e => setForm({...form, cropId: e.target.value})} required>
                <option value="">{crops.length > 0 ? 'Select Crop...' : 'No crops yet - add one first'}</option>
                {crops.map(c => <option key={c.id} value={c.id}>{c.cropName}</option>)}
              </select>
              {crops.length === 0 && <small className="select-hint">Start in <Link to="/crops">Crops</Link>.</small>}
            </div>
            <div className="col-md-3">
              <label>Sowing Date</label>
              <input type="date" className="form-control" value={form.sowingDate} onChange={e => setForm({...form, sowingDate: e.target.value})} required />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">Create Plan</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Field</th>
              <th>Crop</th>
              <th>Sowing Date</th>
              <th>Expected Harvest</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(p => (
              <tr key={p.id}>
                <td>{p.field.fieldName}</td>
                <td>{p.crop.cropName}</td>
                <td>{p.sowingDate}</td>
                <td>{p.expectedHarvestDate}</td>
                <td><span className={`badge bg-${p.status === 'ACTIVE' ? 'success' : 'primary'}`}>{p.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr><td colSpan="6" className="text-center py-3">No plans added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CropPlanning;
