import { useEffect } from 'react';

const baseStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '1rem 2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  fontSize: '1rem',
  textAlign: 'center',
  minWidth: '300px',
};

const PopupMessage = ({ message, onClose, duration = 3000, type = 'success' }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, duration);
    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  if (!message) return null;

  const backgroundColor = type === 'error' ? '#e53935' : '#4caf50';

  return <div style={{ ...baseStyle, backgroundColor }}>{message}</div>;
};

export default PopupMessage;