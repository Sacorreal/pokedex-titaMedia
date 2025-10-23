import React from "react";
import "../styles/App.css"; // reuse existing search styles

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  errors: string[];
};

const SearchBar: React.FC<Props> = ({ value, onChange, onClear, errors }) => {
  return (
    <div className="search-container">
      <div className={`search-bar ${errors.length > 0 ? "field-error" : ""}`}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="¿Cuál Pokemón quieres buscar?"
          value={value}
          onChange={onChange}
          className="search-input"
        />
        {value && (
          <button onClick={onClear} className="clear-button">
            ✕
          </button>
        )}
      </div>
      {errors.length > 0 && (
        <div className="field-error-message">{errors[0]}</div>
      )}
    </div>
  );
};

export default SearchBar;
