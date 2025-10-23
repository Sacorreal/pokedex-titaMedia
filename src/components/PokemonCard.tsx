import React from "react";
import "../styles/PokemonCard.css";
import type { Pokemon } from "../types/types";

type Props = {
  pokemon: Pick<Pokemon, "id" | "name" | "image">;
  onClick: (id: number) => void;
};

const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon.id)}>
      <div className="pokemon-card-header">
        <div className="pokemon-number">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>
      </div>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <div className="pokemon-name">{pokemon.name}</div>
    </div>
  );
};

export default PokemonCard;
