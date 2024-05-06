import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../utilities/FightUtils";
import Opponent from "../components/Opponent";
import { useLocation } from "react-router-dom";

const Fight = ({ selectOnePoke }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokeForFight, setSelectedPokeForFight] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playerName = searchParams.get("playerName");

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchData();
      setPokemonData(data);
      const result = data.pokemons.filter(
        (pokemon) => pokemon.name === selectOnePoke
      );
      setSelectedPokeForFight(result[0]);
    };
    fetchAPI();
  }, []);
  const typeColors = {
    Normal: "#A8A77A",
    Fire: "#EE8130",
    Water: "#6390F0",
    Electric: "#F7D02C",
    Grass: "#7AC74C",
    Ice: "#96D9D6",
    Fighting: "#C22E28",
    Poison: "#A33EA1",
    Ground: "#E2BF65",
    Flying: "#A98FF3",
    Psychic: "#F95587",
    Bug: "#A6B91A",
    Rock: "#B6A136",
    Ghost: "#735797",
    Dragon: "#6F35FC",
    Dark: "#705746",
    Steel: "#B7B7CE",
    Fairy: "#D685AD",
  };

  return (
    <div>
      <div className=" border-2 rounded my-8">
        <div className="flex flex-col items-center justify-center py-6">
          <h1 className="text-5xl font-bold mb-4">
            A wild Pokémon has appeared, {playerName}!
          </h1>
          <p className="text-lg">
            After the Fight you can catch the Pokémon with the help of your
            Pokeballs
          </p>
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-wrap gap-2 h-[510px] overflow-auto justify-center">
            {selectedPokeForFight ? (
              <div
                className="card w-[200px] h-[250px] shadow-xl justify-center"
                style={{
                  background:
                    selectedPokeForFight.type.length === 1
                      ? typeColors[selectedPokeForFight.type[0]]
                      : selectedPokeForFight.type.length === 2
                      ? `linear-gradient(to right, ${
                          typeColors[selectedPokeForFight.type[0]]
                        }, ${typeColors[selectedPokeForFight.type[1]]})`
                      : "transparent",
                }}
              >
                <h2 className="pt-2 text-xl text-center">
                  {selectedPokeForFight.name}
                </h2>
                <figure>
                  <img
                    className="w-[100px] aspect-square object-cover"
                    src={selectedPokeForFight.image_url}
                    alt={selectedPokeForFight.name}
                  />
                </figure>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <Opponent />
        </div>
        <div className="buttonContainer flex justify-center py-10">
          <button className="btn btn-primary btn-xs sm:btn md:btn-md font-mono">
            Start Battle
          </button>
        </div>
      </div>

      <div className=""></div>
    </div>
  );
};

export default Fight;
