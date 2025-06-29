import Button from './Button';

const PokemonCard = ({ pokemon, onSelect, selected }) => {
  const { idPokemon, value, name, urlImage, stats } = pokemon;

  return (
    <div
      style={{
        backgroundColor: selected ? '#3a3a3a' : '#2b2b2b',
        border: selected ? '2px solid #00ff99' : '1px solid #444',
        borderRadius: '8px',
        padding: '1rem',
        width: '300px',
        color: 'white',
        transition: 'all 0.2s ease-in-out',
        boxShadow: selected ? '0 0 10px #00ff99' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <h3>{name.toUpperCase()}</h3>
        <img src={urlImage} alt={name} style={{ width: '100px', height: '100px' }} />
        <p><strong>ID:</strong> {idPokemon}</p>
        <p><strong>Valor:</strong> {value}</p>

        <div>
          <strong>Stats:</strong>
          <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
            {stats.map((stat, index) => (
              <li key={index}>
                {stat.name}: {stat.baseStat}
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={onSelect}>
          {selected ? 'Seleccionado' : 'Seleccionar'}
        </Button>
      </div>
    </div>
  );
};

export default PokemonCard;