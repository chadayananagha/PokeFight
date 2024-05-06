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

	return (
		<div className='card w-[200px] h-[250px] shadow-xl justify-center px-10'>
			{pokemon ? (
				<div>
					<p className='text-3xl font-outline font-bold'>{pokemon.name}</p>
					<img src={pokemon.image_url} alt='' />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Opponent;
