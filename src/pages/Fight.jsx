import { useState } from 'react';
import Opponent from '../components/Opponent';
import { fightBattle } from '../utilities/FightLogic';
import UserPokemon from '../components/UserPokemon';
import CaughtPokeThumbnail from '../components/CaughtPokeThumbnail';
import PlayerName from '../components/PlayerName';
import FightResult from '../components/FightResult';

const Fight = ({ selectOnePoke }) => {
	const [userPokemon, setUserPokemon] = useState(null);
	const [opponentPokemon, setOpponentPokemon] = useState(null);
	const [winner, setWinner] = useState('');
	const [selectFromThumbnailPoke, setSelectFromThumbnailPoke] = useState(null);
	const [showStats, setShowStats] = useState(false);
	const [battleStarted, setBattleStarted] = useState(false);

	const startBattle = () => {
		if (userPokemon && opponentPokemon) {
			const result = fightBattle(userPokemon, opponentPokemon);
			setShowStats(true);
			setBattleStarted(true);
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
				setWinner(`Champion's feast, victory's beast!`);
			} else if (count == 3) {
				setWinner(`It's a Draw!!`);
			} else {
				setWinner(`Whoopsie daisy! Looks like victory's on vacation!`);
			}
		}
	};

	const addInMyTeam = () => {
		let teamPokemonsSting = localStorage.getItem('teamPokemons');
		let teamPokemonsParsed = JSON.parse(teamPokemonsSting);
		teamPokemonsParsed.push(opponentPokemon);
		localStorage.setItem('teamPokemons', JSON.stringify(teamPokemonsParsed));
	};

	const handleUserPokemonFromThumbnail = (pokemon) => {
		setBattleStarted(false);
		setShowStats(false);
		setSelectFromThumbnailPoke(pokemon);
		setWinner('');
	};

	return (
		<div>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-full md:w-[90%] lg:w-[80%] xl:w-[70%] bg-warning text-black  rounded-xl p-6 sm:p-12 flex flex-col justify-center items-center my-24 relative'>
					<span className='absolute top-1 my-20 left-1  mix-blend-multiply'>
						<CaughtPokeThumbnail
							handleUserPokemonFromThumbnail={handleUserPokemonFromThumbnail}
						/>
					</span>
					<PlayerName />
					<div className='flex flex-col sm:flex-row sm:justify-evenly'>
						<UserPokemon
							selectOnePoke={selectOnePoke}
							selectedPokemon={setUserPokemon}
							selectFromThumbnailPoke={selectFromThumbnailPoke}
							showStats={showStats}
						/>
						<Opponent
							setOpponentPokemon={setOpponentPokemon}
							showStats={showStats}
						/>
					</div>
					{battleStarted && (
						<FightResult winner={winner} addInMyTeam={addInMyTeam} />
					)}
					<div
						className={`flex justify-center mb-4 sm:mb-8 gap-6 flex-wrap ${
							battleStarted ? 'hidden' : ''
						}`}
					>
						<button
							onClick={startBattle}
							className={`btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg font-mono transition-opacity duration-500 ease-in-out ${
								battleStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
							}`}
						>
							Start Battle
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Fight;
