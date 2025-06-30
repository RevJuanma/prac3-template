import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CenteredContainer from '../components/CenteredContainer';
import PokemonCard from '../components/PokemonCard';
import SimplePagination from '../components/SimplePagination';
import PopupMessage from '../components/PopupMessage';

import { getInventory } from '../services/inventoryService';

const Inventory = () => {
  const token = useSelector(state => state.auth.token);

  const [inventory, setInventory] = useState({
    pokemon: [],
    slotUsed: 0,
    estimatedPrice: 0
  });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ message: '', type: 'success' });

  const PAGE_SIZE = 10;

  // calcular el total de paginas en base al slot  (porq me falto agregar Pageable en el Response Entity del back y me dio paja :v)
  // ceil redonea "para arriba" ej: slot use = 13, page_zise 10 -> 13 / 10 = 1.3 -> 2
  const totalPages = Math.ceil(inventory.slotUsed / PAGE_SIZE);

  useEffect(() => {
    if (!token) return;

    const fetchInventory = async () => {
      setLoading(true);
      try {
        const data = await getInventory(page, PAGE_SIZE, token);
        setInventory(data);
      } catch (err) {
        console.error(err);
        setPopup({ message: 'Error al cargar inventario', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [page, token]);

  const handlePrev = () => {
    if (page > 0) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (page + 1 < totalPages) setPage(prev => prev + 1);
  };

  return (
    <CenteredContainer maxWidth="1200px">
      <h2 style={{ textAlign: 'center' }}>Inventario</h2>
      <p style={{ textAlign: 'center' }}>
        Slots usados: {inventory.slotUsed}/50 — Precio estimado: ${inventory.estimatedPrice}
      </p>

      <SimplePagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {inventory.pokemon.map(poke => (
            <PokemonCard
              key={poke.id}
              pokemon={poke}
              onSelect={() => {}}
              selected={false}
            />
          ))}
        </div>
      )}

      <PopupMessage
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: '', type: 'success' })}
      />
    </CenteredContainer>
  );
};

export default Inventory;
