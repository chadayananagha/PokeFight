import { useEffect, useState } from "react";
import { fetchData } from "../utilities/FetchData";
import { typeColors } from "../utilities/TypeColors";

const UserPokemon = ({
  selectOnePoke,
  selectedPokemon,
  selectFromThumbnailPoke,
  showStats,
}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokeForFight, setSelectedPokeForFight] = useState(null);
  const [displayedStat, setDisplayedStat] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchData();
      setPokemonData(data);
      const result = data.pokemons.filter(
        (pokemon) => pokemon.name === selectOnePoke
      );

      if (selectFromThumbnailPoke) {
        setSelectedPokeForFight(selectFromThumbnailPoke);
        selectedPokemon(selectFromThumbnailPoke);
      } else if (result[0] === undefined) {
        let selectPokeString = localStorage.getItem("teamPokemons");
        let selectPokeParsed = JSON.parse(selectPokeString);

        setSelectedPokeForFight(selectPokeParsed[0]);
        selectedPokemon(selectPokeParsed[0]);
      } else {
        setSelectedPokeForFight(result[0]);
        selectedPokemon(result[0]);
      }
      setDisplayedStat(null);
    };
    fetchAPI();
  }, [selectOnePoke, selectFromThumbnailPoke, selectedPokemon]);

  useEffect(() => {
    if (showStats && selectedPokeForFight && selectedPokeForFight.stats) {
      const statsOrder = [
        "attack",
        "defense",
        "health_points",
        "special_attack",
        "special_defense",
        "speed",
      ];

      let currentIndex = 0;

      const intervalId = setInterval(() => {
        if (currentIndex < statsOrder.length) {
          const nextStat = statsOrder[currentIndex];
          setDisplayedStat([nextStat, selectedPokeForFight.stats[nextStat]]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            setDisplayedStat(null);
          }, 4); // Hide the last stat after 1 second
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [showStats, selectedPokeForFight]);

  return (
    <div className="flex flex-col w-96 mb-4">
      <div className="flex justify-center">
        {selectedPokeForFight && (
          <div
            className="card w-[200px] h-[200px] shadow-xl"
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
            <h2 className="pt-2 text-xl text-center mb-4">
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
        )}
      </div>
      {selectedPokeForFight && (
        <div className="flex justify-center">
          <div
            className={`mt-6 italic flex flex-col font-extrabold`}
            style={{ display: showStats ? "block" : "none" }}
          >
            {displayedStat && (
              <div>
                <span>{displayedStat[0]} :</span>
                <span> {displayedStat[1]}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPokemon;
