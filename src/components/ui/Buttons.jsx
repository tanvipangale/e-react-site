// src/components/ui/Buttons.jsx
import React from 'react';

export function PrimaryButton({ text, onClick, style }) {
  return (
    <button className="btn-primary" onClick={onClick} style={{ ...style }}>
      {text}
    </button>
  );
}

export function OutlineButton({ text, onClick, style }) {
  return (
    <button className="btn-outline" onClick={onClick} style={{ ...style }}>
      {text}
    </button>
  );
}