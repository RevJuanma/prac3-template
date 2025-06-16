import react, { useEffect, useState } from "react";

const useLocalStorage = (clave, valor) => {
    const [value, setValue] = useState(() => {
        const StorageValue = localStorage.getItem(clave);
        return StorageValue !== null ? StorageValue : valor;
    }

    )

    useEffect(() => {
        localStorage.setItem(clave, valor);
    }, [clave, valor]);

    return [value, setValue];
};

export default useLocalStorage;
