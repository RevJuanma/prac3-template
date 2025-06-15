import React from 'react';
import { tipoColores, } from '../../utils/pokeData';
import './pokeCard.css'

export default function CartaPokemon({pkmn,onAction,deck=[],favoritos=[],team=[]}) {

  if (!pkmn) {
    return <p style={{font:'caption'}}>Cargando...</p>;
  }

  const { id, name, sprites, types, stats, nombrePropio } = pkmn;

  const colorTipoPrim = types[0].type.name; 
  const colorFondo = tipoColores[colorTipoPrim];

  return(
    <>
    <div style={{background:colorFondo}} className='pokeCard'>
      <h1>#{id}</h1>
      <h1 className='pokeCardNombre'>{nombrePropio || name}</h1>
      <img src={sprites.front_default} alt={name} className='pokeCardImg'/>
      <p>Tipos:</p>
      <div className='pokeCardTipos'>
        {types.map((tipo, index) => (
          <li key={index}>
            {tipo.type.name}</li>
        ))}
      </div>
      <p>Estadísticas:</p>
      <ul className='pokeCardStats'>
        {stats.map((stat,index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>

      <div style={{display:'flex',margin:'auto',flexDirection:'column',width:'150px',gap:'5px'}}>
        {!favoritos.some(Fav => Fav.id === id) ? (
          <button style={{backgroundColor:'gold',color:'white',padding:'5px',border:'none',borderRadius:'15px',fontSize:'15px',fontWeight:'bold',fontFamily:'sans-serif'}}
          onClick={()=>onAction('añadirFavoritos',pkmn)}>Agregar a Favoritos</button>
        ):(
          <button style={{backgroundColor:'gold',color:'white',padding:'5px',border:'none',borderRadius:'15px',fontSize:'15px',fontWeight:'bold',fontFamily:'sans-serif'}}
          onClick={()=>onAction('borrarFavoritos',id)}>Quitar de Favoritos</button>
        )}
        {!team.some(team => team.id === id) ? (
          <button style={{backgroundColor:'blue',color:'white',padding:'5px',border:'none',borderRadius:'15px',fontSize:'15px',fontWeight:'bold',fontFamily:'sans-serif'}}
          onClick={()=>onAction('añadirTeam',pkmn)}>Agregar a Equipo</button>
        ):(
          <button style={{backgroundColor:'blue',color:'white',padding:'5px',border:'none',borderRadius:'15px',fontSize:'15px',fontWeight:'bold',fontFamily:'sans-serif'}}
          onClick={()=>onAction('borrarTeam',id)}>Quitar de Equipo</button>
        )}
        {!favoritos.some(Fav => Fav.id === id) && (
          <button style={{backgroundColor:'red ',color:'white',padding:'5px',border:'none',borderRadius:'15px',fontSize:'15px',fontWeight:'bold',fontFamily:'sans-serif'}}
          onClick={()=>onAction('borrar',id)}>Eliminar</button>
        )}
        {favoritos.some(fav => fav.id === id) && (
            <>
              <button onClick={() => onAction('cambiarNombrePersonalizado', pkmn)}className="renombrar">Renombrar</button>
              {nombrePropio && (
                <button onClick={() => onAction('quitarNombrePersonalizado', id)} className="borrarNombre">Quitar Nombre Personalizado</button>
              )}
            </>
          )}
      </div>

    </div>
    </>
  )

}