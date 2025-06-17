import { useState, useEffect } from 'react';
import { puntosIniciales } from '../functions/SistemaPuntos'; 

const mazoKey = "pokemonMazo";
const puntosKey = "puntos";

const useDeck = () => {
    const [mazo, setMazo] = useState(() => {
        const savedMazo = localStorage.getItem(mazoKey);
        return savedMazo ? JSON.parse(savedMazo) : [];
    });

    const [puntos, setPuntos] = useState(() => {
        const savedPuntos = localStorage.getItem(puntosKey);
        return savedPuntos ? parseInt(savedPuntos, 10) : puntosIniciales; 
    });

    useEffect(() => {
        localStorage.setItem(mazoKey, JSON.stringify(mazo));
    }, [mazo]);

    useEffect(() => {
        localStorage.setItem(puntosKey, puntos.toString()); 
    }, [puntos]);

    const agregarCartasAlMazo = (newCards) => {
        setMazo(prevMazo => {
            const newCardsToAdd = [];

            for (const newCard of newCards) {
                if (prevMazo.length + newCardsToAdd.length < 50) { 
                    if (!prevMazo.some(card => card.id === newCard.id) && !newCardsToAdd.some(card => card.id === newCard.id)) {
                        newCardsToAdd.push(newCard);
                    }
                }
            }
            return [...prevMazo, ...newCardsToAdd];
        });
    };

    const quitarCartaDelMazo = (pokemonId) => {
        setMazo(prevMazo => prevMazo.filter(card => card.id !== pokemonId));
    };

    const restarPuntos = (cantidad) => {
        if (puntos >= cantidad) {
            setPuntos(prevPuntos => prevPuntos - cantidad);
            return true;
        }
        return false;
    };

    return {
        mazo,
        puntos,
        agregarCartasAlMazo,
        quitarCartaDelMazo,
        restarPuntos,
    };
};

export default useDeck;