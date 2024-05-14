import { useEffect, useState } from 'react';
import Opponent from '../components/Opponent';
import { fightBattle } from '../utilities/FightLogic';
import UserPokemon from '../components/UserPokemon';
import CaughtPokeThumbnail from '../components/CaughtPokeThumbnail';
import PlayerName from '../components/PlayerName';
import FightResult from '../components/FightResult';
import Bam from '../assets/Bam.webp';
import ohh from '../assets/ohh.jpg';
import zap from '../assets/zap.png';
import boom from '../assets/boom.png';
import pow from '../assets/pow.webp';

const Fight = ({ selectOnePoke }) => {
	const [userPokemon, setUserPokemon] = useState(null);
	const [opponentPokemon, setOpponentPokemon] = useState(null);
	const [winner, setWinner] = useState('');
	const [selectFromThumbnailPoke, setSelectFromThumbnailPoke] = useState(null);
	const [showStats, setShowStats] = useState(false);
	const [battleStarted, setBattleStarted] = useState(false);
	const [animationIndex, setAnimationIndex] = useState(0);
	const [points, setPoints] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const animationImages = [Bam, ohh, zap, boom, pow];

	const playerNameString = localStorage.getItem('PlayerName');
	const PlayerNameParsed = JSON.parse(playerNameString);

	useEffect(() => {
		if (battleStarted && animationIndex < animationImages.length) {
			const animationTimer = setTimeout(() => {
				setAnimationIndex((prevIndex) => prevIndex + 1);
			}, 1000);
			return () => clearTimeout(animationTimer);
		}

		const storedStats = JSON.parse(localStorage.getItem('userStats'));
		if (storedStats) {
			setPoints(storedStats.points);
		}
	}, [
		battleStarted,
		animationIndex,
		animationImages.length,
		userPokemon,
		selectFromThumbnailPoke,
	]);

	const startBattle = () => {
		if (userPokemon && opponentPokemon) {
			const result = fightBattle(userPokemon, opponentPokemon);
			let count = Object.values(result).filter((value) => value > 0).length;
			setShowStats(true);
			setBattleStarted(true);
			// let count = 0;
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
				console.log(`${userPokemon.name} won the fight`);
				const updatedPoints = points + 4;
				setPoints(updatedPoints);
				localStorage.setItem(
					'userStats',
					JSON.stringify({ PlayerNameParsed, points: updatedPoints })
				);
			} else if (count == 3) {
				setWinner(`It's a Draw!!`);
				console.log('Its a draw');
			} else {
				console.log(`you loose!!  ${opponentPokemon.name} won the fight`);
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
		setAnimationIndex(0);
	};

	return (
		<div>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-full md:w-[90%] lg:w-[80%] xl:w-[70%] bg-warning text-black rounded-xl py-36 px-6 flex flex-col justify-center items-center lg:my-32 my-8 md:my-20 relative'>
					<span className='absolute top-1 lg:ml-6 my-80 md:my-[300px] left-1 mix-blend-multiply'>
						<CaughtPokeThumbnail
							handleUserPokemonFromThumbnail={handleUserPokemonFromThumbnail}
						/>
					</span>
					<PlayerName />
					<div className='flex flex-wrap justify-evenly'>
						<UserPokemon
							selectOnePoke={selectOnePoke}
							selectedPokemon={setUserPokemon}
							selectFromThumbnailPoke={selectFromThumbnailPoke}
							showStats={showStats}
							battleStarted={battleStarted}
						/>
						{battleStarted && (
							<div className='my-64 lg:my-16'>
								<img
									src={animationImages[animationIndex]}
									alt=''
									className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mix-blend-multiply self-center'
									width={100}
								/>
							</div>
						)}
						<Opponent
							setOpponentPokemon={setOpponentPokemon}
							showStats={showStats}
							battleStarted={battleStarted}
						/>
					</div>
					{battleStarted && (
						<FightResult
							winner={winner}
							addInMyTeam={addInMyTeam}
							opponentPokemon={opponentPokemon}
						/>
					)}
					<div
						className={`flex justify-center mb-4 sm:mb-8 gap-6 flex-wrap ${
							battleStarted ? 'hidden' : ''
						}`}
					>
						<button
							onClick={startBattle}
							className={`btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg font-mono transition-opacity duration-500 ease-in-out my-4 ${
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
