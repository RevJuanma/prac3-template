import Button from './Button';
import './styles/PokemonCard.css';

const PokemonCard = ({ pokemon, onSelect, selected, actions }) => {
  const { idPokemon, value, name, urlImage, stats } = pokemon;

  return (
    <div className={`pokemon-card ${selected ? 'selected' : 'unselected'}`}>
      <div className="pokemon-card-content">
        <h3>{name.toUpperCase()}</h3>
        <img src={urlImage} alt={name} />
        <p><strong>ID:</strong> {idPokemon}</p>
        <p><strong>Valor:</strong> {value}</p>

        <div>
          <strong>Stats:</strong>
          <ul>
            {stats.map((stat, index) => (
              <li key={index}>
                {stat.name}: {stat.baseStat}
              </li>
            ))}
          </ul>
        </div>

        {actions ? (
          <div className="actions">{actions}</div>
        ) : (
          onSelect && (
            <Button onClick={onSelect}>
              {selected ? 'Seleccionado' : 'Seleccionar'}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
