import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyTeam from "../components/MyTeam";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);

  const [loadingPokemon, setLoadingPokemon] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const { data } = await axios.get(
          "https://poke-fight-backend-ywlk.onrender.com/api/pokemons"
        );
        setPokemons(data.pokemons);
        setLoadingPokemon(false);
      } catch (error) {
        setError("Error fetching Pokemons");
        setLoadingPokemon(false);
      }
    };
    getAllPokemons();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-evenly">
      <MyTeam />
      <div className="mt-28 font-mono rounded-lg bg-warning h-[580px] w-[200px]">
        hello
      </div>
      <div>
        <h1 className="text-center mt-10 text-xl font-bold font-mono">
          Pokedex
        </h1>
        <div className="my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[700px]">
          {loadingPokemon ? (
            <p>Loading...</p>
          ) : pokemons && pokemons.length > 0 ? (
            <div className="flex flex-wrap gap-2 h-[510px] overflow-y-scroll justify-center">
              {pokemons.map((pokemon) => (
                <div
                  className="card w-[200px] h-[250px] bg-base-100 shadow-xl justify-center"
                  key={pokemon._id}
                >
                  <h2 className="pt-2 text-xl text-center">{pokemon.name}</h2>
                  <figure>
                    <img
                      className="w-[100px] aspect-square object-cover"
                      src={pokemon.image_url}
                      alt={pokemon.name}
                    />
                  </figure>
                  <div className="card-body">
                    <div className="card-actions justify-center">
                      <Link
                        to={`/pokemon/pokemondetails/${pokemon._id}`}
                        className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1"
                      >
                        More Details
                        <span>
                          <img
                            src="https://img.icons8.com/?size=16&id=45300&format=png"
                            alt="arrow"
                          />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pokemons found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
