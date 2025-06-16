import { useState } from 'react';
import getRandomIds from '../functions/getRandomIds'; 
import { comprarCartas } from '../functions/SistemaPuntos';

const useBooster = (currentPuntos, restarPuntosFunction) => {
    const [error, setError] = useState("");
    const [showingCards, setShowingCards] = useState(false);
    const [cardsToShow, setCardsToShow] = useState(0);
    const [cardsToSelect, setCardsToSelect] = useState(0);
    const [boosterPokemonIds, setBoosterPokemonIds] = useState([]);

    const openBooster = (boosterType) => { 

        let precioSobre = 0;
        if (boosterType === "sobreBasico") {
            precioSobre = 5;
        } else if (boosterType === "sobrePremium") {
            precioSobre = 8;
        }
        const resultadoValidacion = comprarCartas(currentPuntos, boosterType);

        if (resultadoValidacion.error) { 
            setError(resultadoValidacion.error);
            setShowingCards(false);
            return { success: false };
        } else {
            const puntosRestadosExitosamente = restarPuntosFunction(precioSobre); 

            if (!puntosRestadosExitosamente) {
                setError("No tienes suficientes puntos para comprar este sobre."); 
                return { success: false };
            }

            setError(""); 

            let numCardsToShow;
            let numCardsToSelect;

            if (boosterType === "sobreBasico") {
                numCardsToShow = 5; 
                numCardsToSelect = 1; 
            } else {
                numCardsToShow = 6; 
                numCardsToSelect = 2; 
            }

            const generatedIds = getRandomIds(numCardsToShow); 
            setBoosterPokemonIds(generatedIds);
            setCardsToShow(numCardsToShow);
            setCardsToSelect(numCardsToSelect);
            setShowingCards(true);
            return { success: true };
        }
    };

    const resetBoosterState = () => {
        setShowingCards(false);
        setCardsToShow(0);
        setCardsToSelect(0);
        setBoosterPokemonIds([]);
        setError(""); 
    };

    return {
        error,
        showingCards,
        cardsToShow,
        cardsToSelect,
        boosterPokemonIds,
        openBooster,
        resetBoosterState,
    };
};

export default useBooster;