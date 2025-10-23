import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";
import { fetchPokemonsWithArtwork } from "../api/pokemon.services";
import type { SimplePokemon } from "../types/types";
import { userInputValidations } from "./validations";

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

// Helper to load more items and append to existing list
export const loadMore = async (
  offset: number,
  limit: number,
  setOffset: Dispatch<SetStateAction<number>>,
  setPokemonData: Dispatch<SetStateAction<SimplePokemon[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  const nextOffset = offset + limit;
  setLoading(true);
  try {
    const items = await fetchPokemonsWithArtwork(nextOffset, limit);
    setPokemonData((prev) => [...prev, ...items]);
    setOffset(nextOffset);
  } catch (err: any) {
    console.error("Error loading more pokemons:", err);
    setError(String(err?.message || err));
  } finally {
    setLoading(false);
  }
};
