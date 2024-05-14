import data from '../../data/Fight_logic.json';

export const fightBattle = (userPokemon, opponentPokemon) => {
	const multiplier = getMultiplier(userPokemon.type, opponentPokemon.type);
	const userPokemonAttack =
		userPokemon.stats.attack * multiplier - opponentPokemon.stats.attack;
	const userPokemondefense =
		userPokemon.stats.defense * multiplier - opponentPokemon.stats.defense;

	const userPokemonHealth =
		userPokemon.stats.health_points * multiplier -
		opponentPokemon.stats.health_points;
	const userPokemonSPAttack =
		userPokemon.stats.special_attack * multiplier -
		opponentPokemon.stats.special_attack;
	const userPokemonSPdefense =
		userPokemon.stats.special_defense * multiplier -
		opponentPokemon.stats.special_defense;
	const userPokemonSpeed =
		userPokemon.stats.speed * multiplier - opponentPokemon.stats.speed;

	return {
		userPokemonAttack,
		userPokemondefense,
		userPokemonHealth,
		userPokemonSPAttack,
		userPokemonSPdefense,
		userPokemonSpeed,
	};
};

export const getMultiplier = (userPokemonType, opponentPokemonType) => {
	const userFightMultipier = data[userPokemonType[0]];
	const opponentFightMultipier = userFightMultipier[opponentPokemonType[0]];
	return opponentFightMultipier;
};
