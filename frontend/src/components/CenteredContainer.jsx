const CenteredContainer = ({ children, maxWidth = '1200px' }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth,
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CenteredContainer;
