import { Route, HashRouter as Router, Routes } from "react-router-dom";
import FavoritesList from "./components/FavoritesList";
import PokemonDetail from "./components/PokemonDetail";
import PokemonList from "./components/PokemonList";
import "./styles/App.css";

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
