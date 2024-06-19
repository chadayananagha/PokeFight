import React, { useState, useEffect } from 'react';
import { fetchRandomPokemon } from '../utilities/FetchData';
import { typeColors } from '../utilities/TypeColors';
import PokeBall from '/PokeBall.png';

const Opponent = ({ setOpponentPokemon, showStats, battleStarted }) => {
	const [pokemon, setPokemon] = useState({});
	const [currentStat, setCurrentStat] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAPI = async () => {
			const randomPokemon = await fetchRandomPokemon();
			setPokemon(randomPokemon);
			setOpponentPokemon(randomPokemon);
			setCurrentStat(null);
			setIsLoading(false);
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

			let currentIndex = 0;

			const intervalId = setInterval(() => {
				if (currentIndex < statsOrder.length) {
					const nextStat = statsOrder[currentIndex];
					setCurrentStat([nextStat, pokemon.stats[nextStat]]);
					currentIndex++;
				} else {
					clearInterval(intervalId);
					setTimeout(() => {
						setCurrentStat(null);
					}, 4); // Hide the last stat after 1 second
				}
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [showStats, pokemon.stats]);

	useEffect(() => {
		setCurrentStat(null);
	}, [showStats]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center'>
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
						{currentStat && (
							<div>
								<span>{currentStat[0]} :</span>
								<span> {currentStat[1]}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Opponent;
