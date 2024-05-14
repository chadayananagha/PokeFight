import React from "react";
import { useState } from "react";

const CatchPokemon = () => {
  const [caughtIt, setCaughtIt] = useState("Catch It!!");
  const handleClick = () => {
    setCaughtIt("Caught It!!");
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg font-mono"
      >
        {caughtIt}
      </button>
    </div>
  );
};

export default CatchPokemon;
