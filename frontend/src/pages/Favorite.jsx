import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CenteredContainer from '../components/CenteredContainer';
import PokemonCard from '../components/PokemonCard';
import PopupMessage from '../components/PopupMessage';
import Button from '../components/Button';
import RenameModal from '../components/RenameModal';

import { getFavorite, addToFavorite } from '../services/favoriteService';
import { renamePokemonCard } from '../services/cardService';

const Favorite = () => {
  const token = useSelector((state) => state.auth.token);
  const [fav, setFav] = useState({ pokemon: [], slotUsed: 0 });
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ message: '', type: 'success' });
  const [renamingCard, setRenamingCard] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchFav = async () => {
      setLoading(true);
      try {
        const data = await getFavorite(token);
        setFav(data);
      } catch (err) {
        console.error('Error al cargar favoritos', err);
        setPopup({ message: 'Error al cargar favoritos', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchFav();
  }, [token]);

  const handleToggleFavorite = async (pokemonId) => {
    try {
      const resp = await addToFavorite(pokemonId, token);
      setPopup({ message: resp.message || 'Operación exitosa', type: 'success' });
      const updated = await getFavorite(token);
      setFav(updated);
    } catch (err) {
      console.error('Error al actualizar favorito', err);
      setPopup({ message: 'Error al actualizar favorito', type: 'error' });
    }
  };

  const handleRenameSubmit = async (newName) => {
  try {
    const { id: cardPokemonId, idPokemon: pokemonId } = renamingCard;
    await renamePokemonCard({ newName, cardPokemonId, pokemonId }, token);
    setPopup({ message: 'Nombre actualizado', type: 'success' });
    setFav(await getFavorite(token));
    setRenamingCard(null);
  } catch {
    setPopup({ message: 'Error al renombrar', type: 'error' });
  }
};

  return (
    <CenteredContainer maxWidth="1200px">
      <h2 style={{ textAlign: 'center' }}>Favoritos</h2>
      <p style={{ textAlign: 'center' }}>
        Pokémon favoritos: {fav.slotUsed} / 10
      </p>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando favoritos...</p>
      ) : fav.pokemon.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No tienes favoritos aún.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {fav.pokemon.map(poke => (
            <PokemonCard
              key={poke.id}
              pokemon={poke}
              selected={false}
              actions={
                <>
                  <Button onClick={() => handleToggleFavorite(poke.id)}>
                    {poke.presentFavorite ? 'Quitar Favorito' : 'Añadir Favorito'}
                  </Button>
                  <Button onClick={() => {
                    setRenamingCard(poke);
                  }}>
                    Renombrar
                  </Button>
                </>
              }
            />
          ))}
        </div>
      )}
      <RenameModal
        isOpen={!!renamingCard}
        value={renamingCard?.name}
        onClose={() => setRenamingCard(null)}
        onSave={handleRenameSubmit}
      />
      <PopupMessage
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: '', type: 'success' })}
      />
    </CenteredContainer>
  );
};

export default Favorite;
