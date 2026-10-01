import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

const guideImages = {
  crops: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80',
  fields: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80',
  land: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80',
  planning: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=700&q=80',
  plans: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=700&q=80',
  rotation: 'https://h2oglobalnews.com/wp-content/uploads/2025/05/Crop-Rotation-Helps-Conserve-Water-In-Agriculture.webp',
  soil: 'https://h2oglobalnews.com/wp-content/uploads/2025/05/Crop-Rotation-Helps-Conserve-Water-In-Agriculture.webp',
  operations: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=700&q=80',
  work: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=700&q=80',
  expenses: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
  costs: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
  yield: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
  harvest: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
  equipment: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=80',
  machines: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=80',
  maintenance: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80',
  service: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80',
  reports: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80'
};

function ContextGuide({ eyebrow = 'Next best step', title, description, actions = [] }) {
  const [isVisible, setIsVisible] = useState(true);

  const guideText = `${eyebrow} ${title}`.toLowerCase();
  const imageKey = Object.keys(guideImages).find(key => guideText.includes(key));
  const image = imageKey ? guideImages[imageKey] : heroImage;

  if (!isVisible) return null;

  return (
    <aside className="context-guide" aria-label="Helpful guidance">
      <img className="guide-image" src={image} alt={`${imageKey || 'farm'} workspace`} />
      <div className="guide-icon">i</div>
      <div className="guide-copy">
        <span className="guide-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        {actions.length > 0 && (
          <div className="guide-actions">
            {actions.map(action => (
              <Link key={action.to} to={action.to} className="guide-action">
                {action.label} <span>↗</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <button type="button" className="guide-dismiss" onClick={() => setIsVisible(false)} aria-label="Dismiss guidance">×</button>
    </aside>
  );
}

export default ContextGuide;
