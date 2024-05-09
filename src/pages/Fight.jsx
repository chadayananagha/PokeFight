
import { useState } from 'react';
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
	const [winner, setWinner] = useState('');
	const startBattle = () => {
		if (userPokemon && opponentPokemon) {
			const result = fightBattle(userPokemon, opponentPokemon);
			console.log(result);
			let count = 0;
			if (result.userPokemonAttack > 0) {
				count++;
			}
			if (result.userPokemonHealth > 0) {
				count++;
			}
			if (result.userPokemonSPAttack > 0) {
				count++;
			}
			if (result.userPokemonSPdefense > 0) {
				count++;
			}
			if (result.userPokemonSpeed > 0) {
				count++;
			}
			if (result.userPokemondefense > 0) {
				count++;
			}
			console.log(count);
			if (count > 3) {
				console.log(`winner is ${userPokemon.name}`);
				setWinner(`You Won!!`);
			} else if (count == 3) {
				console.log('its a draw');
				setWinner(`It's a Draw!!`);
			} else {
				console.log(`winner is ${opponentPokemon.name}`);
				setWinner('You Loose!! ');
			}
		}
	};
	// /flex flex-col justify-center bg-warning w-[1000px] mx-[550px] my-12 rounded-xl
	// return (
	// 	<div className=''>
	// 		<div className=''>
	// 			<div className='flex flex-col items-center justify-center py-6 mt-12'>
	// 				<h1 className='text-5xl font-bold mb-4 font-outline'>
	// 					A wild Pokémon has appeared, {playerName}!
	// 				</h1>
	// 				<p className='text-lg mb-4'>
	// 					After the Fight you can catch the Pokémon with the help of your
	// 					Pokeballs
	// 				</p>
	// 			</div>
	// 			<div className='flex justify-evenly'>
	// 				<UserPokemon
	// 					selectOnePoke={selectOnePoke}
	// 					selectedPokemon={setUserPokemon}
	// 				/>
	// 				<Opponent opponentPokemon={setOpponentPokemon} />
	// 			</div>
	// 			<h1 className='text-center my-28 font-outline text-3xl'>{winner}</h1>
	// 			<div className='buttonContainer flex justify-center mb-28'>
	// 				<button
	// 					onClick={startBattle}
	// 					className='btn-primary btn-xs sm:btn md:btn-md font-mono'
	// 				>
	// 					Start Battle
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='w-[80%] bg-warning rounded-3xl dark:text-black'>
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
				<h1 className='text-center my-28 font-outline text-3xl'>{winner}</h1>
				<div className='buttonContainer flex justify-center mb-28'>
					<button
						onClick={startBattle}
						className='btn-primary btn-xs sm:btn md:btn-md font-mono'
					>
						Start Battle
					</button>
				</div>
			</div>
		</div>
	);
};

export default Fight;
