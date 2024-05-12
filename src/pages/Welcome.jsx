import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = ({ onSelect }) => {
	const [pokemonData, setPokemonData] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [hoveredPokemon, setHoveredPokemon] = useState(null);
	const [playerName, setPlayerName] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://poke-fight-backend-ywlk.onrender.com/api/threepokemons'
				);
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await response.json();
				setPokemonData(data.pokemons);

				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setError(error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleSelectPokemon = (pokemon) => {
		setSelectedPokemon(pokemon);
		setHoveredPokemon(null);
		onSelect(pokemon);

		const result = pokemonData.filter((poke) => poke.name == pokemon);

		const selectedPoke = localStorage.setItem(
			'pokemon',
			JSON.stringify(result[0])
		);
	};

	const routeChange = () => {
		if (!playerName) {
			alert('Please enter your name before starting the adventure!');
		} else if (!selectedPokemon) {
			alert('Please choose a Pokémon before starting the adventure!');
		} else {
			navigate(`/fight?playerName=${encodeURIComponent(playerName)}`);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!Array.isArray(pokemonData)) {
		console.error('Invalid pokemonData:', pokemonData);
		return <div>Error: Invalid data format</div>;
	}

	const typeColors = {
		Grass: 'bg-green-400',
		Fire: 'bg-red-200',
		Water: 'bg-blue-200',
	};

	const getBackgroundColor = (type) => {
		switch (type) {
			case 'Fire':
				return 'bg-red-200';
			case 'Grass':
				return 'bg-green-200';
			case 'Water':
				return 'bg-blue-200';
			default:
				return 'bg-white';
		}
	};

	return (
		<div className='flex flex-col items-center justify-center py-6 my-10'>
			<div className='flex flex-col items-center justify-center w-full max-w-md'>
				<h1 className='text-5xl text-center mb-1 font-outline font-bold py-2'>
					Welcome to PokéFight!
				</h1>
				<h2 className='mb-5 text-center font-mono py-5'>
					Embark on an exciting adventure where you can challenge wild Pokémon
					and catch them.
				</h2>
				<h2 className='mb-5 text-center font-mono'>
					Now it's time to select one of these three Pokémon to begin your
					adventure.
				</h2>
			</div>

			<div className='flex justify-center items-center py-5 flex-wrap'>
				<div className='flex justify-around flex-wrap gap-4'>
					{pokemonData.map((pokemon) => (
						<div
							key={pokemon._id}
							className={`card w-56 shadow-xl cursor-pointer ${
								(selectedPokemon === pokemon.name &&
									getBackgroundColor(pokemon.type[0])) ||
								(hoveredPokemon === pokemon.name && 'bg-gray-200') ||
								'bg-white'
							}`}
							onClick={() => handleSelectPokemon(pokemon.name)}
							onMouseEnter={() => setHoveredPokemon(pokemon.name)}
							onMouseLeave={() => setHoveredPokemon(null)}
						>
							<figure className='px-8 pt-8 transition-transform duration-300'>
								<img
									src={pokemon.image_url}
									alt={pokemon.name}
									className='rounded-xl'
								/>
							</figure>
							<div className='card-body items-center text-center font-mono'>
								<h2 className='card-title'>{pokemon.name}</h2>
								<p>{pokemon.type.join(', ')}</p>
								<div className='card-actions'></div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='flex items-center justify-center'>
				<input
					type='text'
					placeholder='Enter your name'
					className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-grey-200 font-mono py-2 px-4 rounded-md mb-3'
					onChange={(e) => setPlayerName(e.target.value)}
				/>
			</div>

			<button
				onClick={routeChange}
				disabled={!selectedPokemon}
				className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary ${
					selectedPokemon ? 'btn-primary' : 'bg-gray-300'
				} font-mono`}
			>
				Start Adventure
			</button>
		</div>
	);
};

export default Welcome;
