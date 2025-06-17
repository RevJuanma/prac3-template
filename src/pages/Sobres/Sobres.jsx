import React, { useState } from 'react'
import './sobres.css'
import { useOutletContext } from 'react-router'
import { obtenerPkmnData } from '../../functions/PokeAPI'
import CartaPokemon from '../../components/Carta/pokeCard'

const BoosterScreen = () => {
  const { puntos, accionCarta } = useOutletContext();
  const [cartasObtenidas, setCartasObtenidas] = useState([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [sobre, setSobre] = useState(false);
  const [limiteSeleccion, setLimite] = useState(0);

  const abrirSobre = async (tipo) => {
    const costo = tipo === 'basico' ? 5 : 8;
    const cantidad = tipo === 'basico' ? 5 : 6;
    const maxSelec = tipo === 'basico' ? 1 : 2;
      if (puntos < costo) {
        console.log("Puntos insuficientes");
      return;
    }

    const ids = [];
    while (ids.length < cantidad) {
      const id = Math.floor(Math.random() * 1000) + 1;
      ids.push(id);
    }

    try {  
      const cartas = await Promise.all(ids.map(id => obtenerPkmnData(id)));
      const cartasValidas = cartas.filter(c => c !== null);
      accionCarta('gastarPuntos', costo);
      setCartasObtenidas(cartasValidas);
      setLimite(maxSelec);
      setCartasSeleccionadas([]);
      setSobre(true);
    } catch(error){
      alert("ERROR");
    }
  };
  
  const seleccionCarta = (carta) => {
    if (cartasSeleccionadas.length < limiteSeleccion) {
        setCartasSeleccionadas([...cartasSeleccionadas, carta]);
      }
    }
    

  const confirmarSeleccion = () => {
    if (cartasSeleccionadas.length === limiteSeleccion) {
      accionCarta('añadirNuevaCarta', cartasSeleccionadas);
      setCartasObtenidas([]);
      setSobre(false);
    }
  }


  return (
    <>
    <div className='body'>
      <h1 className='title'>Abrir Sobres</h1>
      {!sobre ? (
        <div className='forms'>
        <form className='sobre1' onSubmit={e => { e.preventDefault(); abrirSobre('basico'); }}>
          <h3>Abrir Sobre Basico</h3>
          <nav>Costo: 5 puntos</nav>
          <ul>
            <li>Contenido: 5 cartas PKMN</li>
            <li>Puede seleccionar 1 carta</li>
          </ul>
          <button>Abrir</button>
        </form>
        <form className='sobre2' onSubmit={e => { e.preventDefault(); abrirSobre('premium'); }}>
          <h3>Abrir Sobre Premium</h3>
          <nav>Costo: 8 puntos</nav>
          <ul>
            <li>Contenido: 6 cartas PKMN</li>
            <li>Puede seleccionar 2 cartas</li>
          </ul>
          <button>Abrir</button>
        </form>
      </div>
      ) : (
        <div className="selectorCartas">
          <h2>Selecciona {limiteSeleccion} carta(s)</h2>
          <div className="cartasContainer">
            {cartasObtenidas.map(carta => (
              <div
                key={carta.id}
                className={`carta ${cartasSeleccionadas.find(c => c.id === carta.id) ? 'seleccionada' : ''}`}
                onClick={() => seleccionCarta(carta)}
              >
                 <CartaPokemon 
                    pkmn={carta} 
                    onAction={() => {}}
                    hideBtn={true}
                  />
              </div>
            ))}
          </div>
          <button className='btnSelect' onClick={confirmarSeleccion} disabled={cartasSeleccionadas.length !== limiteSeleccion}>
            Confirmar
          </button>
        </div> 
      )}
    </div>
    </>
  )
}

export default BoosterScreen
