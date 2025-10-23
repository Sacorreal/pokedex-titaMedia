import { useNavigate, useParams } from "react-router-dom";
import { getPokemonPrimaryColor } from "../constants/colors";
import type { Pokemon } from "../types/types";
import "./PokemonDetail.css";

// Datos de ejemplo de Pokémon con información completa
const pokemonData: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    types: ["grass", "poison"],
    height: 0.7,
    weight: 6.9,
    abilities: ["Overgrow", "Chlorophyll"],
    description:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
  },
  {
    id: 4,
    name: "Charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    types: ["fire"],
    height: 0.6,
    weight: 8.5,
    abilities: ["Blaze", "Solar Power"],
    description:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65,
    },
  },
  {
    id: 7,
    name: "Squirtle",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    types: ["water"],
    height: 0.5,
    weight: 9.0,
    abilities: ["Torrent", "Rain Dish"],
    description:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      specialAttack: 50,
      specialDefense: 64,
      speed: 43,
    },
  },
  {
    id: 12,
    name: "Butterfree",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    types: ["bug", "flying"],
    height: 1.1,
    weight: 32.0,
    abilities: ["Compound Eyes", "Tinted Lens"],
    description:
      "In battle, it flaps its wings at great speed to release highly toxic dust into the air.",
    stats: {
      hp: 60,
      attack: 45,
      defense: 50,
      specialAttack: 90,
      specialDefense: 80,
      speed: 70,
    },
  },
  {
    id: 25,
    name: "Pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    types: ["electric"],
    height: 0.4,
    weight: 6.0,
    abilities: ["Static", "Lightning Rod"],
    description:
      "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
  },
  {
    id: 92,
    name: "Gastly",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
    types: ["ghost", "poison"],
    height: 1.3,
    weight: 0.1,
    abilities: ["Levitate"],
    description:
      "Born from gases, anyone would faint if engulfed by its gaseous body, which contains poison.",
    stats: {
      hp: 30,
      attack: 35,
      defense: 30,
      specialAttack: 100,
      specialDefense: 35,
      speed: 80,
    },
  },
  {
    id: 94,
    name: "Gengar",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
    types: ["ghost", "poison"],
    height: 1.5,
    weight: 40.5,
    abilities: ["Cursed Body"],
    description:
      "It is said to emerge from darkness to steal the lives of those who become lost in mountains.",
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110,
    },
  },
  {
    id: 132,
    name: "Ditto",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    types: ["normal"],
    height: 0.3,
    weight: 4.0,
    abilities: ["Limber", "Imposter"],
    description:
      "It can reconstitute its entire cellular structure to change into what it sees, but it returns to normal when it relaxes.",
    stats: {
      hp: 48,
      attack: 48,
      defense: 48,
      specialAttack: 48,
      specialDefense: 48,
      speed: 48,
    },
  },
  {
    id: 151,
    name: "Mew",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
    types: ["psychic"],
    height: 0.4,
    weight: 4.0,
    abilities: ["Synchronize"],
    description:
      "Mew is said to possess the genetic composition of all Pokémon. It is capable of making itself invisible at will.",
    stats: {
      hp: 100,
      attack: 100,
      defense: 100,
      specialAttack: 100,
      specialDefense: 100,
      speed: 100,
    },
  },
  {
    id: 304,
    name: "Aron",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/304.png",
    types: ["steel", "rock"],
    height: 0.4,
    weight: 60.0,
    abilities: ["Sturdy", "Rock Head"],
    description:
      "It usually lives deep in mountains. However, hunger may drive it to eat railroad tracks and cars.",
    stats: {
      hp: 50,
      attack: 70,
      defense: 100,
      specialAttack: 40,
      specialDefense: 40,
      speed: 30,
    },
  },
];

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pokemon = pokemonData.find((p) => p.id === parseInt(id || "0"));

  if (!pokemon) {
    return (
      <div className="pokemon-detail">
        <div className="not-found">
          <h2>Pokémon no encontrado</h2>
          <button onClick={() => navigate("/")} className="back-button">
            Volver a la Pokédex
          </button>
        </div>
      </div>
    );
  }

  const primaryColor = getPokemonPrimaryColor(pokemon.types);
  const pokeballBackground = {
    background: `linear-gradient(135deg, ${primaryColor}22 0%, ${primaryColor}11 100%)`,
  };

  const headerStyle = {
    backgroundColor: primaryColor,
  };

  const imageSectionStyle = {
    backgroundColor: primaryColor,
  };

  return (
    <div className="pokemon-detail">
      {/* Header */}
      <div className="pokemon-header" style={headerStyle}>
        <button onClick={() => navigate("/")} className="back-arrow">
          ←
        </button>
        <div className="pokemon-title">
          <h1>{pokemon.name}</h1>
          <span className="pokemon-id">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
        </div>
        <div className="navigation-arrow">→</div>
      </div>

      {/* Image Section */}
      <div className="pokemon-image-section" style={imageSectionStyle}>
        <div className="pokeball-background" style={pokeballBackground}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon-detail-image"
          />
        </div>
      </div>

      {/* Types */}
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="type-badge"
            style={{ backgroundColor: primaryColor }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2 className="section-title" style={{ color: primaryColor }}>
          About
        </h2>
        <div className="about-stats">
          <div className="stat-item">
            <div className="stat-icon">⚖️</div>
            <div className="stat-content">
              <span className="stat-value">{pokemon.weight} kg</span>
              <span className="stat-label">Weight</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📏</div>
            <div className="stat-content">
              <span className="stat-value">{pokemon.height} m</span>
              <span className="stat-label">Height</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <span className="stat-value">{pokemon.abilities.join(", ")}</span>
              <span className="stat-label">Moves</span>
            </div>
          </div>
        </div>
        <p className="pokemon-description">{pokemon.description}</p>
      </div>

      {/* Base Stats Section */}
      <div className="stats-section">
        <h2 className="section-title" style={{ color: primaryColor }}>
          Base Stats
        </h2>
        <div className="stats-list">
          <div className="stat-row">
            <span className="stat-name">HP</span>
            <span className="stat-value">
              {pokemon.stats.hp.toString().padStart(3, "0")}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(pokemon.stats.hp / 150) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-name">ATK</span>
            <span className="stat-value">
              {pokemon.stats.attack.toString().padStart(3, "0")}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(pokemon.stats.attack / 150) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-name">DEF</span>
            <span className="stat-value">
              {pokemon.stats.defense.toString().padStart(3, "0")}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(pokemon.stats.defense / 150) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-name">SATK</span>
            <span className="stat-value">
              {pokemon.stats.specialAttack.toString().padStart(3, "0")}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(pokemon.stats.specialAttack / 150) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-name">SDEF</span>
            <span className="stat-value">
              {pokemon.stats.specialDefense.toString().padStart(3, "0")}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(pokemon.stats.specialDefense / 150) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-name">SPD</span>
            <span className="stat-value">
              {pokemon.stats.speed.toString().padStart(3, "0")}
            </span>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(pokemon.stats.speed / 150) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
