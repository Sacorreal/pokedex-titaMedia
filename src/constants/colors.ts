// Constante de colores por tipo de Pokémon
export const POKEMON_TYPE_COLORS: { [key: string]: string } = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};


export const getPokemonPrimaryColor = (types: string[]): string => {
  if (types.length === 0) return POKEMON_TYPE_COLORS.normal;

  
  return (
    POKEMON_TYPE_COLORS[types[0].toLowerCase()] || POKEMON_TYPE_COLORS.normal
  );
};


export const getPokemonSecondaryColor = (types: string[]): string => {
  if (types.length < 2) return "";

  return POKEMON_TYPE_COLORS[types[1].toLowerCase()] || "";
};
