import { useEffect, useState } from "react";
import {
  getPokemonById,
  getPokemons,
  transformPokemonData,
} from "../api/pokemon.services";
import type { Pokemon } from "../types/types";
import { userInputValidations } from "../utils/validations";

export const usePokemonList = (offset: number = 0, limit: number = 30) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemons = async (
    newOffset: number = offset,
    newLimit: number = limit
  ) => {
    // Validar parámetros
    const paginationValidation = userInputValidations.pagination(
      newOffset,
      newLimit
    );
    if (!paginationValidation.isValid) {
      setError(
        `Parámetros inválidos: ${paginationValidation.errors.join(", ")}`
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getPokemons(newOffset, newLimit);

      // Obtener detalles completos de cada Pokémon
      const pokemonDetails = await Promise.all(
        response.results.map(async (pokemon) => {
          try {
            // Extraer ID de la URL
            const pokemonId = parseInt(pokemon.url.split("/").slice(-2, -1)[0]);
            if (!pokemonId || isNaN(pokemonId)) {
              throw new Error(`ID de Pokémon inválido: ${pokemon.url}`);
            }

            const pokemonData = await getPokemonById(pokemonId);
            return transformPokemonData(pokemonData);
          } catch (err) {
            console.error(`Error procesando Pokémon: ${pokemon.name}`, err);
            // Retornar null para Pokémon con errores
            return null;
          }
        })
      );

      // Filtrar Pokémon válidos
      const validPokemons = pokemonDetails.filter(
        (pokemon): pokemon is Pokemon => pokemon !== null
      );

      setPokemons((prev) =>
        newOffset === 0 ? validPokemons : [...prev, ...validPokemons]
      );
      setHasMore(!!response.next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchPokemons(pokemons.length, limit);
    }
  };

  return {
    pokemons,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchPokemons(),
  };
};

export const usePokemon = (id: number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const pokemonData = await getPokemonById(id);
      const transformedData = await transformPokemonData(pokemonData);
      setPokemon(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPokemon();
    }
  }, [id]);

  return { pokemon, loading, error, refetch: fetchPokemon };
};
