import { fetchRandomPokemon } from "../utilities/FightUtils";
import { useState, useEffect } from "react";
const Opponent = () => {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      const randomPokemon = await fetchRandomPokemon();
      setPokemon(randomPokemon);
    };
    fetchAPI();
  }, []);

  return (
    <div>
      {pokemon ? (
        <div>
          <p className="text-3xl font-outline font-bold">{pokemon.name}</p>
          <img
            className="size-40 border-2 rounded border-zinc-50 bg-amber-100"
            src={pokemon.image_url}
            alt=""
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Opponent;
