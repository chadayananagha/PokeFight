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
		};
		fetchAPI();
	}, []);

	return (
		<div className='flex flex-wrap gap-2 h-[510px] overflow-auto justify-center'>
			{pokemon ? (
				<div
					className='card w-[200px] h-[250px] shadow-xl justify-center'
					style={{
						background:
							pokemon.type && pokemon.type.length === 1
								? typeColors[pokemon.type[0]]
								: pokemon.type && pokemon.type.length === 2
								? `linear-gradient(to right, ${typeColors[pokemon.type[0]]}, ${
										typeColors[pokemon.type[1]]
								  })`
								: 'transparent',
					}}
				>
					<h2 className='pt-2 text-xl text-center'>{pokemon.name}</h2>
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
	);
};

export default Opponent;
