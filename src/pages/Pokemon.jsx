import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyTeam from '../components/MyTeam';
import '../../src/App.css';
import { typeColors } from '../utilities/TypeColors';
import PokeBall from '/PokeBall.png';

const Pokemon = ({ setTeamPokemons, teamPokemons }) => {
	const [pokemons, setPokemons] = useState([]);
	const [loadingPokemon, setLoadingPokemon] = useState(false);
	const [error, setError] = useState(null);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [filterType, setFilterType] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const getAllPokemons = async () => {
			try {
				setLoadingPokemon(true);
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
		setFilterType(type);
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
	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const showAllPokemons = () => {
		setFilterType('all');
		setFilteredPokemons(pokemons);
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	const getPokemonBackgroundColor = (pokemon) => {
		if (pokemon.type.length === 1) {
			return typeColors[pokemon.type[0]] || '#A8A878';
		} else {
			const firstTypeColor = typeColors[pokemon.type[0]] || '#A8A878';
			const secondTypeColor = typeColors[pokemon.type[1]] || '#A8A878';
			return `linear-gradient(to right, ${firstTypeColor}, ${secondTypeColor})`;
		}
	};
	const filteredPokemonsByName = filteredPokemons.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
	);
	if (loadingPokemon) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<img
					className='animate-spin'
					src={PokeBall}
					alt='pokeball Image'
					width={70}
					height={70}
				/>
			</div>
		);
	}

	return (
		<div>
			<div className='flex justify-center mt-20 mb-4'>
				<input
					type='text'
					value={searchQuery}
					onChange={handleSearchInputChange}
					placeholder='Search Pokemons...'
					className='bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2'
				/>
			</div>
			<div>
				<div className='flex flex-wrap justify-evenly mb-20'>
					<MyTeam
						setTeamPokemons={setTeamPokemons}
						teamPokemons={teamPokemons}
					/>
					<div>
						<h1 className='text-center mt-10 text-xl font-bold font-outline'>
							Filter
						</h1>
						<div className='my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[340px]'>
							<div className='flex flex-wrap justify-center'>
								<button
									className='btn btn-primary mx-1 my-1 w-20'
									onClick={showAllPokemons}
									style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
								>
									All
								</button>
								{Object.keys(typeColors).map((type, index) => (
									<button
										key={index}
										className='btn btn-primary mx-1 my-1 w-20'
										onClick={() => filterPokemonsByType(type)}
										style={{ backgroundColor: typeColors[type] }}
									>
										{type}
									</button>
								))}
							</div>
						</div>
					</div>
					<div>
						<h1 className='text-center mt-10 text-xl font-bold font-outline'>
							Pokedex
						</h1>
						<div className='my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4 lg:w-[530px]'>
							<div className='flex flex-wrap gap-2 h-[415px] overflow-y-scroll justify-center'>
								{filteredPokemonsByName.map((pokemon) => (
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
												className='w-[80px] aspect-square object-cover'
												src={pokemon.image_url}
												alt={pokemon.name}
											/>
										</figure>
										<Link
											to={`/pokemon/pokemondetails/${pokemon._id}`}
											className='btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 mx-2'
										>
											More Details
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pokemon;
