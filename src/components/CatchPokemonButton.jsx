import React from "react";
import { useState, useEffect } from "react";
import pokeBall from "../assets/pokeball-icon.png";
import { useNavigate } from "react-router-dom";

const CatchPokemonButton = ({ addInMyTeam, opponentPokemon }) => {
  const [caughtIt, setCaughtIt] = useState("Catch It!!");
  const [showComponent, setShowComponent] = useState(false);
  const [buttonColor, setButtonColor] = useState("primary");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  if (!showComponent) return null;

  const handleClick = () => {
    setCaughtIt("Caught It!!");
    addInMyTeam();
    setButtonColor("bg-green-500");
    setTimeout(() => {
      navigate(`/pokemon/pokemondetails/${opponentPokemon._id}`);
    }, 3000);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="btn ${buttonColor} flex items-center space-x-2 font-mono btn-xs sm:btn-sm md:btn-md lg:btn-lg"
      >
        <span className="whitespace-nowrap">{caughtIt}</span>
        <img src={pokeBall} alt="" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CatchPokemonButton;
