import { useState, useEffect } from "react";
import Opponent from "../components/Opponent";
import { useLocation } from "react-router-dom";
import { fightBattle } from "../utilities/FightLogic";
import UserPokemon from "../components/UserPokemon";

const Fight = ({ selectOnePoke }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playerName = searchParams.get("playerName");
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [winner, setWinner] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("userStats"));
    if (storedStats) {
      setPoints(storedStats.points);
    }
  }, []);

  const startBattle = () => {
    if (userPokemon && opponentPokemon) {
      const result = fightBattle(userPokemon, opponentPokemon);

      let count = Object.values(result).filter((value) => value > 0).length;
      if (count > 3) {
        setWinner(`You Won!!`);
        const updatedPoints = points + 4;
        setPoints(updatedPoints);
        localStorage.setItem(
          "userStats",
          JSON.stringify({ playerName, points: updatedPoints })
        );
      } else if (count === 3) {
        setWinner(`It's a Draw!!`);
      } else {
        setWinner("You Lose!!");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] bg-warning text-black  rounded-3xl p-6 sm:p-12 flex flex-col justify-center items-center my-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-outline">
            A wild Pokémon has appeared, {playerName}!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4">
            After the Fight you can catch the Pokémon with the help of your
            Pokeballs
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-evenly">
          <UserPokemon
            selectOnePoke={selectOnePoke}
            selectedPokemon={setUserPokemon}
          />
          <Opponent opponentPokemon={setOpponentPokemon} />
        </div>
        <h1 className="text-center my-4 sm:my-8 md:my-12 font-outline text-xl sm:text-2xl md:text-3xl">
          {winner}
        </h1>
        <div className="buttonContainer flex justify-center mb-4 sm:mb-8 gap-6 flex-wrap">
          <button
            onClick={startBattle}
            className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg font-mono"
          >
            Start Battle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fight;
