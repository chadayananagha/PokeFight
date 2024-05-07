import { useEffect, useState } from 'react';
import { fetchData } from '../utilities/FetchData';
import { typeColors } from '../utilities/TypeColors';
import { fightBattle } from '../utilities/FightLogic';

const UserPokemon = ({ selectOnePoke, selectedPokemon }) => {
	const [pokemonData, setPokemonData] = useState([]);
	const [selectedPokeForFight, setSelectedPokeForFight] = useState(null);

	useEffect(() => {
		const fetchAPI = async () => {
			const data = await fetchData();
			setPokemonData(data);
			const result = data.pokemons.filter(
				(pokemon) => pokemon.name === selectOnePoke
			);
			setSelectedPokeForFight(result[0]);
			selectedPokemon(result[0]);
		};
		fetchAPI();
	}, []);
	return (
		<div className='flex justify-evenly'>
			<div className='flex flex-wrap gap-2 h-[510px] overflow-auto justify-center'>
				{selectedPokeForFight ? (
					<div
						className='card w-[200px] h-[250px] shadow-xl justify-center'
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
						<h2 className='pt-2 text-xl text-center'>
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
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default UserPokemon;
