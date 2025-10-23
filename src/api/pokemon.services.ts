import type {
  PokemonApiResponse,
  PokemonListApiResponse,
  PokemonSpeciesResponse,
} from "../types/types";
import { sanitizeInput, userInputValidations } from "../utils/validations";

export const getPokemons = async (
  offset: number = 0,
  limit: number = 30
): Promise<PokemonListApiResponse> => {
  const paginationValidation = userInputValidations.pagination(offset, limit);
  if (!paginationValidation.isValid) {
    throw new Error(
      `Parámetros inválidos: ${paginationValidation.errors.join(", ")}`
    );
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validar estructura de respuesta
    if (!data || typeof data !== "object") {
      throw new Error("Respuesta inválida del servidor");
    }

    return data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    throw error;
  }
};

export const getPokemonById = async (
  id: number
): Promise<PokemonApiResponse> => {
  // Validar ID
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID inválido: debe ser un número entero mayor que 0");
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validar estructura de respuesta
    if (!data || typeof data !== "object" || !data.id) {
      throw new Error("Respuesta inválida del servidor");
    }

    return data;
  } catch (error) {
    console.error("Error fetching pokemon by id:", error);
    throw error;
  }
};

export const getPokemonByName = async (
  name: string
): Promise<PokemonApiResponse> => {
  // Validar y sanitizar nombre
  const sanitizedName = sanitizeInput(name);
  if (!sanitizedName) {
    throw new Error("Nombre inválido: no puede estar vacío");
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${sanitizedName}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validar estructura de respuesta
    if (!data || typeof data !== "object" || !data.id) {
      throw new Error("Respuesta inválida del servidor");
    }

    return data;
  } catch (error) {
    console.error("Error fetching pokemon by name:", error);
    throw error;
  }
};

export const getPokemonSpecies = async (
  speciesUrl: string
): Promise<PokemonSpeciesResponse> => {
  try {
    const response = await fetch(speciesUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching pokemon species:", error);
    throw error;
  }
};

export const transformPokemonData = async (pokemon: PokemonApiResponse) => {
  // Validar datos de entrada
  if (!pokemon || typeof pokemon !== "object") {
    throw new Error("Datos de Pokémon inválidos");
  }

  let description = "";

  if (pokemon.species?.url) {
    try {
      const speciesData = await getPokemonSpecies(pokemon.species.url);
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      description = englishEntry?.flavor_text || "";
    } catch (error) {
      console.error("Error fetching species description:", error);
    }
  }

  // Crear objeto transformado
  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites?.front_default ||
      pokemon.sprites?.other?.["official-artwork"]?.front_default ||
      "",
    types: pokemon.types?.map((t) => t.type.name) || [],
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    abilities: pokemon.abilities?.map((a) => a.ability.name) || [],
    description: description,
    stats: {
      hp: pokemon.stats?.find((s) => s.stat.name === "hp")?.base_stat || 0,
      attack:
        pokemon.stats?.find((s) => s.stat.name === "attack")?.base_stat || 0,
      defense:
        pokemon.stats?.find((s) => s.stat.name === "defense")?.base_stat || 0,
      specialAttack:
        pokemon.stats?.find((s) => s.stat.name === "special-attack")
          ?.base_stat || 0,
      specialDefense:
        pokemon.stats?.find((s) => s.stat.name === "special-defense")
          ?.base_stat || 0,
      speed:
        pokemon.stats?.find((s) => s.stat.name === "speed")?.base_stat || 0,
    },
  };

  return transformedPokemon;
};
