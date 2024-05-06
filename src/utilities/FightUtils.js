import axios from 'axios';

export const fetchData = async () => {
	try {
		const response = await axios.get(
			'https://poke-fight-backend-ywlk.onrender.com/api/threepokemons'
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const fetchRandomPokemon = async () => {
	try {
		const response = await axios.get(
			'http://localhost:8080/api/pokemons/random'
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
