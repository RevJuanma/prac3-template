import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBoosterPacks } from '../services/boosterPackService';

import BoosterPackCard from '../components/BoosterPackCard';
import CenteredContainer from '../components/CenteredContainer';

const Home = () => {
  const [boosterPacks, setBoosterPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

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
            />
          ))}
        </div>
      )}
    </CenteredContainer>
  );
};

export default Home;
