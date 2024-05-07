import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import '../../src/App.css';
import { typeColors } from '../utilities/TypeColors';

const MyTeam = () => {
	const [loadingPokemon, setLoadingPokemon] = useState(false);
	const [error, setError] = useState(null);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		const getAllPokemons = async () => {
			try {
				const { data } = await axios.get(
					'https://poke-fight-backend-ywlk.onrender.com/api/threepokemons'
				);
				setPokemons(data.pokemons);
				setLoadingPokemon(false);
			} catch (error) {
				setError('Error fetching Pokemons');
				setLoadingPokemon(false);
			}
		};
		setLoadingPokemon(true);
		getAllPokemons();
	}, []);

	const handleDeletePokemon = (id) => {
		setPokemons(pokemons.filter((pokemon) => pokemon._id !== id));
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1 className='text-center mt-10 text-xl font-bold font-outline'>
				My Team
			</h1>
			<div className='my-12 mx-2 font-mono rounded-lg bg-warning py-2 px-4 lg:w-[500px]'>
				<h2 className='text-lg font-bold text-center mb-2 text-black'>
					Team Count: {pokemons.length}/6
				</h2>
				{loadingPokemon ? (
					<div class='wrapper'>
						<div class='pokeball'></div>
					</div>
				) : (
					<div className='flex flex-wrap gap-2 h-[415px] overflow-auto justify-center'>
						{pokemons.map((pokemon) => (
							<div
								className='card w-[150px] h-[200px] shadow-xl justify-center'
								key={pokemon._id}
								style={{
									background:
										pokemon.type.length === 1
											? typeColors[pokemon.type[0]]
											: `linear-gradient(to right, ${
													typeColors[pokemon.type[0]]
											  }, ${typeColors[pokemon.type[1]]})`,
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
								<button
									className='btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 mx-2'
									onClick={() => handleDeletePokemon(pokemon._id)}
								>
									Remove
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MyTeam;
