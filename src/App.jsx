import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Fight from "./pages/Fight";
import Welcome from "./pages/Welcome";
import Leaderboard from "./pages/Leaderboard";
import Pokemon from "./pages/Pokemon";
import { useState, useEffect } from "react";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  const [selectOnePoke, setSelectOnePoke] = useState("");
  const [teamPokemons, setTeamPokemons] = useState(() => {
    const storedTeamPokemons = localStorage.getItem("teamPokemons");
    return storedTeamPokemons ? JSON.parse(storedTeamPokemons) : [];
  });

  useEffect(() => {
    localStorage.setItem("teamPokemons", JSON.stringify(teamPokemons));
  }, [teamPokemons]);

  const addPokemonToTeam = (pokemon) => {
    if (teamPokemons.length < 6) {
      if (!teamPokemons.find((p) => p._id === pokemon._id)) {
        setTeamPokemons([...teamPokemons, pokemon]);
      } else {
        alert("You can only have one unique Pokemon in your team.");
      }
    } else {
      alert(
        "You can only have 6 Pokemons in your team and if you want to add new remove any one of the pokemons from the team"
      );
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/welcome"
            element={<Welcome onSelect={setSelectOnePoke} />}
          />
          <Route
            path="/pokemon/pokemondetails/:id"
            element={<PokemonDetails addPokemonToTeam={addPokemonToTeam} />}
          />

          <Route
            path="/fight"
            element={<Fight selectOnePoke={selectOnePoke} />}
          />

          <Route
            path="/pokemon"
            element={
              <Pokemon
                teamPokemons={teamPokemons}
                setTeamPokemons={setTeamPokemons}
              />
            }
          />

          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
