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
        (pokemon) => pokemon.name == selectOnePoke
      );
      setSelectedPokeForFight(result[0]);
    };
    fetchAPI();
  }, []);

  return (
    <div className=" border-2 rounded bg-yellow-100 w-9/12 h-80">
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to the Fight, {playerName}!
        </h1>
        <p className="text-lg">
          Prepare yourself for the ultimate PokÃ©mon battle!
        </p>
      </div>
      {pokemonData ? (
        pokemonData.pokemons?.map((pokemon, index) => (
          <Link key={index}>
            <img src={pokemon.image_url} alt="" width={30} height={30} />
          </Link>
        ))
      ) : (
        <div>loading...</div>
      )}
      <div className="flex justify-evenly">
        <div className="ml-10">
          {selectedPokeForFight ? (
            <div>
              <p className="text-3xl font-outline font-bold">
                {selectedPokeForFight.name}
              </p>
              <img
                className="size-40 border-2 rounded border-zinc-50 bg-amber-100"
                src={selectedPokeForFight.image_url}
                alt={selectedPokeForFight.name}
              />
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
        <Opponent />
      </div>
      <button className="btn bg-black-100 btn-xs sm:btn md:btn-md font-mono">
        Start Battle
      </button>
    </div>
  );
};

export default Fight;
