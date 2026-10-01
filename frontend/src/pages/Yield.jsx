import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Yield() {
	const [fields, setFields] = useState([]);
	const [crops, setCrops] = useState([]);
	const [yields, setYields] = useState([]);
	const [error, setError] = useState('');
	const [form, setForm] = useState({ fieldId: '', cropId: '', expectedQuantity: '', actualQuantity: '', unit: 'kg', harvestDate: '' });

	useEffect(() => {
		Promise.all([api.get('/fields'), api.get('/crops'), api.get('/yields')]).then(([fieldResponse, cropResponse, yieldResponse]) => {
			setFields(fieldResponse.data); setCrops(cropResponse.data); setYields(yieldResponse.data);
			setForm(current => ({ ...current, fieldId: fieldResponse.data[0] ? String(fieldResponse.data[0].id) : '', cropId: cropResponse.data[0] ? String(cropResponse.data[0].id) : '' }));
		}).catch(() => setError('Unable to load yield data.'));
	}, []);

	const cropName = id => crops.find(crop => String(crop.id) === String(id))?.cropName || `Crop #${id}`;
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			await api.post(`/yields?fieldId=${form.fieldId}&cropId=${form.cropId}`, { expectedQuantity: Number(form.expectedQuantity), actualQuantity: Number(form.actualQuantity), unit: form.unit, harvestDate: form.harvestDate });
			const response = await api.get('/yields'); setYields(response.data);
			setForm(current => ({ ...current, expectedQuantity: '', actualQuantity: '', harvestDate: '' }));
		} catch (err) { setError(err.response?.data?.message || 'Unable to save yield.'); }
	};

	const deleteYield = async id => {
		try { await api.delete(`/yields/${id}`); setYields(yields.filter(item => item.id !== id)); }
		catch (err) { setError('Unable to delete yield.'); }
	};

	return (
		<div className="workspace-page">
			<p className="eyebrow">Harvest evidence</p>
			<h2>Crop Yield</h2>
			<ContextGuide eyebrow="Learn from every harvest" title="Record actual yield beside the estimate." description="When harvest day arrives, add the actual result to your crop plan. Reports will reveal which crops and fields are performing best." actions={[{ label: 'Open reports', to: '/reports' }, { label: 'Review crop plans', to: '/crop-planning' }]} />
			{error && <div className="alert alert-danger">{error}</div>}
			{!fields.length || !crops.length ? <div className="alert alert-info">Create at least one field and one crop before recording yield.</div> : <>
				<div className="card shadow-sm border-0 mb-4"><div className="card-body"><form onSubmit={handleSubmit}><div className="row g-3">
					<div className="col-md-3"><label className="form-label">Field</label><select className="form-select" value={form.fieldId} onChange={event => setForm({ ...form, fieldId: event.target.value })}>{fields.map(field => <option key={field.id} value={field.id}>{field.fieldName}</option>)}</select></div>
					<div className="col-md-3"><label className="form-label">Crop</label><select className="form-select" value={form.cropId} onChange={event => setForm({ ...form, cropId: event.target.value })}>{crops.map(crop => <option key={crop.id} value={crop.id}>{crop.cropName}</option>)}</select></div>
					<div className="col-md-2"><label className="form-label">Expected</label><input type="number" min="0" step="0.01" className="form-control" value={form.expectedQuantity} onChange={event => setForm({ ...form, expectedQuantity: event.target.value })} placeholder="Example: 1000" required /></div>
					<div className="col-md-2"><label className="form-label">Actual</label><input type="number" min="0" step="0.01" className="form-control" value={form.actualQuantity} onChange={event => setForm({ ...form, actualQuantity: event.target.value })} placeholder="Example: 900" required /></div>
					<div className="col-md-2"><label className="form-label">Unit / Date</label><input className="form-control mb-2" value={form.unit} onChange={event => setForm({ ...form, unit: event.target.value })} placeholder="Example: kg" required /><input type="date" className="form-control" value={form.harvestDate} onChange={event => setForm({ ...form, harvestDate: event.target.value })} required /></div>
					<div className="col-12 text-end"><button className="btn btn-success">Record Yield</button></div>
				</div></form></div></div>
				<div className="card shadow-sm border-0"><div className="table-responsive"><table className="table table-hover mb-0"><thead className="table-light"><tr><th>Crop</th><th>Expected</th><th>Actual</th><th>Unit</th><th>Harvest Date</th><th /></tr></thead><tbody>{yields.map(item => <tr key={item.id}><td>{item.crop?.cropName || cropName(form.cropId)}</td><td>{item.expectedQuantity}</td><td>{item.actualQuantity}</td><td>{item.unit}</td><td>{item.harvestDate}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteYield(item.id)}>Delete</button></td></tr>)}{!yields.length && <tr><td colSpan="6" className="text-center py-3">No yield records yet.</td></tr>}</tbody></table></div></div>
			</>}
		</div>
	);
}
export default Yield;
