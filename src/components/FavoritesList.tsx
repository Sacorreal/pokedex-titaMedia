import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";
import "../styles/FavoritesList.css";
import FavoriteButton from "./FavoriteButton";

const FavoritesList: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites, getFavoritesCount } = useFavoritesStore();

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleClearFavorites = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar todos los favoritos?"
      )
    ) {
      clearFavorites();
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-heart">🤍</div>
        <h2>No tienes favoritos aún</h2>
        <p>
          Haz clic en el corazón de cualquier Pokémon para agregarlo a tus
          favoritos
        </p>
        <button onClick={() => navigate("/")} className="back-to-list-button">
          Ver todos los Pokémon
        </button>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="favorites-title-section">
          <button
            onClick={() => navigate("/")}
            className="back-button"
            title="Volver a la Pokédex"
          >
            ←
          </button>
          <h1>Mis Pokémon Favoritos</h1>
        </div>
        <div className="favorites-actions">
          <span className="favorites-count">
            {getFavoritesCount()} Pokémon{getFavoritesCount() !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleClearFavorites}
            className="clear-favorites-button"
          >
            Limpiar todo
          </button>
        </div>
      </div>

      <div className="pokemon-grid">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => handlePokemonClick(pokemon.id)}
          >
            <div className="pokemon-card-header">
              <div className="pokemon-number">
                #{pokemon.id.toString().padStart(3, "0")}
              </div>
              <FavoriteButton pokemon={pokemon} size="small" />
            </div>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <div className="pokemon-name">{pokemon.name}</div>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <span key={type} className="type-badge">
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
