import React from "react";
import leaderboard from "../assets/leaderboard.webp";
import pokeballIcon from "../assets/pokeball-icon.png"; // Import the pokeball icon image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faSkullCrossbones,
  faRibbon,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";

const Leaderboard = () => {
  // Dummy data for user statistics (replace with actual data)
  const userStatistics = [
    { wins: 15, losses: 5, pokemonCaught: 20 },
    { wins: 12, losses: 8, pokemonCaught: 18 },
    { wins: 10, losses: 10, pokemonCaught: 15 },
    { wins: 9, losses: 11, pokemonCaught: 13 },
    { wins: 8, losses: 12, pokemonCaught: 12 },
    { wins: 7, losses: 13, pokemonCaught: 10 },
    { wins: 6, losses: 14, pokemonCaught: 9 },
    { wins: 5, losses: 15, pokemonCaught: 8 },
    { wins: 4, losses: 16, pokemonCaught: 7 },
    { wins: 3, losses: 17, pokemonCaught: 5 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-outline font-bold mb-4 flex items-center justify-center">
        Leaderboard
      </h1>
      <div className="bg-warning rounded-md p-8 shadow-lg dark:text-black max-w-xl w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="flex justify-center mb-4">
          <img src={leaderboard} className="h-auto w-20" alt="Leaderboard" />
        </div>
        <div className="grid grid-cols-1 gap-4 font-mono">
          {/* Display rankings from 1 to 10 */}
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className={index === 0 ? "font-bold mr-4" : "mr-4"}>
                  {index + 1}. Player {index + 1}
                </div>
                {index === 0 || index === 1 || index === 2 ? (
                  <FontAwesomeIcon
                    icon={faTrophy}
                    className={`h-6 w-6 ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-400"
                        : "text-orange-400"
                    }`}
                  />
                ) : null}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faMedal}
                  className="text-sm text-black mr-2"
                />{" "}
                {userStatistics[index].wins}
                <FontAwesomeIcon
                  icon={faSkullCrossbones}
                  className="text-sm text-black ml-4 mr-2"
                />{" "}
                {userStatistics[index].losses}
                <img
                  src={pokeballIcon} // Use the pokeball icon image
                  className="h-4 w-4 ml-4 mr-2" // Adjust size and margin as needed
                  alt="Pokeball Icon"
                />
                {userStatistics[index].pokemonCaught}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
