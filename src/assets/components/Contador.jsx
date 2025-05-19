import React, { useState } from "react";

const Contador = () => {
    const [contador, setContador] = useState(0)
    const [inputValor, setInputValor] = useState()
    const [mostrar, setMostrar] = useState()


    return (
        <>
        <div>
            <input type="text" value={inputValor} onChange={(event)=>{setInputValor(event.target.value)}}/>
            <button onClick={()=>setMostrar(inputValor)}>Mostrar</button>
            <button onClick={()=>setMostrar("")}>Limpiar</button>
            <h1>{mostrar}</h1>
        </div>
        <div>
            <p>{contador}</p>
            <button onClick={()=>{setContador(contador+1)}}>+</button>
            <button onClick={()=>{setContador(contador-1)}}>-</button>
        </div>
        </>
    )
}