import { fetchRandomPokemon } from '../utilities/FetchData';
import { useState, useEffect } from 'react';
import { typeColors } from '../utilities/TypeColors';
const Opponent = ({ opponentPokemon }) => {
	const [pokemon, setPokemon] = useState({});
	useEffect(() => {
		const fetchAPI = async () => {
			const randomPokemon = await fetchRandomPokemon();
			setPokemon(randomPokemon);
			opponentPokemon(randomPokemon);
			console.log(randomPokemon._id);
		};
		fetchAPI();
	}, []);

	return (
		<div className='flex flex-col w-96'>
			<div>
				<div className='flex justify-center'>
					{pokemon ? (
						<div
							className='card w-[200px] h-[200px] shadow-xl'
							style={{
								background:
									pokemon.type && pokemon.type.length === 1
										? typeColors[pokemon.type[0]]
										: pokemon.type && pokemon.type.length === 2
										? `linear-gradient(to right, ${
												typeColors[pokemon.type[0]]
										  }, ${typeColors[pokemon.type[1]]})`
										: 'transparent',
							}}
						>
							<h2 className='pt-2 text-xl text-center mb-4'>{pokemon.name}</h2>
							<figure>
								<img
									className='w-[100px] aspect-square object-cover'
									src={pokemon.image_url}
									alt={pokemon.name}
								/>
							</figure>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>

				{pokemon.stats && (
					<div className='flex justify-center'>
						<div className='mt-6 italic flex flex-col font-extrabold'>
							<span>Attack: {pokemon.stats.attack}</span>
							<span>Defense: {pokemon.stats.defense}</span>
							<span>HP: {pokemon.stats.health_points}</span>
							<span>SP: {pokemon.stats.special_attack}</span>
							<span>SD: {pokemon.stats.special_defense}</span>
							<span>Speed: {pokemon.stats.speed}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Opponent;
