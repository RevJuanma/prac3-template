const TextField = ({ label, type = "text", value, onChange, name, placeholder }) => {
  return (
    <div className="textfield-group" style={{ marginBottom: '1rem' }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '0.3rem' }}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: '0.5rem',
          width: '100%',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
};

export default TextField;
