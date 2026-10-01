import React, { useEffect, useState } from 'react';
import api from '../api';
import ContextGuide from '../components/ContextGuide';

function CropRotation() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    api.get('/fields').then(res => setFields(res.data)).catch(console.error);
  }, []);

  const handleFieldChange = async (e) => {
    const fieldId = e.target.value;
    setSelectedField(fieldId);
    if (!fieldId) {
      setRecommendation(null);
      return;
    }
    try {
      const res = await api.get(`/crop-plans/rotation/${fieldId}`);
      setRecommendation(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Crop Rotation Recommendation</h2>

      <ContextGuide
        eyebrow="Protect your soil"
        title="Use rotation to plan the next season."
        description="Select a field to see what was planted before and which crops can help balance the next growing cycle."
        actions={[{ label: 'Review current plans', to: '/crop-planning' }]}
      />
      
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <label className="form-label">Select Field to get recommendations:</label>
          <select className="form-select w-50" value={selectedField} onChange={handleFieldChange}>
            <option value="">Select Field...</option>
            {fields.map(f => <option key={f.id} value={f.id}>{f.fieldName}</option>)}
          </select>
        </div>
      </div>

      {recommendation && (
        <div className="card shadow-sm border-0 bg-light">
          <div className="card-body">
            <h5 className="text-success mb-3">Recommendation Results</h5>
            <p><strong>Previous Crop:</strong> {recommendation.previousCrop}</p>
            <p><strong>Reason:</strong> {recommendation.reason}</p>
            
            <h6 className="mt-4">Recommended Next Crops:</h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {recommendation.recommendedCrops.map(c => (
                <span key={c.id} className="badge bg-success p-2 fs-6">{c.cropName} ({c.cropType})</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropRotation;
