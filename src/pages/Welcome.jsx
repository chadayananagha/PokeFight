import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Fight from './Fight';
import bulbasaur from '../assets/bulbasaur.png';
import charmander from '../assets/charmander.png';
import squirtle from '../assets/squirtle.png';

const Welcome = ({ onSelect }) => {
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [hoveredPokemon, setHoveredPokemon] = useState(null);

	let navigate = useNavigate();
	const routeChange = () => {
		navigate('/fight');
	};

	const handleSelectPokemon = (pokemon) => {
		setSelectedPokemon(pokemon);
		setHoveredPokemon(null);
		onSelect(pokemon);
	};
	const handleSelectPokemon = (pokemon) => {
		setSelectedPokemon(pokemon);
		setHoveredPokemon(null);
		onSelect(pokemon);
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
		<div className='flex flex-col items-center justify-center py-6'>
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
				<div className='flex justify-around flex-wrap'>
					<div
						className={`card w-56 bg-base-100 shadow-xl ${
							selectedPokemon === 'Bulbasaur'
								? 'bg-green-200'
								: hoveredPokemon === 'Bulbasaur'
								? 'bg-gray-200'
								: ''
						}`}
						onClick={() => handleSelectPokemon('Bulbasaur')}
						onMouseEnter={() => setHoveredPokemon('Bulbasaur')}
						onMouseLeave={() => setHoveredPokemon(null)}
					>
						<figure className='px-8 pt-8 transition-transform duration-300'>
							<img src={bulbasaur} alt='Bulbasaur' className='rounded-xl' />
						</figure>
						<div className='card-body items-center text-center font-mono'>
							<h2 className='card-title'>Bulbasaur</h2>
							<p>The grass-type Pokémon!</p>
							<div className='card-actions'></div>
						</div>
					</div>
					<div
						className={`card w-56 bg-base-100 shadow-xl ${
							selectedPokemon === 'Charmander'
								? 'bg-green-200'
								: hoveredPokemon === 'Charmander'
								? 'bg-gray-200'
								: ''
						}`}
						onClick={() => handleSelectPokemon('Charmander')}
						onMouseEnter={() => setHoveredPokemon('Charmander')}
						onMouseLeave={() => setHoveredPokemon(null)}
					>
						<figure className='px-8 pt-8 transition-transform duration-300'>
							<img src={charmander} alt='Charmander' className='rounded-xl' />
						</figure>
						<div className='card-body items-center text-center font-mono'>
							<h2 className='card-title'>Charmander</h2>
							<p>The fire-type Pokémon!</p>
							<div className='card-actions'></div>
						</div>
					</div>
					<div
						className={`card w-56 bg-base-100 shadow-xl ${
							selectedPokemon === 'Squirtle'
								? 'bg-green-200'
								: hoveredPokemon === 'Squirtle'
								? 'bg-gray-200'
								: ''
						}`}
						onClick={() => handleSelectPokemon('Squirtle')}
						onMouseEnter={() => setHoveredPokemon('Squirtle')}
						onMouseLeave={() => setHoveredPokemon(null)}
					>
						<figure className='px-8 pt-8 transition-transform duration-300'>
							<img src={squirtle} alt='Squirtle' className='rounded-xl' />
						</figure>
						<div className='card-body items-center text-center font-mono'>
							<h2 className='card-title'>Squirtle</h2>
							<p>The water-type Pokémon!</p>
							<div className='card-actions'></div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-center'>
				<input
					type='text'
					placeholder='Enter your name'
					className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-grey-200 font-mono py-2 px-4 rounded-md mb-3'
				/>
			</div>

			<button
				onClick={routeChange}
				className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-300 font-mono'
			>
				Start Adventure
			</button>
		</div>
	);
};

export default Welcome;
