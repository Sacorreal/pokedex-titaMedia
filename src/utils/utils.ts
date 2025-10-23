import type { NavigateFunction } from "react-router-dom";
import type { Pokemon } from "../types/types";
import { userInputValidations } from "./validations";

type SimplePokemon = Pick<Pokemon, "id" | "name" | "image">;

export const filterPokemon = (
  pokemonData: SimplePokemon[],
  searchTerm: string
) => {
  if (!searchTerm) return pokemonData;
  const searchLower = searchTerm.toLowerCase();
  return pokemonData.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemon.id.toString().includes(searchTerm)
    );
  });
};

export const sortPokemon = (
  pokemonList: SimplePokemon[],
  sortBy: "number" | "name"
) => {
  return [...pokemonList].sort((a, b) => {
    if (sortBy === "number") {
      return a.id - b.id;
    } else {
      return a.name.localeCompare(b.name);
    }
  });
};

export const handleSearchChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSearchTerm: (v: string) => void,
  setSearchErrors: (errs: string[]) => void
) => {
  const value = e.target.value;
  const validation = userInputValidations.searchTerm(value);
  setSearchErrors(validation.errors);
  setSearchTerm(value);
};

export const handleSortChange = (
  newSortBy: "number" | "name",
  setSortBy: (v: "number" | "name") => void,
  setShowSortModal: (v: boolean) => void
) => {
  setSortBy(newSortBy);
  setShowSortModal(false);
};

export const handlePokemonClick = (
  pokemonId: number,
  navigate: NavigateFunction
) => {
  navigate(`/pokemon/${pokemonId}`);
};
