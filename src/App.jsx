import { useState } from 'react'
import { useEffect } from 'react'
import PokeCardFranciscoGalarza from './assets/components/PokeCard-FranciscoGalarza'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
    <div>
      <PokeCardFranciscoGalarza pokeUrl={'https://pokeapi.co/api/v2/pokemon/infernape'}/>
    </div>
    </>
  );
}

export default App
