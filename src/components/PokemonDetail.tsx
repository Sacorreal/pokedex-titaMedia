import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonById, transformPokemonData } from "../api/pokemon.services";
import { getPokemonPrimaryColor } from "../constants/colors";
import "../styles/PokemonDetail.css";
import type { Pokemon } from "../types/types";
import FavoriteButton from "./FavoriteButton";

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) return;
      const numericId = Number(id);
      if (!Number.isInteger(numericId) || numericId <= 0) {
        setError("ID inválido");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiData = await getPokemonById(numericId);
        const transformed = await transformPokemonData(apiData);
        if (mounted) setPokemon(transformed as Pokemon);
      } catch (err: any) {
        console.error("Error loading pokemon detail:", err);
        if (mounted) setError(String(err?.message || err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="pokemon-detail">Cargando Pokémon...</div>;
  }

  if (error) {
    return (
      <div className="pokemon-detail">
        <div className="not-found">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")} className="back-button">
            Volver a la Pokédex
          </button>
        </div>
      </div>
    );
  }

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
        <div className="pokemon-actions">
          <FavoriteButton pokemon={pokemon} size="large" showText={false} />
        </div>
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
