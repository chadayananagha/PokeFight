import React, { useState, useEffect } from 'react';
import { fetchRandomPokemon } from '../utilities/FetchData';
import { typeColors } from '../utilities/TypeColors';

const Opponent = ({ setOpponentPokemon, showStats, battleStarted }) => {
	const [pokemon, setPokemon] = useState({});
	const [displayedStats, setDisplayedStats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAPI = async () => {
			const randomPokemon = await fetchRandomPokemon();
			setPokemon(randomPokemon);
			setOpponentPokemon(randomPokemon);
			setDisplayedStats([]);
			setIsLoading(false);
			//   opponentPokemon(randomPokemon);
		};
		fetchAPI();
	}, [setOpponentPokemon]);

	useEffect(() => {
		if (showStats && pokemon.stats) {
			const statsOrder = [
				'attack',
				'defense',
				'health_points',
				'special_attack',
				'special_defense',
				'speed',
			];

			const timer = setTimeout(() => {
				const nextStat = statsOrder.find(
					(stat) => !displayedStats.map(([name]) => name).includes(stat)
				);
				if (nextStat) {
					setDisplayedStats((prevStats) => [
						...prevStats,
						[nextStat, pokemon.stats[nextStat]],
					]);
				}
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [showStats, pokemon.stats, displayedStats]);

	useEffect(() => {
		setDisplayedStats([]);
	}, [showStats]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center'>
				<img
					className='animate-spin'
					src='../public/PokeBall.png'
					alt='pokeball Image'
					width={70}
					height={70}
				/>
			</div>
		);
	}

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
									className='w-[100px] aspect-square object-cover animate-[wiggle_1s_ease-in-out_infinite]'
									src={pokemon.image_url}
									alt={pokemon.name}
								/>
							</figure>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>

				<div className='flex justify-center'>
					<div
						className={`mt-6 italic flex flex-col font-extrabold`}
						style={{ display: showStats ? 'block' : 'none' }}
					>
						{displayedStats.map(([name, value]) => (
							<div key={name}>
								<span>{name} :</span>
								<span> {value}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Opponent;
