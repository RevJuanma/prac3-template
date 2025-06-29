import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBoosterPacks, openBoosterPack } from '../services/boosterPackService';
import { useNavigate } from 'react-router-dom';

import BoosterPackCard from '../components/BoosterPackCard';
import CenteredContainer from '../components/CenteredContainer';

const Home = () => {
  const [boosterPacks, setBoosterPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBoosterPacks(token);
        setBoosterPacks(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los Booster Packs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleOpenPack = async (boosterId) => {
    try {
      const response = await openBoosterPack(boosterId, token);
      navigate('/select-pokemon', { state: { session: response } });
    } catch (err) {
      console.error(err);
      alert('Error al abrir el booster pack');
    }
  };

  if (loading) return <p>Cargando Booster Packs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <CenteredContainer>
      <h2>Mis Booster Packs</h2>
      {boosterPacks.length === 0 ? (
        <p>No tenés booster packs disponibles.</p>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {boosterPacks.map((pack) => (
            <BoosterPackCard
              key={pack.id}
              quality={pack.quality}
              amountPokemon={pack.amountPokemon}
              count={pack.count}
              onOpen={() => handleOpenPack(pack.id)}
            />
          ))}
        </div>
      )}
    </CenteredContainer>
  );
};

export default Home;
