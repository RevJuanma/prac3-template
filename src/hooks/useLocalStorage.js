import React,{useEffect, useState} from "react";

const useLocalStorage=(clave, valor)=>{
    const [value, setValue]=useState(()=>{
        const storageValue =localStorage.getItem(clave);
        return storageValue!==null? storageValue:valor;
    });


    

    useEffect(()=>{
        localStorage.setItem(clave,valor)
    },[clave,valor])
    return [value,setValue]
};

export default useLocalStorage
