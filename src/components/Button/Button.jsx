import React from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', onClick, type = 'button' }) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}