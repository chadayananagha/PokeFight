import React, { useState } from "react";
import pokeballIcon from "../assets/pokeball-icon.png";

const CatchPokemon = () => {
  const [pokeballColor, setPokeballColor] = useState("black");

  const handleClick = () => {
    setPokeballColor(pokeballColor === "black" ? "red" : "black");
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className={`h-48 w-48 object-contain ${pokeballColor}`}
            src={pokeballIcon}
            alt="Pokeball Icon"
            onClick={handleClick}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Catch it
          </div>
          <p className="mt-2 text-gray-500">Click to catch the Pokemon!</p>
        </div>
      </div>
    </div>
  );
};

export default CatchPokemon;
