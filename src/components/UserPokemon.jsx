import { useEffect, useState } from 'react';
import { fetchData } from '../utilities/FetchData';
import { typeColors } from '../utilities/TypeColors';

const UserPokemon = ({
	selectOnePoke,
	selectedPokemon,
	selectFromThumbnailPoke,
	showStats,
}) => {
	const [pokemonData, setPokemonData] = useState([]);
	const [selectedPokeForFight, setSelectedPokeForFight] = useState(null);
	const [displayedStats, setDisplayedStats] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchData();
			setPokemonData(data);
			const result = data.pokemons.filter(
				(pokemon) => pokemon.name === selectOnePoke
			);

			if (selectFromThumbnailPoke) {
				setSelectedPokeForFight(selectFromThumbnailPoke);
				selectedPokemon(selectFromThumbnailPoke);
			} else if (result[0] === undefined) {
				let selectPokeString = localStorage.getItem('teamPokemons');
				let selectPokeParsed = JSON.parse(selectPokeString);

				setSelectedPokeForFight(selectPokeParsed[0]);
				selectedPokemon(selectPokeParsed[0]);
			} else {
				setSelectedPokeForFight(result[0]);
				selectedPokemon(result[0]);
			}
			setDisplayedStats([]);
		};
		fetchAPI();
	}, [selectOnePoke, selectFromThumbnailPoke, selectedPokemon]);

	useEffect(() => {
		if (showStats && selectedPokeForFight.stats) {
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
						[nextStat, selectedPokeForFight.stats[nextStat]],
					]);
				}
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [showStats, selectedPokeForFight, displayedStats]);

	return (
		<div className='flex flex-col w-96 mb-4'>
			<div className='flex justify-center'>
				{selectedPokeForFight && (
					<div
						className='card w-[200px] h-[200px] shadow-xl'
						style={{
							background:
								selectedPokeForFight.type.length === 1
									? typeColors[selectedPokeForFight.type[0]]
									: selectedPokeForFight.type.length === 2
									? `linear-gradient(to right, ${
											typeColors[selectedPokeForFight.type[0]]
									  }, ${typeColors[selectedPokeForFight.type[1]]})`
									: 'transparent',
						}}
					>
						<h2 className='pt-2 text-xl text-center mb-4'>
							{selectedPokeForFight.name}
						</h2>
						<figure>
							<img
								className='w-[100px] aspect-square object-cover'
								src={selectedPokeForFight.image_url}
								alt={selectedPokeForFight.name}
							/>
						</figure>
					</div>
				)}
			</div>
			{selectedPokeForFight && (
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
			)}
		</div>
	);
};

export default UserPokemon;
