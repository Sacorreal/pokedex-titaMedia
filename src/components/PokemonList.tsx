import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPokemonsWithArtwork } from "../api/pokemon.services";
import samplePokemon from "../data/samplePokemon";
import "../styles/App.css";
import type { Pokemon } from "../types/types";
import {
  filterPokemon,
  sortPokemon,
  handlePokemonClick as utilHandlePokemonClick,
  handleSearchChange as utilHandleSearchChange,
  handleSortChange as utilHandleSortChange,
} from "../utils/utils";
import FavoriteButtonList from "./FavoriteButtonList";
import LoadMoreButton from "./LoadMoreButton";
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

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await fetchPokemonsWithArtwork(offset, limit);
        if (mounted) setPokemonData(items);
      } catch (err: any) {
        console.error("Error loading pokemons:", err);
        if (mounted) setError(String(err?.message || err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const loadMore = async () => {
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
      <header className="header">
        <h1>Pokédex</h1>
        <div className="header-icons">
          <div className="search-icon">🔍</div>
          <button
            className="favorites-icon"
            onClick={() => navigate("/favorites")}
            title="Ver favoritos"
          >
            ❤️
          </button>
          <div className="sort-icon" onClick={() => setShowSortModal(true)}>
            ☰
          </div>
        </div>
      </header>

      <div className="search-container">
        <div
          className={`search-bar ${
            searchErrors.length > 0 ? "field-error" : ""
          }`}
        >
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-button">
              ✕
            </button>
          )}
        </div>
        {searchErrors.length > 0 && (
          <div className="field-error-message">{searchErrors[0]}</div>
        )}
      </div>

      <ValidationError errors={searchErrors} show={searchErrors.length > 0} />

      <div className="content">
        <div className="pokemon-grid">
          {sortedPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card"
              onClick={() => handlePokemonClick(pokemon.id)}
            >
              <div className="pokemon-card-header">
                <div className="pokemon-number">
                  #{pokemon.id.toString().padStart(3, "0")}
                </div>
                <FavoriteButtonList pokemon={pokemon} size="small" />
              </div>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <div className="pokemon-name">{pokemon.name}</div>
            </div>
          ))}
        </div>
      </div>

      <LoadMoreButton onClick={loadMore} disabled={loading} />

      {showSortModal && (
        <div className="modal-overlay" onClick={() => setShowSortModal(false)}>
          <div className="sort-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sort-title">Sort by:</div>
            <div className="sort-options">
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="number"
                  checked={sortBy === "number"}
                  onChange={() => handleSortChange("number")}
                />
                <span>Number</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortBy === "name"}
                  onChange={() => handleSortChange("name")}
                />
                <span>Name</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
