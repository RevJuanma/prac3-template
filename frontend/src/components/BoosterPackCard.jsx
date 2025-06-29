import Button from './Button';

const BoosterPackCard = ({ quality, amountPokemon, count, onOpen  }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.quality}>{quality}</h3>
      <p><strong>Pokémon por pack:</strong> {amountPokemon}</p>
      <p><strong>Cantidad:</strong> {count}</p>

      <Button onClick={onOpen}>Abrir pack</Button>
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