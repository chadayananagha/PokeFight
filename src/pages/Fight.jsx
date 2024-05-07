import { useState } from 'react';
import { fetchData } from '../utilities/FetchData';
import Opponent from '../components/Opponent';
import { useLocation } from 'react-router-dom';
import { fightBattle } from '../utilities/FightLogic';
import UserPokemon from '../components/UserPokemon';

const Fight = ({ selectOnePoke }) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const playerName = searchParams.get('playerName');
	const [userPokemon, setUserPokemon] = useState(null);
	const [opponentPokemon, setOpponentPokemon] = useState(null);

	const startBattle = () => {
		if (userPokemon && opponentPokemon) {
			const result = fightBattle(userPokemon, opponentPokemon);
		}
	};

	return (
		<>
			<div className=' border-2 rounded'>
				<div className='flex flex-col items-center justify-center py-6 mt-12'>
					<h1 className='text-5xl font-bold mb-4 font-outline'>
						A wild Pokémon has appeared, {playerName}!
					</h1>
					<p className='text-lg mb-4'>
						After the Fight you can catch the Pokémon with the help of your
						Pokeballs
					</p>
				</div>
				<div className='flex justify-evenly'>
					<UserPokemon
						selectOnePoke={selectOnePoke}
						selectedPokemon={setUserPokemon}
					/>
					<Opponent opponentPokemon={setOpponentPokemon} />
				</div>
				<div className='buttonContainer flex justify-center mb-28'>
					<button
						onClick={startBattle}
						className='btn-primary btn-xs sm:btn md:btn-md font-mono'
					>
						Start Battle
					</button>
				</div>
			</div>
		</>
	);
};

export default Fight;
