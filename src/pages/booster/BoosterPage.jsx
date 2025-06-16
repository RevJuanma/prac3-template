import React from "react";
import useDeck from "../../hooks/useDeck";
import useBooster from "../../hooks/useBooster";
import BoosterCardSelection from "../../components/boosterCards/BoosterCards.jsx";
import "../../Styles/boosterStyle.css";

function BoosterPage() {
    const { puntos, restarPuntos, agregarCartasAlMazo } = useDeck(); 
    const {
        error,
        showingCards,
        cardsToShow,
        cardsToSelect,
        boosterPokemonIds,
        openBooster,
        resetBoosterState,
    } = useBooster(puntos, restarPuntos); 

    const handleOpenBooster = (tipoSobre) => {
        const result = openBooster(tipoSobre);
        if (result.success) {
        }
    };

    const handleCardsSelected = (selectedPokemonList) => {
        agregarCartasAlMazo(selectedPokemonList);
        resetBoosterState();

    };

    return (
        <div>
            <h1 className="title-center">Selecciona un sobre</h1>
            <h3 className="text-left">Tus puntos: {puntos}</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!showingCards ? (
                <div className="sobres-container">
                    <div className="elements-center">
                        <h2>Sobre Básico</h2>
                        <p>Permite elegir 1 carta entre 5 posibles</p>
                        <div className="basic-card">
                            <img className="img-carta" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA" alt="Sobre Básico"/>
                        </div>
                        <h3>$5 Puntos</h3>
                        <button onClick={() => handleOpenBooster("sobreBasico")}>Comprar</button>
                    </div>

                    <div className="elements-center">
                        <h2>Sobre Premium</h2>
                        <p>Permite elegir 2 cartas entre 6 posibles</p>
                        <div className="premium-card">
                            <img className="img-carta" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA" alt="Sobre Premium"/>
                        </div>
                        <h3>$8 Puntos</h3>
                        <button onClick={() => handleOpenBooster("sobrePremium")}>Comprar</button>
                    </div>
                </div>
            ) : (
                <BoosterCardSelection
                    pokemonIds={boosterPokemonIds}
                    cardsToPick={cardsToSelect}
                    onSelectionDone={handleCardsSelected}
                />
            )}
        </div>
    );
}

export default BoosterPage;