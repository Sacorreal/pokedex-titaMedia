import React from "react";
import "../styles/PokemonListHeader.css";

type Props = {
  onFavoritesClick: () => void;
  onOpenSort: () => void;
};

const PokemonListHeader: React.FC<Props> = ({
  onFavoritesClick,
  onOpenSort,
}) => {
  return (
    <header className="header">
      <h1>Pokédex</h1>
      <div className="header-icons">
        <div className="search-icon">🔍</div>
        <button
          className="favorites-icon"
          onClick={onFavoritesClick}
          title="Ver favoritos"
        >
          ❤️
        </button>
        <div className="sort-icon" onClick={onOpenSort}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default PokemonListHeader;
