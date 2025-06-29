const AuthFormWrapper = ({ title, children, onSubmit, buttonLabel }) => {
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h2>
      <form onSubmit={onSubmit} noValidate>
        {children}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button type="submit">{buttonLabel}</button>
        </div>
      </form>
    </>
  );
};

export default AuthFormWrapper;
