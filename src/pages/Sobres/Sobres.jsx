import React from 'react'
import './sobres.css'
import { useOutletContext } from 'react-router'
import { obtenerPkmnData } from '../../functions/PokeAPI'

const BoosterScreen = () => {
  const { puntos, accionCarta } = useOutletContext();

  const abrirSobre = async (tipo) => {
    const costo = tipo === 'basico' ? 5 : 8;
    const cantidad = tipo === 'basico' ? 5 : 6;

      if (puntos < costo) {
        console.log("Puntos insuficientes");
      return;
    }

    const ids = [];
    while (ids.length < cantidad) {
      Math.floor(Math.random() * 2000) + 1;
    }

    const cartas = await Promise.all(ids.map(id => obtenerPkmnData(id)));

    const cartasValidas = cartas.filter(c => c !== null);


    accionCarta('gastarPuntos', costo);
    accionCarta('añadirNuevaCarta', cartasValidas);
  
  };
  


  return (
    <>
    <div className='body'>
      <h1 className='title'>Abrir Sobres</h1>
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
        <form className='sobre2' onSubmit={e => { e.preventDefault(); abrirSobre('basico'); }}>
          <h3>Abrir Sobre Premium</h3>
          <nav>Costo: 8 puntos</nav>
          <ul>
            <li>Contenido: 6 cartas PKMN</li>
            <li>Puede seleccionar 2 cartas</li>
          </ul>
          <button>Abrir</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default BoosterScreen
