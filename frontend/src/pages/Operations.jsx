import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Operations() {
	const [fields, setFields] = useState([]);
	const [operations, setOperations] = useState([]);
	const [fieldId, setFieldId] = useState('');
	const [error, setError] = useState('');
	const [form, setForm] = useState({ operationType: '', operationDate: '', cost: '', notes: '', status: 'COMPLETED' });

	useEffect(() => {
		api.get('/fields').then(response => {
			setFields(response.data);
			if (response.data.length) setFieldId(String(response.data[0].id));
		}).catch(() => setError('Unable to load fields.'));
	}, []);

	useEffect(() => {
		if (!fieldId) return;
		api.get(`/operations?fieldId=${fieldId}`).then(response => setOperations(response.data)).catch(() => setError('Unable to load operations.'));
	}, [fieldId]);

	const handleSubmit = async event => {
		event.preventDefault();
		setError('');
		try {
			await api.post(`/operations?fieldId=${fieldId}`, { ...form, cost: form.cost ? Number(form.cost) : null });
			setForm({ operationType: '', operationDate: '', cost: '', notes: '', status: 'COMPLETED' });
			const response = await api.get(`/operations?fieldId=${fieldId}`);
			setOperations(response.data);
		} catch (err) {
			setError(err.response?.data?.message || 'Unable to save operation.');
		}
	};

	const deleteOperation = async id => {
		try {
			await api.delete(`/operations/${id}`);
			setOperations(operations.filter(operation => operation.id !== id));
		} catch (err) {
			setError('Unable to delete operation.');
		}
	};

	return (
		<div className="workspace-page">
			<p className="eyebrow">Daily log</p>
			<h2>Operations</h2>
			<ContextGuide eyebrow="Keep a field diary" title="Record the work as it happens." description="Log ploughing, sowing, irrigation and fertilization against a crop plan so your season history stays complete." actions={[{ label: 'Open crop plans', to: '/crop-planning' }, { label: 'View fields', to: '/fields' }]} />
			{error && <div className="alert alert-danger">{error}</div>}
			{!fields.length ? <div className="alert alert-info">Create a field first, then add operations against it.</div> : <>
				<div className="card shadow-sm border-0 mb-4"><div className="card-body">
					<form onSubmit={handleSubmit}><div className="row g-3">
						<div className="col-md-4"><label className="form-label">Field</label><select className="form-select" value={fieldId} onChange={event => setFieldId(event.target.value)}>{fields.map(field => <option key={field.id} value={field.id}>{field.fieldName}</option>)}</select></div>
						<div className="col-md-4"><label className="form-label">Operation</label><input className="form-control" value={form.operationType} onChange={event => setForm({ ...form, operationType: event.target.value })} placeholder="Example: Irrigation" required /></div>
						<div className="col-md-4"><label className="form-label">Date</label><input type="date" className="form-control" value={form.operationDate} onChange={event => setForm({ ...form, operationDate: event.target.value })} required /></div>
						<div className="col-md-4"><label className="form-label">Cost</label><input type="number" min="0" step="0.01" className="form-control" value={form.cost} onChange={event => setForm({ ...form, cost: event.target.value })} /></div>
						<div className="col-md-4"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option>PLANNED</option><option>IN_PROGRESS</option><option>COMPLETED</option></select></div>
						<div className="col-md-4"><label className="form-label">Notes</label><input className="form-control" value={form.notes} onChange={event => setForm({ ...form, notes: event.target.value })} placeholder="Example: North rows completed" /></div>
						<div className="col-12 text-end"><button className="btn btn-success" type="submit">Add Operation</button></div>
					</div></form>
				</div></div>
				<div className="card shadow-sm border-0"><div className="table-responsive"><table className="table table-hover mb-0"><thead className="table-light"><tr><th>Operation</th><th>Date</th><th>Cost</th><th>Status</th><th>Notes</th><th /></tr></thead><tbody>{operations.map(operation => <tr key={operation.id}><td>{operation.operationType}</td><td>{operation.operationDate}</td><td>{operation.cost ?? '-'}</td><td>{operation.status}</td><td>{operation.notes || '-'}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteOperation(operation.id)}>Delete</button></td></tr>)}{!operations.length && <tr><td colSpan="6" className="text-center py-3">No operations for this field yet.</td></tr>}</tbody></table></div></div>
			</>}
		</div>
	);
}
export default Operations;
