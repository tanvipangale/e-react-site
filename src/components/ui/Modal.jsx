// src/components/ui/Modal.jsx
import React from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '4px', maxWidth: '500px', width: '90%', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        {title && <h3 style={{ marginBottom: '20px', fontSize: '22px' }}>{title}</h3>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;