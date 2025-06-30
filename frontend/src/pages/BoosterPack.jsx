import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBoosterPackTypes, buyBoosterPacks } from '../services/boosterPackService';
import { getUserMe } from '../services/userService';

import CenteredContainer from '../components/CenteredContainer';
import BoosterPackCard from '../components/BoosterPackCard';
import PopupMessage from '../components/PopupMessage';

const BoosterPack = () => {
  const [types, setTypes] = useState([]);
  const [counts, setCounts] = useState({});
  const [loadingId, setLoadingId] = useState(null); // manejo de loading individual (por id del Booster Pack)
  const token = useSelector((state) => state.auth.token);
  const [popupMessage, setPopupMessage] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const userData = await getUserMe(token);
        setUser(userData);
      } catch (err) {
        console.error('Error al cargar datos de usuario', err);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    getBoosterPackTypes()
      .then(setTypes)
      .catch(err => {
        console.error(err);
        setPopupMessage({ message: 'No se pudo cargar los tipos de packs', type: 'error' });
      });
  }, []);

  const handleCountChange = (id, value) => {
    setCounts(prev => ({ ...prev, [id]: value }));
  };

  const handleBuy = async (id) => {
    const count = parseInt(counts[id], 10) || 0;
    if (count < 1) {
      return setPopupMessage({ message: 'Ingresá una cantidad válida para comprar', type: 'error' });
    }
    setPopupMessage('');
    setLoadingId(id);
    try {
      await buyBoosterPacks(id, count, token);
      setPopupMessage({ message: 'Compra realizada con éxito', type: 'success' });
      setCounts(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error al comprar';
      setPopupMessage({ message: msg, type: 'error' });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <CenteredContainer maxWidth="800px">
      <h2 style={{ textAlign: 'center' }}>Comprar Booster Packs</h2>
      <p style={{ textAlign: 'center' }}>
        Balance: ${user ? user.balance : '...'}
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {types.map(pack => (
          <BoosterPackCard
            key={pack.id}
            quality={pack.quality}
            amountPokemon={pack.amountPokemon}
            price={pack.price}
            inputValue={counts[pack.id] || ''}
            onChange={(e) => handleCountChange(pack.id, e.target.value)}
            onBuy={() => handleBuy(pack.id)}
            loading={loadingId === pack.id}
          />
        ))}
        <PopupMessage
          message={popupMessage.message}
          type={popupMessage.type}
          onClose={() => setPopupMessage({ message: '', type: 'success' })}
        />
      </div>
    </CenteredContainer>
  );
};

export default BoosterPack;