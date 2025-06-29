import Button from './Button';

const BoosterPackCard = ({
  quality,
  amountPokemon,
  count,
  price,
  onOpen,
  onBuy,
  inputValue,
  onChange,
  loading
}) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.quality}>{quality}</h3>
      <p><strong>Pokémon por pack:</strong> {amountPokemon}</p>
      {price !== undefined && <p><strong>Precio:</strong> {price}</p>}
      {count !== undefined && <p><strong>Cantidad:</strong> {count}</p>}

      {/* Compra de booster pack */}
      {onBuy && (
        <>
          <input
            type="number"
            min="1"
            placeholder="Cantidad"
            value={inputValue}
            onChange={onChange}
            style={{ width: '100px', margin: '1rem', marginBottom: '1rem', padding: '0.5rem' }}
          />
          <Button onClick={onBuy} disabled={loading}>
            {loading ? 'Procesando...' : 'Comprar'}
          </Button>
        </>
      )}

      {/* Apertura de booster pack */}
      {onOpen && <Button onClick={onOpen}>Abrir pack</Button>}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    width: '100%',
    color: 'black',
    maxWidth: '300px',
  },
  quality: {
    margin: 0,
    color: '#2c3e50',
  },
};

export default BoosterPackCard;