import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pokemon } from "../types/types";

interface FavoritesState {
  favorites: Pokemon[];
  addToFavorites: (pokemon: Pokemon) => void;
  removeFromFavorites: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (pokemon: Pokemon) => {
        set((state) => {
          // Verificar si ya está en favoritos
          const isAlreadyFavorite = state.favorites.some(
            (fav) => fav.id === pokemon.id
          );

          if (isAlreadyFavorite) {
            return state; // No agregar si ya está en favoritos
          }

          return {
            favorites: [...state.favorites, pokemon],
          };
        });
      },

      removeFromFavorites: (pokemonId: number) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (pokemon) => pokemon.id !== pokemonId
          ),
        }));
      },

      isFavorite: (pokemonId: number) => {
        const state = get();
        return state.favorites.some((pokemon) => pokemon.id === pokemonId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      getFavoritesCount: () => {
        const state = get();
        return state.favorites.length;
      },
    }),
    {
      name: "pokemon-favorites", // Nombre de la clave en localStorage
      version: 1, // Versión del store para migraciones futuras
    }
  )
);
