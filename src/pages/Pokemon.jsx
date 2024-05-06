import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyTeam from "../components/MyTeam";
import { TailSpin } from "react-loader-spinner";
import "../../src/App.css";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [error, setError] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const { data } = await axios.get(
          "https://poke-fight-backend-ywlk.onrender.com/api/pokemons"
        );
        setPokemons(data.pokemons);
        setLoadingPokemon(true);
      } catch (error) {
        setError("Error fetching Pokemons");
      } finally {
        setLoadingPokemon(false);
      }
    };
    getAllPokemons();
  }, []);

  const filterPokemonsByType = (type) => {
    if (type === "all") {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.type.includes(type)
      );
      setFilteredPokemons(filtered);
    }
  };

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  const getPokemonBackgroundColor = (pokemon) => {
    if (pokemon.type.length === 1) {
      return typeColors[pokemon.type[0]] || "#A8A878";
    } else {
      const firstTypeColor = typeColors[pokemon.type[0]] || "#A8A878";
      const secondTypeColor = typeColors[pokemon.type[1]] || "#A8A878";
      return `linear-gradient(to right, ${firstTypeColor}, ${firstTypeColor} 50%, ${secondTypeColor} 50%, ${secondTypeColor})`;
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly my-10">
      <MyTeam />
      <div>
        <h1 className="text-center mt-10 text-xl font-bold font-mono">
          Filter
        </h1>
        <div className="my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[400px]">
          <div className="flex flex-wrap justify-center">
            {/* Filter buttons */}
            <button
              className="btn btn-primary mx-1 my-1"
              onClick={() => filterPokemonsByType("all")}
            >
              All
            </button>
            <button
              className="btn btn-primary mx-1 my-1"
              onClick={() => filterPokemonsByType("Grass")}
            >
              Grass
            </button>
            {/* Add other type buttons similarly */}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center mt-10 text-xl font-bold font-mono">
          Pokedex
        </h1>
        <div className="my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[700px]">
          {filteredPokemons && filteredPokemons.length > 0 ? (
            <div className="flex flex-wrap gap-2 h-[510px] overflow-y-scroll justify-center">
              {filteredPokemons.map((pokemon) => (
                <div
                  className="card w-[200px] h-[250px] bg-base-100 shadow-xl justify-center"
                  style={{
                    background: getPokemonBackgroundColor(pokemon),
                  }}
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
            // Loading spinner or placeholder
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
