import PokeCard from "./PokeCard-GuillermoViera";

export default function PokeCardView() {
    return (
        <div>
            <div>{pokemon && <PokeCard pokemon={pokemon} />}</div>
        </div>
    );
};