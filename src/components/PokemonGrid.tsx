import React from "react";
import type { Pokemon } from "../types/types";
import PokemonCard from "./PokemonCard";

type Props = {
  pokemons: Pick<Pokemon, "id" | "name" | "image">[];
  onCardClick: (id: number) => void;
};

const PokemonGrid: React.FC<Props> = ({ pokemons, onCardClick }) => {
  return (
    <div className="pokemon-grid">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default PokemonGrid;
