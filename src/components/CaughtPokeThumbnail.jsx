import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
import { Link } from 'react-router-dom';
const CaughtPokeThumbnail = ({ setSelectFromThumbnailPoke }) => {
	const [teamPokemon, setTeamPokemon] = useState(null);
	const [selected, setSelected] = useState(0);
	const [selectedImageURL, setSelectedImageURL] = useState();
	useEffect(() => {
		const PokeThumbnail = () => {
			let teamPokemons = localStorage.getItem('teamPokemons');
			teamPokemons = JSON.parse(teamPokemons);
			setTeamPokemon(teamPokemons);
		};
		PokeThumbnail();
	}, []);

	function toggleBorder(index, URL) {
		setSelected(index);
		setSelectedImageURL(URL);
		setSelectFromThumbnailPoke(teamPokemon[index]);
	}

	return (
		<>
			{teamPokemon &&
				teamPokemon.map((pokemon, index) => (
					<Link key={pokemon.name}>
						<img
							onClick={() => toggleBorder(index, pokemon.image_url)}
							className={`border rounded ${
								selected === index ? 'border-2 border-black ' : ''
							}`}
							src={pokemon.image_url}
							alt=''
							width={50}
						/>
					</Link>
				))}
		</>
	);
};

export default CaughtPokeThumbnail;
