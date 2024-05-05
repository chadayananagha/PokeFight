import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const MyTeam = () => {
  const [loadingTeamPokemon, setLoadingTeamPokemon] = useState(false);
  const [error, setError] = useState(null);
  const [teamPokemons, setTeamPokemons] = useState([]);

  useEffect(() => {
    const getTeamPokemons = async () => {
      try {
        const response = await axios.get(
          "https://poke-fight-backend-ywlk.onrender.com/api/threepokemons"
        );
        setTeamPokemons(response.teamPokemons);
        setLoadingTeamPokemon(true);
      } catch (error) {
        setError("Error fetching Team Pokemons");
      } finally {
        setLoadingTeamPokemon(false);
      }
    };
    getTeamPokemons();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-center mt-10 text-xl font-bold font-mono">
          My Team
        </h1>
        <div className="my-12 font-mono rounded-lg bg-warning py-8 px-4 lg:w-[700px]">
          {loadingTeamPokemon ? (
            <TailSpin color="red" radius={"8px"} />
          ) : teamPokemons && teamPokemons.length > 0 ? (
            <div className="flex flex-wrap gap-2 h-[510px] justify-center overflow-auto">
              {teamPokemons.map((teampokemon) => (
                <div
                  className="card w-[200px] h-[250px] bg-base-100 shadow-xl justify-center"
                  key={teampokemon._id}
                >
                  <h2 className="pt-2 text-xl text-center">
                    {teampokemon.name}
                  </h2>
                  <figure>
                    <img
                      className="w-[100px] aspect-square object-cover"
                      src={teampokemon.image_url}
                      alt={teampokemon.name}
                    />
                  </figure>
                </div>
              ))}
            </div>
          ) : (
            <p>No team pokemons found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
