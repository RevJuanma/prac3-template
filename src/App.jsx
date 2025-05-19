import { useState } from 'react'
import { useEffect } from 'react'
import PokeCard from './assets/components/FRANCISCO-GALARZA/PokeCard'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [poke, setPoke] = useState ("")
  const [mostrar, setMostrar] = useState (false)
  return (
    <>
    <input type="text" 
    placeholder="Escriba un nombre" 
    value={poke} 
    onChange={(event)=>setPoke(event.target.value)} />
    <button onClick={()=>setMostrar(!mostrar)}>{mostrar ? "Ocultar Carta":"Mostrar Carta"}</button>
    {mostrar && poke &&
      <div>
          <PokeCard pokeUrl={`https://pokeapi.co/api/v2/pokemon/${poke}`}/>
      </div>}
    </>
  );
}

export default App
