import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyTeam from '../components/MyTeam';
import { TailSpin } from 'react-loader-spinner';
import '../../src/App.css';

const Pokemon = () => {
	const [pokemons, setPokemons] = useState([]);
	const [loadingPokemon, setLoadingPokemon] = useState(false);
	const [error, setError] = useState(null);
	const [filteredPokemons, setFilteredPokemons] = useState([]);

	useEffect(() => {
		const getAllPokemons = async () => {
			try {
				const { data } = await axios.get(
					'https://poke-fight-backend-ywlk.onrender.com/api/pokemons'
				);
				setPokemons(data.pokemons);
				setLoadingPokemon(true);
			} catch (error) {
				setError('Error fetching Pokemons');
			} finally {
				setLoadingPokemon(false);
			}
		};
		getAllPokemons();
	}, []);

	const filterPokemonsByType = (type) => {
		if (type === 'all') {
			setFilteredPokemons(pokemons);
		} else {
			const filtered = pokemons.filter((pokemon) =>
				pokemon.type.includes(type)
			);
			setFilteredPokemons(filtered);
		}
	};

	useEffect(() => {
		setFilteredPokemons(pokemons);
	}, [pokemons]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	const typeColors = {
		Grass: '#78C850',
		Fire: '#F08030',
		Water: '#6890F0',
		bug: '#A8B820',
		Normal: '#A8A878',
		Poison: '#A040A0',
		Electric: '#F8D030',
		Ground: '#E0C068',
		Fairy: '#EE99AC',
		Fighting: '#C03028',
		Psychic: '#F85888',
		Rock: '#B8A038',
		Ghost: '#705898',
		Ice: '#98D8D8',
		Flying: '#A890F0',
	};

	return (
		<div className='flex flex-wrap justify-evenly my-10'>
			<MyTeam />
			<div>
				<h1 className='text-center mt-10 text-xl font-bold font-mono'>
					Filter
				</h1>
				<div className='my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[400px]'>
					<div className='flex flex-wrap justify-center'>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('all')}
						>
							All
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Grass')}
						>
							Grass
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Fire')}
						>
							Fire
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Water')}
						>
							Water
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Poison')}
						>
							Poison
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Flying')}
						>
							Flying
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Ground')}
						>
							Ground
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Water')}
						>
							Bug
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Fighting')}
						>
							Fighting
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Psychic')}
						>
							Psychic
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Fairy')}
						>
							Fairy
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Electric')}
						>
							Electric
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Rock')}
						>
							Rock
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Ghost')}
						>
							Ghost
						</button>
						<button
							className='btn btn-primary mx-1 my-1'
							onClick={() => filterPokemonsByType('Ice')}
						>
							Ice
						</button>
					</div>
				</div>
			</div>
			<div>
				<h1 className='text-center mt-10 text-xl font-bold font-mono'>
					Pokedex
				</h1>
				<div className='my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[700px]'>
					{filteredPokemons && filteredPokemons.length > 0 ? (
						<div className='flex flex-wrap gap-2 h-[510px] overflow-y-scroll justify-center'>
							{filteredPokemons.map((pokemon) => (
								<div
									className='card w-[200px] h-[250px] bg-base-100 shadow-xl justify-center'
									style={{
										backgroundColor: typeColors[pokemon.type] || '#A8A878',
									}}
									key={pokemon._id}
								>
									<h2 className='pt-2 text-xl text-center'>{pokemon.name}</h2>
									<figure>
										<img
											className='w-[100px] aspect-square object-cover'
											src={pokemon.image_url}
											alt={pokemon.name}
										/>
									</figure>
									<div className='card-body'>
										<div className='card-actions justify-center'>
											<Link
												to={`/pokemon/pokemondetails/${pokemon._id}`}
												className='btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1'
											>
												More Details
												<span>
													<img
														src='https://img.icons8.com/?size=16&id=45300&format=png'
														alt='arrow'
													/>
												</span>
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						// <div className="flex justify-center items-center">
						//   <TailSpin color="red" radius={"8px"} />
						// </div>
						<div class='wrapper'>
							<div class='pokeball'></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Pokemon;
