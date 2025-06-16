import React, { useState } from "react";
import { useGame } from '../src/contexts/GameContext.jsx';
import PokeCard from "../components/PokeCard - Lucrecia Galarza.jsx";
import "../src/App.css";

function Booster() {
  const { points, subtractPoints, addCardToDeck } = useGame();
  const [notification, setNotification] = useState("");
  const [revealedCards, setRevealedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const BASIC_PACK_COST = 5;
  const PREMIUM_PACK_COST = 8;
  const BASIC_PACK_CHOICES = 5;
  const PREMIUM_PACK_CHOICES = 6;

  const generateRandomPokemon = async (count) => {
    const pokemonList = [];
    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * 898) + 1;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) throw new Error("Error al obtener Pokémon aleatorio.");
        const data = await response.json();

        const moveName = data.moves[0]?.move.name || null;
        let moveDesc = "Descripción no disponible";
        if (moveName) {
            const moveResponse = await fetch(data.moves[0].move.url);
            const moveData = await moveResponse.json();
            const spanishEntry = moveData.flavor_text_entries.find(entry => entry.language.name === "es");
            moveDesc = spanishEntry ? spanishEntry.flavor_text.replace(/\n|\f/g, " ") : "Descripción no disponible";
        }

        const image =
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default ||
          data.sprites.other["dream_world"].front_default ||
          data.sprites.other["home"].front_default ||
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

        pokemonList.push({
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          image,
          specialMove: moveName ? moveName.replace("-", " ") : "Movimiento desconocido",
          moveDesc,
          stats: [
            { name: "HP", value: data.stats[0].base_stat },
            { name: "Ataque", value: data.stats[1].base_stat },
            { name: "Defensa", value: data.stats[2].base_stat },
            { name: "Velocidad", value: data.stats[5].base_stat },
          ],
        });
      } catch (error) {
        console.error("Error al generar Pokémon:", error);
        pokemonList.push({ id: `error-${i}`, name: "Error Card", image: "https://placehold.co/150x150/ff0000/ffffff?text=ERROR", stats: [] });
      }
    }
    return pokemonList;
  };

  const handleOpenPack = async (packType) => {
    let cost, choicesCount, cardsToChoose;

    if (packType === 'basic') {
      cost = BASIC_PACK_COST;
      choicesCount = BASIC_PACK_CHOICES;
      cardsToChoose = 1;
    } else {
      cost = PREMIUM_PACK_COST;
      choicesCount = PREMIUM_PACK_CHOICES;
      cardsToChoose = 2;
    }

    if (points < cost) {
      setNotification("¡Puntos insuficientes para abrir este sobre!");
      return;
    }

    setRevealedCards([]);
    setSelectedCards([]);
    setNotification(`Abriendo sobre ${packType === 'basic' ? 'básico' : 'premium'}...`);

    const pointsSubtracted = subtractPoints(cost);
    if (!pointsSubtracted) {
        setNotification("Error al restar puntos. Inténtalo de nuevo.");
        return;
    }

    const newCards = await generateRandomPokemon(choicesCount);
    setRevealedCards(newCards);
    setNotification(`¡Elige ${cardsToChoose} carta(s) de tu sobre ${packType}!`);
  };

  const handleCardSelection = (card, maxSelection) => {
    setSelectedCards(prevSelected => {
      const isAlreadySelected = prevSelected.some(c => c.id === card.id);

      if (isAlreadySelected) {
        return prevSelected.filter(c => c.id !== card.id);
      } else {
        if (prevSelected.length < maxSelection) {
          return [...prevSelected, card];
        } else {
          setNotification(`Solo puedes elegir ${maxSelection} carta(s).`);
          return prevSelected;
        }
      }
    });
  };

  const confirmSelection = () => {
    if (selectedCards.length === 0) {
      setNotification("Por favor, selecciona al menos una carta.");
      return;
    }

    const expectedSelectionCount = revealedCards.length === BASIC_PACK_CHOICES ? 1 : 2;

    if (selectedCards.length !== expectedSelectionCount) {
        setNotification(`Debes elegir exactamente ${expectedSelectionCount} carta(s).`);
        return;
    }

    selectedCards.forEach(card => {
      addCardToDeck(card);
    });

    setNotification(`¡${selectedCards.length} carta(s) añadida(s) a tu mazo!`);
    setRevealedCards([]);
    setSelectedCards([]);
  };

  const currentMaxSelection = revealedCards.length === BASIC_PACK_CHOICES ? 1 : 2;

  return (
    <div className="page-content">
      <h1>Apertura de Sobres Pokémon</h1>
      <p>Puntos actuales: <strong>{points}</strong></p>

      <div className="booster-options">
        <div className="pack-card">
          <h2>Sobre Básico</h2>
          <p>Costo: <strong>{BASIC_PACK_COST} puntos</strong></p>
          <p>Te permite elegir <strong>1 carta</strong> entre {BASIC_PACK_CHOICES} posibles.</p>
          <button onClick={() => handleOpenPack('basic')}>Abrir Sobre Básico</button>
        </div>

        <div className="pack-card">
          <h2>Sobre Premium</h2>
          <p>Costo: <strong>{PREMIUM_PACK_COST} puntos</strong></p>
          <p>Te permite elegir <strong>2 cartas</strong> entre {PREMIUM_PACK_CHOICES} posibles.</p>
          <button onClick={() => handleOpenPack('premium')}>Abrir Sobre Premium</button>
        </div>
      </div>

      {notification && (
        <div className="notification-message">
          <p>{notification}</p>
        </div>
      )}

      {revealedCards.length > 0 && (
        <div className="revealed-cards-container">
          <h2>Cartas Reveladas:</h2>
          <p>Selecciona {currentMaxSelection} carta(s). Llevas seleccionadas: {selectedCards.length}</p>
          <div className="card-selection-grid">
            {revealedCards.map((card) => (
              <div
                key={card.id}
                className={`selectable-pokecard ${selectedCards.some(c => c.id === card.id) ? 'selected' : ''}`}
                onClick={() => handleCardSelection(card, currentMaxSelection)}
              >
                <PokeCard pokemon={card} context="booster-selection"/>
              </div>
            ))}
          </div>
          <button
            onClick={confirmSelection}
            disabled={selectedCards.length !== currentMaxSelection}
            className="confirm-selection-button"
          >
            Confirmar Selección ({selectedCards.length}/{currentMaxSelection})
          </button>
        </div>
      )}
    </div>
  );
}

export default Booster;
