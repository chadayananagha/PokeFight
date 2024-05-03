import { useState } from 'react';

const Welcome = () => {
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [hoveredPokemon, setHoveredPokemon] = useState(null);

	const handleSelectPokemon = (pokemon) => {
		setSelectedPokemon(pokemon);
		setHoveredPokemon(null);
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
							<img
								src='./bulbasaur.png'
								alt='Bulbasaur'
								className='rounded-xl'
							/>
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
							<img
								src='./charmander.png'
								alt='Charmander'
								className='rounded-xl'
							/>
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
							<img src='./squirtle.png' alt='Squirtle' className='rounded-xl' />
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

			<button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-300 font-mono'>
				Start Adventure
			</button>
		</div>
	);
};

export default Welcome;
