const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '1rem' }}>
      {message}
    </p>
  );
};

export default ErrorMessage;