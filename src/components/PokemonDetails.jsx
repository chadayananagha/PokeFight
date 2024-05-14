import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { typeColors } from '../utilities/TypeColors';
import { FaStar } from 'react-icons/fa';

const PokemonDetails = ({ addPokemonToTeam, teamPokemons }) => {
	const [singlePokemon, setSinglePokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getPokemonById = async (id) => {
			try {
				const { data } = await axios.get(
					`https://poke-fight-backend-ywlk.onrender.com/api/pokemons/${id}`
				);
				setSinglePokemon(data);
			} catch (error) {
				console.error('Error fetching Pokemon:', error);
			} finally {
				setLoading(false);
			}
		};

		getPokemonById(id);
	}, [id]);

	const handleAddToTeam = (pokemon) => {
		addPokemonToTeam(pokemon);
		navigate('/pokemon');
	};

	if (loading) {
		return (
			<div className='wrapper'>
				<div className='pokeball'></div>
			</div>
		);
	}

	return (
		<div className='xl:mx-96 lg:mx-28 justify-center my-12 font-mono mx-2 rounded-lg bg-warning py-8 px-4'>
			<div className='mb-2 text-6xl font-bold flex justify-center gap-8'>
				<h2>{singlePokemon.name}</h2>
				{/* Check if the pokemon's ID exists in the array of team Pokemon IDs, if yes, render the star icon */}
				{teamPokemons.some((p) => p._id === singlePokemon._id) && (
					<FaStar className='text-yellow-500' />
				)}
			</div>
			<div className='flex gap-3 md:gap-8 flex-wrap justify-center md:justify-center lg:px-32 py-12'>
				<div className='flex flex-col gap-4'>
					<div>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Health Points: {singlePokemon.stats?.health_points}
						</p>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Attack: {singlePokemon.stats?.attack}
						</p>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Defense: {singlePokemon.stats?.defense}
						</p>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Special Attack: {singlePokemon.stats?.special_attack}
						</p>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Special Defense: {singlePokemon.stats?.special_defense}
						</p>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Speed: {singlePokemon.stats?.speed}
						</p>
						<p className='flex text-xl mb-4 btn btn-accent font-mono'>
							Type: {singlePokemon.type}
						</p>
					</div>

					<div>
						<button
							className='btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 text-xl font-mono'
							onClick={() => handleAddToTeam(singlePokemon)}
						>
							Add to Team
						</button>
					</div>
					<div>
						<Link
							to='/pokemon'
							className='btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 text-xl font-mono'
						>
							Go Back
						</Link>
					</div>
				</div>
				<div
					className='card w-[350px] h-[300px] shadow-xl'
					key={singlePokemon.id}
					style={{
						background:
							singlePokemon.type.length === 1
								? typeColors[singlePokemon.type[0]]
								: `linear-gradient(to right, ${
										typeColors[singlePokemon.type[0]]
								  }, ${typeColors[singlePokemon.type[1]]})`,
					}}
				>
					<figure>
						<img
							className='aspect-square object-cover'
							src={singlePokemon.image_url}
							alt={singlePokemon.name}
						/>
					</figure>
				</div>
			</div>
		</div>
	);
};

export default PokemonDetails;
