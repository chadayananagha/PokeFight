import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Fight = ({ selectOnePoke }) => {
	const [pokemonData, setPokemonData] = useState([]);
	const [selectedPokeForFight, setSelectedPokeForFight] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://poke-fight-backend-ywlk.onrender.com/api/threepokemons'
				);
				setPokemonData(response.data);
				const result = response.data.pokemons.filter(
					(pokemon) => pokemon.name == selectOnePoke
				);
				console.log(result[0]);
				setSelectedPokeForFight(result[0]);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className=' border-2 rounded bg-yellow-100 w-9/12 h-80'>
			{pokemonData ? (
				pokemonData.pokemons?.map((pokemon, index) => (
					<Link key={index}>
						<img src={pokemon.image_url} alt='' width={30} height={30} />
					</Link>
				))
			) : (
				<div>loading...</div>
			)}

			<div className='ml-10'>
				{selectedPokeForFight ? (
					<div>
						<p className='text-3xl font-outline font-bold'>
							{selectedPokeForFight.name}
						</p>
						<img
							className='size-40 border-2 rounded border-zinc-50 bg-amber-100'
							src={selectedPokeForFight.image_url}
							alt={selectedPokeForFight.name}
						/>
					</div>
				) : (
					<p>loading</p>
				)}
			</div>
		</div>
	);
};

export default Fight;
