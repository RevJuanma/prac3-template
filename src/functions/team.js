export const cargarEquipoYCartas = () => {
    try {
        const equipoGuardado = JSON.parse(localStorage.getItem("equipo") || "[]");
        const cartasGuardadas = JSON.parse(localStorage.getItem("cartasPoseidas") || "[]");

        return {
            equipo: Array.isArray(equipoGuardado) ? equipoGuardado : [],
            cartas: Array.isArray(cartasGuardadas) ? cartasGuardadas : [],
        };
    } catch {
        return { equipo: [], cartas: [] };
    }
};

export const obtenerEquipoCompleto = (equipoIds, cartasPoseidas) => {
    return cartasPoseidas.filter((poke) => equipoIds.includes(poke.id));
};

export const removerDeEquipo = (id, equipo) => {
    const actualizado = equipo.filter((pokeId) => pokeId !== id);
    localStorage.setItem("equipo", JSON.stringify(actualizado));
    return actualizado;
};
