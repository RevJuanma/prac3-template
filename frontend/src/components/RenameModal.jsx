import React, { useEffect } from 'react';
import Button from './Button';
import './styles/RenameModal.css'; 

const RenameModal = ({ isOpen, onClose, value, onSave }) => {
  const [name, setName] = React.useState(value);

  useEffect(() => {
    if (isOpen) setName(value);
  }, [isOpen, value]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Renombrar Pokémon</h3>
        <input autoFocus value={name} onChange={e => setName(e.target.value)} />
        <div className="modal-buttons">
          <Button onClick={() => onSave(name)}>Guardar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
