import React from 'react';
import './FeatureCard.css';

export default function FeatureCard({ title, description, image, isReversed }) {
  return (
    <div
      className={`feature-card-container ${isReversed ? 'reversed' : ''}`}
      id="fitur"
    >
      <div className="feature-img-wrapper">
        <img src={image} alt={title} />
      </div>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
