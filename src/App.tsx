import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import FavoriteButtonList from "./components/FavoriteButtonList";
import FavoritesList from "./components/FavoritesList";
import PokemonDetail from "./components/PokemonDetail";
import ValidationError from "./components/ValidationError";
import { userInputValidations } from "./utils/validations";

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

// Componente para la lista de Pokémon
const PokemonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"number" | "name">("number");
  const [showSortModal, setShowSortModal] = useState(false);
  const [searchErrors, setSearchErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Datos de ejemplo de Pokémon (versión simplificada para la lista)
  const pokemonData: PokemonListItem[] = [
    {
      id: 1,
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 4,
      name: "Charmander",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      id: 7,
      name: "Squirtle",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: 12,
      name: "Butterfree",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    },
    {
      id: 25,
      name: "Pikachu",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    {
      id: 92,
      name: "Gastly",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
    },
    {
      id: 94,
      name: "Gengar",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
    },
    {
      id: 132,
      name: "Ditto",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    },
    {
      id: 151,
      name: "Mew",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
    },
    {
      id: 304,
      name: "Aron",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/304.png",
    },
  ];

  // Filtrar Pokémon basado en el término de búsqueda
  const filteredPokemon = pokemonData.filter((pokemon) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemon.id.toString().includes(searchTerm)
    );
  });

  // Ordenar Pokémon
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortBy === "number") {
      return a.id - b.id;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Validar término de búsqueda
    const validation = userInputValidations.searchTerm(value);
    setSearchErrors(validation.errors);

    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchErrors([]);
  };

  const handleSortChange = (newSortBy: "number" | "name") => {
    setSortBy(newSortBy);
    setShowSortModal(false);
  };

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Pokédex</h1>
        <div className="header-icons">
          <div className="search-icon">🔍</div>
          <button
            className="favorites-icon"
            onClick={() => navigate("/favorites")}
            title="Ver favoritos"
          >
            ❤️
          </button>
          <div className="sort-icon" onClick={() => setShowSortModal(true)}>
            ☰
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-container">
        <div
          className={`search-bar ${
            searchErrors.length > 0 ? "field-error" : ""
          }`}
        >
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-button">
              ✕
            </button>
          )}
        </div>
        {searchErrors.length > 0 && (
          <div className="field-error-message">{searchErrors[0]}</div>
        )}
      </div>

      {/* Validation Errors */}
      <ValidationError errors={searchErrors} show={searchErrors.length > 0} />

      {/* Content Area */}
      <div className="content">
        <div className="pokemon-grid">
          {sortedPokemon.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card"
              onClick={() => handlePokemonClick(pokemon.id)}
            >
              <div className="pokemon-card-header">
                <div className="pokemon-number">
                  #{pokemon.id.toString().padStart(3, "0")}
                </div>
                <FavoriteButtonList pokemon={pokemon} size="small" />
              </div>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <div className="pokemon-name">{pokemon.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Modal */}
      {showSortModal && (
        <div className="modal-overlay" onClick={() => setShowSortModal(false)}>
          <div className="sort-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sort-title">Sort by:</div>
            <div className="sort-options">
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="number"
                  checked={sortBy === "number"}
                  onChange={() => handleSortChange("number")}
                />
                <span>Number</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortBy === "name"}
                  onChange={() => handleSortChange("name")}
                />
                <span>Name</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
    </Router>
  );
}

export default App;
