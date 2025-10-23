import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { load as serviceLoad } from "../api/pokemon.services";
import samplePokemon from "../data/samplePokemon";
import "../styles/App.css";
import type { Pokemon } from "../types/types";
import {
  filterPokemon,
  sortPokemon,
  handlePokemonClick as utilHandlePokemonClick,
  handleSearchChange as utilHandleSearchChange,
  handleSortChange as utilHandleSortChange,
  loadMore as utilLoadMore,
} from "../utils/utils";
import LoadMoreButton from "./LoadMoreButton";
import PokemonGrid from "./PokemonGrid";
import PokemonListHeader from "./PokemonListHeader";
import SearchBar from "./SearchBar";
import SortModal from "./SortModal";
import ValidationError from "./ValidationError";

type PokemonListItem = Pick<Pokemon, "id" | "name" | "image">;

const PokemonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"number" | "name">("number");
  const [showSortModal, setShowSortModal] = useState(false);
  const [searchErrors, setSearchErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [pokemonData, setPokemonData] =
    useState<PokemonListItem[]>(samplePokemon);
  const [offset, setOffset] = useState(0);
  const limit = 30;

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    serviceLoad({
      offset,
      limit,
      setLoading,
      setError,
      setPokemonData,
      mountedRef,
    });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const loadMore = () =>
    utilLoadMore(
      offset,
      limit,
      setOffset,
      setPokemonData,
      setLoading,
      setError
    );

  const filteredPokemon = filterPokemon(pokemonData, searchTerm);
  const sortedPokemon = sortPokemon(filteredPokemon, sortBy);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    utilHandleSearchChange(e, setSearchTerm, setSearchErrors);

  const clearSearch = () => {
    setSearchTerm("");
    setSearchErrors([]);
  };

  const handleSortChange = (newSortBy: "number" | "name") =>
    utilHandleSortChange(newSortBy, setSortBy, setShowSortModal);

  const handlePokemonClick = (pokemonId: number) =>
    utilHandlePokemonClick(pokemonId, navigate);

  return (
    <div className="app">
      {loading && <div className="loading">Loading Pokémons...</div>}
      {error && <div className="error">Error: {error}</div>}

      <PokemonListHeader
        onFavoritesClick={() => navigate("/favorites")}
        onOpenSort={() => setShowSortModal(true)}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={clearSearch}
        errors={searchErrors}
      />

      <ValidationError errors={searchErrors} show={searchErrors.length > 0} />

      <div className="content">
        <PokemonGrid
          pokemons={sortedPokemon}
          onCardClick={handlePokemonClick}
        />
      </div>

      <LoadMoreButton onClick={loadMore} disabled={loading} />

      <SortModal
        show={showSortModal}
        sortBy={sortBy}
        onClose={() => setShowSortModal(false)}
        onChange={handleSortChange}
      />
    </div>
  );
};

export default PokemonList;
