import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Equipment() {
	const [equipment, setEquipment] = useState([]);
	const [error, setError] = useState('');
	const [form, setForm] = useState({ name: '', type: '', purchaseDate: '', status: 'ACTIVE' });
	useEffect(() => { api.get('/equipment').then(response => setEquipment(response.data)).catch(() => setError('Unable to load equipment.')); }, []);
	const handleSubmit = async event => { event.preventDefault(); try { await api.post('/equipment', form); const response = await api.get('/equipment'); setEquipment(response.data); setForm({ name: '', type: '', purchaseDate: '', status: 'ACTIVE' }); } catch (err) { setError(err.response?.data?.message || 'Unable to save equipment.'); } };
	const deleteEquipment = async id => { try { await api.delete(`/equipment/${id}`); setEquipment(equipment.filter(item => item.id !== id)); } catch (err) { setError('Unable to delete equipment.'); } };
	return (
		<div className="workspace-page">
			<p className="eyebrow">Tools of the trade</p>
			<h2>Equipment</h2>
			<ContextGuide eyebrow="Know what is ready" title="Keep machines ahead of the season." description="Add tractors, pumps and other equipment here, then use maintenance reminders to avoid preventable downtime." actions={[{ label: 'Review maintenance', to: '/maintenance' }, { label: 'Track expenses', to: '/expenses' }]} />
			{error && <div className="alert alert-danger">{error}</div>}
			<div className="card shadow-sm border-0 mb-4"><div className="card-body"><form onSubmit={handleSubmit}><div className="row g-3"><div className="col-md-3"><label className="form-label">Name</label><input className="form-control" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required /></div><div className="col-md-3"><label className="form-label">Type</label><input className="form-control" value={form.type} onChange={event => setForm({ ...form, type: event.target.value })} required /></div><div className="col-md-3"><label className="form-label">Purchase Date</label><input type="date" className="form-control" value={form.purchaseDate} onChange={event => setForm({ ...form, purchaseDate: event.target.value })} required /></div><div className="col-md-2"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option>ACTIVE</option><option>INACTIVE</option><option>REPAIR</option></select></div><div className="col-md-1 d-flex align-items-end"><button className="btn btn-success">Add</button></div></div></form></div></div>
			<div className="card shadow-sm border-0"><div className="table-responsive"><table className="table table-hover mb-0"><thead className="table-light"><tr><th>Name</th><th>Type</th><th>Purchase Date</th><th>Status</th><th /></tr></thead><tbody>{equipment.map(item => <tr key={item.id}><td>{item.name}</td><td>{item.type}</td><td>{item.purchaseDate}</td><td>{item.status}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteEquipment(item.id)}>Delete</button></td></tr>)}{!equipment.length && <tr><td colSpan="5" className="text-center py-3">No equipment added yet.</td></tr>}</tbody></table></div></div>
		</div>
	);
}
export default Equipment;
