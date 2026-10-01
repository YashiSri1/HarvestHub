import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function Expenses() {
	const [fields, setFields] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [error, setError] = useState('');
	const [form, setForm] = useState({ fieldId: '', category: '', amount: '', expenseDate: '', description: '' });

	useEffect(() => {
		Promise.all([api.get('/fields'), api.get('/expenses')]).then(([fieldResponse, expenseResponse]) => {
			setFields(fieldResponse.data);
			setExpenses(expenseResponse.data);
			if (fieldResponse.data.length) setForm(current => ({ ...current, fieldId: String(fieldResponse.data[0].id) }));
		}).catch(() => setError('Unable to load expense data.'));
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			await api.post(`/expenses?fieldId=${form.fieldId}`, { category: form.category, amount: Number(form.amount), expenseDate: form.expenseDate, description: form.description });
			const response = await api.get('/expenses');
			setExpenses(response.data);
			setForm(current => ({ ...current, category: '', amount: '', expenseDate: '', description: '' }));
		} catch (err) { setError(err.response?.data?.message || 'Unable to save expense.'); }
	};

	const deleteExpense = async id => {
		try { await api.delete(`/expenses/${id}`); setExpenses(expenses.filter(expense => expense.id !== id)); }
		catch (err) { setError('Unable to delete expense.'); }
	};

	return (
		<div className="workspace-page">
			<p className="eyebrow">Money in the ground</p>
			<h2>Expenses</h2>
			<ContextGuide eyebrow="Make every input count" title="Track costs close to the work." description="Log seed, fertilizer, fuel and equipment costs while they are fresh. Your dashboard and reports will show the true cost of each season." actions={[{ label: 'View reports', to: '/reports' }, { label: 'Check equipment', to: '/equipment' }]} />
			{error && <div className="alert alert-danger">{error}</div>}
			{!fields.length ? <div className="alert alert-info">Create a field first, then add expenses against it.</div> : <>
				<div className="card shadow-sm border-0 mb-4"><div className="card-body"><form onSubmit={handleSubmit}><div className="row g-3">
					<div className="col-md-3"><label className="form-label">Field</label><select className="form-select" value={form.fieldId} onChange={event => setForm({ ...form, fieldId: event.target.value })}>{fields.map(field => <option key={field.id} value={field.id}>{field.fieldName}</option>)}</select></div>
					<div className="col-md-3"><label className="form-label">Category</label><input className="form-control" value={form.category} onChange={event => setForm({ ...form, category: event.target.value })} placeholder="Example: Fertilizer" required /></div>
					<div className="col-md-2"><label className="form-label">Amount</label><input type="number" min="0" step="0.01" className="form-control" value={form.amount} onChange={event => setForm({ ...form, amount: event.target.value })} required /></div>
					<div className="col-md-2"><label className="form-label">Date</label><input type="date" className="form-control" value={form.expenseDate} onChange={event => setForm({ ...form, expenseDate: event.target.value })} required /></div>
					<div className="col-md-2"><label className="form-label">Description</label><input className="form-control" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} placeholder="Example: 4 bags" /></div>
					<div className="col-12 text-end"><button className="btn btn-success">Add Expense</button></div>
				</div></form></div></div>
				<div className="card shadow-sm border-0"><div className="table-responsive"><table className="table table-hover mb-0"><thead className="table-light"><tr><th>Category</th><th>Amount</th><th>Date</th><th>Description</th><th /></tr></thead><tbody>{expenses.map(expense => <tr key={expense.id}><td>{expense.category}</td><td>{expense.amount}</td><td>{expense.expenseDate}</td><td>{expense.description || '-'}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteExpense(expense.id)}>Delete</button></td></tr>)}{!expenses.length && <tr><td colSpan="5" className="text-center py-3">No expenses recorded yet.</td></tr>}</tbody></table></div></div>
			</>}
		</div>
	);
}
export default Expenses;
