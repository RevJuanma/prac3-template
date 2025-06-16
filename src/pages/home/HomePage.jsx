import { puntosIniciales} from "../../functions/SistemaPuntos.jsx";
import React from "react";
import "../../Styles/homeStyle.css";

function HomePage() {
  return (
    <div>

      <div className="title-center">
      <h1>Bienvenido al Juego de Cartas Pokémon</h1>
      <h2>¡Abrí sobres, armá tu mazo, y creá tu equipo!</h2>
      </div>

      <div className="text-left">
      <h2>Explicación del juego:</h2>
      <h3>Puntos y sobres</h3>
      <p>Iniciaras con {puntosIniciales} puntos para gastar en sobres de cartas. Existen dos tipos de sobres:</p>
      </div>

      <div className="sobres-container">

        <div className="basic-card">
          <h2>Sobre Básico</h2>
          <p>$5 Puntos</p>
          <em>Permite elegir 1 carta entre 5 posibles.</em>
          <img className="size-img" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"/>
        </div>

        <div className="premium-card">
          <h2>Sobre Premium</h2>
          <p>$8 Puntos</p>
          <em>Permite elegir 2 cartas entre 6 posibles.</em>
          <img className="size-img" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"/>
        </div>
      </div>

      <div className="text-final">
      <h3>Mazo, equipos y favoritos</h3>
      <p>Contarás con un mazo, el cual iniciará vacio, allí se almacenarán hasta 50 cartas.</p>
      <p>Desde Tu mazo, podrás guardar cartas en Favoritos, crear Tu Equipo o Eliminar cartas.</p>
      <p>Por cada carta que elimines de tu mazo se te devolveran 3 puntos para volver a canjear por sobres.</p>
      </div>

    </div>
  );
}

export default HomePage;
