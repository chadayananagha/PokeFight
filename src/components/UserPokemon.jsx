import { useEffect, useState } from 'react';
import { fetchData } from '../utilities/FetchData';
import { typeColors } from '../utilities/TypeColors';

const UserPokemon = ({
	selectOnePoke,
	selectedPokemon,
	selectFromThumbnailPoke,
}) => {
	const [pokemonData, setPokemonData] = useState([]);
	const [selectedPokeForFight, setSelectedPokeForFight] = useState(null);
	console.log(selectFromThumbnailPoke);
	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchData();
			setPokemonData(data);
			const result = data.pokemons.filter(
				(pokemon) => pokemon.name === selectOnePoke
			);
			console.log(selectFromThumbnailPoke);
			if (selectFromThumbnailPoke) {
				console.log('i am here 2');
				setSelectedPokeForFight(selectFromThumbnailPoke);
				selectedPokemon(selectFromThumbnailPoke);
				console.log(selectFromThumbnailPoke);
			} else if (result[0] === undefined) {
				console.log('i am here 1');
				let selectPokeString = localStorage.getItem('teamPokemons');
				let selectPokeParsed = JSON.parse(selectPokeString);
				console.log(selectPokeParsed[0]);
				setSelectedPokeForFight(selectPokeParsed[0]);
				selectedPokemon(selectPokeParsed[0]);
			} else {
				setSelectedPokeForFight(result[0]);
				selectedPokemon(result[0]);
				console.log('i am here 3');
			}
		};
		fetchAPI();
	}, [selectFromThumbnailPoke]);

	// function toggleBorder(index, URL) {
	// 	setSelected(index);
	// 	setSelectedImageURL(URL);
	// 	setWinner('');
	// }
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
					<div className='mt-6 italic flex flex-col font-extrabold'>
						<span>Attack: {selectedPokeForFight.stats.attack}</span>
						<span>Defense: {selectedPokeForFight.stats.defense}</span>
						<span>HP: {selectedPokeForFight.stats.health_points}</span>
						<span>SP: {selectedPokeForFight.stats.special_attack}</span>
						<span>SD: {selectedPokeForFight.stats.special_defense}</span>
						<span>Speed: {selectedPokeForFight.stats.speed}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserPokemon;
