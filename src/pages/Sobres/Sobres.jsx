import React from 'react'
import './sobres.css'

const BoosterScreen = () => {
  return (
    <>
    <div className='body'>
      <h1 className='title'>Abrir Sobres</h1>
      <div className='forms'>
        <form className='sobre1'>
          <h3>Abrir Sobre Basico</h3>
          <nav>Costo: 5 puntos</nav>
          <ul>
            <li>Contenido: 5 cartas PKMN</li>
            <li>Puede seleccionar 1 carta</li>
          </ul>
          <button>Abrir</button>
        </form>
        <form className='sobre2'>
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
