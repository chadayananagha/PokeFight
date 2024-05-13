// import React from "react";
// import { typeColors } from "../utilities/TypeColors";

// const MyTeam = ({ teamPokemons, setTeamPokemons }) => {
//   const handleDeletePokemon = (id) => {
//     const updatedTeam = teamPokemons.filter((pokemon) => pokemon._id !== id);
//     setTeamPokemons(updatedTeam);
//   };

//   return (
//     <div>
//       <h1 className="text-center mt-10 text-xl font-bold font-outline">
//         My Team
//       </h1>
//       <div className="my-12 mx-2 font-mono rounded-lg bg-warning py-2 px-4 lg:w-[530px]">
//         <h2 className="text-lg font-bold text-center mb-2 text-black">
//           Team Count: {teamPokemons.length}/6
//         </h2>
//         <div className="flex flex-wrap gap-2 h-[415px] overflow-auto justify-center">
//           {teamPokemons.map((pokemon) => (
//             <div
//               className="card w-[150px] h-[200px] shadow-xl justify-center"
//               key={pokemon._id}
//               style={{
//                 background:
//                   pokemon.type && pokemon.type.length === 1
//                     ? typeColors[pokemon.type[0]]
//                     : pokemon.type &&
//                       `linear-gradient(to right, ${
//                         typeColors[pokemon.type[0]]
//                       }, ${typeColors[pokemon.type[1]]})`,
//               }}
//             >
//               <h2 className="pt-2 text-xl text-center">{pokemon.name}</h2>
//               <figure>
//                 <img
//                   className="w-[100px] aspect-square object-cover"
//                   src={pokemon.image_url}
//                   alt={pokemon.name}
//                 />
//               </figure>
//               <button
//                 className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 mx-2"
//                 onClick={() => handleDeletePokemon(pokemon._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyTeam;

import React from "react";
import { typeColors } from "../utilities/TypeColors";

const MyTeam = ({ teamPokemons, setTeamPokemons }) => {
  const handleDeletePokemon = (id) => {
    const updatedTeam = teamPokemons.filter((pokemon) => pokemon._id !== id);
    setTeamPokemons(updatedTeam);
  };

  return (
    <div>
      <h1 className="text-center mt-10 text-xl font-bold font-outline">
        My Team
      </h1>
      <div className="my-12 mx-2 font-mono rounded-lg bg-warning py-2 px-4 lg:w-[530px]">
        <h2 className="text-lg font-bold text-center mb-2 text-black">
          Team Count: {teamPokemons.length}/6
        </h2>
        <div className="flex flex-wrap gap-2 h-[415px] overflow-auto justify-center">
          {teamPokemons.map((pokemon) => (
            <div
              className="card w-[150px] h-[200px] shadow-xl justify-center"
              key={pokemon._id}
              style={{
                background:
                  pokemon.type && pokemon.type.length === 1
                    ? typeColors[pokemon.type[0]]
                    : pokemon.type &&
                      `linear-gradient(to right, ${
                        typeColors[pokemon.type[0]]
                      }, ${typeColors[pokemon.type[1]]})`,
              }}
            >
              <h2 className="pt-2 text-xl text-center">{pokemon.name}</h2>
              <figure>
                <img
                  className="w-[100px] aspect-square object-cover"
                  src={pokemon.image_url}
                  alt={pokemon.name}
                />
              </figure>
              <button
                className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 mx-2"
                onClick={() => handleDeletePokemon(pokemon._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
