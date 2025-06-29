const CenteredContainer = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CenteredContainer;
