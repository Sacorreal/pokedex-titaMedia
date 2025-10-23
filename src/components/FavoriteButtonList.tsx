import React from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import "../styles/FavoriteButton.css";
import type { SimplePokemon } from "../types/types";

interface FavoriteButtonListProps {
  pokemon: SimplePokemon;
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const FavoriteButtonList: React.FC<FavoriteButtonListProps> = ({
  pokemon,
  size = "medium",
  showText = false,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  const favorite = isFavorite(pokemon.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevenir que se active el click del padre

    // Crear un objeto Pokémon completo para agregar a favoritos
    const fullPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      types: ["normal"], // Tipo por defecto
      height: 1.0,
      weight: 10.0,
      abilities: ["unknown"],
      description: `Un Pokémon favorito: ${pokemon.name}`,
      stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 50,
      },
    };

    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(fullPokemon);
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

export default FavoriteButtonList;
