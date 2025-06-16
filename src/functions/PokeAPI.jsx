export async function obtenerPkmnData(ID){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
        const data = await response.json();
        return{...data, nombrePropio: null}
    } catch(error){
        console.error(`#${ID} no encontrado`, error)
        return null;
    }
}