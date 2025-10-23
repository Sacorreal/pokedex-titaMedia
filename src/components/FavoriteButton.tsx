import React from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import "../styles/FavoriteButton.css";
import type { Pokemon } from "../types/types";

interface FavoriteButtonProps {
  pokemon: Pokemon;
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  pokemon,
  size = "medium",
  showText = false,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  const favorite = isFavorite(pokemon.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevenir que se active el click del padre

    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  };

  return (
    <button
      className={`favorite-button ${size} ${favorite ? "favorited" : ""}`}
      onClick={handleToggleFavorite}
      title={favorite ? "Remover de favoritos" : "Agregar a favoritos"}
      aria-label={favorite ? "Remover de favoritos" : "Agregar a favoritos"}
    >
      <span className="heart-icon">{favorite ? "❤️" : "🤍"}</span>
      {showText && (
        <span className="favorite-text">
          {favorite ? "Favorito" : "Agregar"}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
