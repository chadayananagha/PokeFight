import { fetchRandomPokemon } from '../utilities/FightUtils';
import { useState, useEffect } from 'react';
const Opponent = () => {
	const [pokemon, setPokemon] = useState({});
	useEffect(() => {
		const fetchAPI = async () => {
			const randomPokemon = await fetchRandomPokemon();
			setPokemon(randomPokemon);
		};
		fetchAPI();
	}, []);

	const typeColors = {
		Normal: '#A8A77A',
		Fire: '#EE8130',
		Water: '#6390F0',
		Electric: '#F7D02C',
		Grass: '#7AC74C',
		Ice: '#96D9D6',
		Fighting: '#C22E28',
		Poison: '#A33EA1',
		Ground: '#E2BF65',
		Flying: '#A98FF3',
		Psychic: '#F95587',
		Bug: '#A6B91A',
		Rock: '#B6A136',
		Ghost: '#735797',
		Dragon: '#6F35FC',
		Dark: '#705746',
		Steel: '#B7B7CE',
		Fairy: '#D685AD',
	};

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
