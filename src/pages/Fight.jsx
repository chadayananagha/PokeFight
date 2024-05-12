import { useState } from 'react';
import Opponent from '../components/Opponent';
import { useLocation } from 'react-router-dom';
import { fightBattle } from '../utilities/FightLogic';
import UserPokemon from '../components/UserPokemon';
import CatchPokemonButton from '../components/CatchPokemonButton';
import CaughtPokeThumbnail from '../components/CaughtPokeThumbnail';
import winnerImages from '../assets/winner.jpg';
import defeat from '../assets/defeat.jpg';

const Fight = ({ selectOnePoke }) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const playerName = searchParams.get('playerName');
	const [userPokemon, setUserPokemon] = useState(null);
	const [opponentPokemon, setOpponentPokemon] = useState(null);
	const [winner, setWinner] = useState('');
	const [selectFromThumbnailPoke, setSelectFromThumbnailPoke] = useState(null);

	const startBattle = () => {
		if (userPokemon && opponentPokemon) {
			const result = fightBattle(userPokemon, opponentPokemon);
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
			if (count > 3) {
				console.log(`winner is ${userPokemon.name}`);
				setWinner(`Champion's feast, victory's beast!`);
			} else if (count == 3) {
				console.log('its a draw');
				setWinner(`It's a Draw!!`);
			} else {
				console.log(`winner is ${opponentPokemon.name}`);
				setWinner(`Whoopsie daisy! Looks like victory's on vacation!`);
			}
			// setWinner(`Champion's feast, victory's beast!`);
		}
	};
	console.log(selectFromThumbnailPoke);
	const addInMyTeam = () => {
		let teamPokemonsSting = localStorage.getItem('teamPokemons');
		console.log(teamPokemonsSting);
		let teamPokemonsParsed = JSON.parse(teamPokemonsSting);
		teamPokemonsParsed.push(opponentPokemon);
		localStorage.setItem('teamPokemons', JSON.stringify(teamPokemonsParsed));
	};

	return (
		<div>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-full md:w-[90%] lg:w-[80%] xl:w-[70%] bg-warning text-black  rounded-xl p-6 sm:p-12 flex flex-col justify-center items-center my-24 relative'>
					<span className='absolute top-1 my-44 left-1  mix-blend-multiply'>
						<CaughtPokeThumbnail
							setSelectFromThumbnailPoke={setSelectFromThumbnailPoke}
						/>
					</span>
					<div className='flex flex-col items-center justify-center'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-outline'>
							A wild Pokémon has appeared, {playerName}!
						</h1>
						<p className='text-base sm:text-lg md:text-xl mb-4'>
							After the Fight you can catch the Pokémon with the help of your
							Pokeballs
						</p>
					</div>
					<div className='flex flex-col sm:flex-row sm:justify-evenly'>
						<UserPokemon
							selectOnePoke={selectOnePoke}
							selectedPokemon={setUserPokemon}
							selectFromThumbnailPoke={selectFromThumbnailPoke}
						/>
						<Opponent opponentPokemon={setOpponentPokemon} />
					</div>
					<div>
						{winner === `Champion's feast, victory's beast!` && (
							<div className='flex self-end gap-2'>
								<img
									className='rounded-full'
									src={winnerImages}
									alt=''
									width={100}
								/>
							</div>
						)}
						{winner === `Whoopsie daisy! Looks like victory's on vacation!` && (
							<div className='flex self-end gap-2'>
								<img
									className='mix-blend-multiply'
									src={defeat}
									alt=''
									width={100}
								/>
							</div>
						)}
						<h1 className='text-center my-4 sm:my-8 md:my-12 font-bold sm:text-2xl md:text-3xl'>
							{winner}
						</h1>
					</div>
					<div className='buttonContainer flex justify-center mb-4 sm:mb-8 gap-6 flex-wrap'>
						<button
							onClick={startBattle}
							className='btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg font-mono'
						>
							Start Battle
						</button>

						{winner === `Champion's feast, victory's beast!` && (
							<div className='flex self-end'>
								<CatchPokemonButton addInMyTeam={addInMyTeam} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Fight;
