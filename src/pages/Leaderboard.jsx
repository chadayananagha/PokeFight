import React, { useState, useEffect } from 'react';
import leaderboard from '../assets/leaderboard.webp';
import pokeballIcon from '../assets/pokeball-icon.png';
import winIcon from '../assets/win.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrophy,
	faSkullCrossbones,
	faRibbon,
	faMedal,
} from '@fortawesome/free-solid-svg-icons';
import PlayerName from '../components/PlayerName';

const Leaderboard = () => {
	const [userStatistics, setUserStatistics] = useState([]);

	useEffect(() => {
		// Fetch user statistics from local storage on component mount
		const storedStats = JSON.parse(localStorage.getItem('userStats'));
		if (storedStats) {
			setUserStatistics([storedStats]); // Update user statistics correctly
		}
	}, []);

	const playerNameString = localStorage.getItem('PlayerName');
	const PlayerNameParsed = JSON.parse(playerNameString);

	// if (!PlayerNameParsed) {
	// 	localStorage.clear('userStats');
	// }

	return (
		<div className='min-h-screen flex flex-col items-center justify-center py-8'>
			<h1 className='text-3xl font-outline font-bold mb-4 flex items-center justify-center'>
				Leaderboard
			</h1>
			<div className='bg-warning rounded-md p-8 shadow-lg dark:text-black max-w-xl w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl'>
				<div className='flex justify-center mb-4'>
					<img src={leaderboard} className='h-auto w-20' alt='Leaderboard' />
				</div>
				<div className='grid grid-cols-1 gap-4 font-mono'>
					{/* Display rankings from 1 to 10 */}
					{userStatistics.map((userStat, index) => (
						<div
							key={index}
							className='bg-white p-4 rounded-md shadow-md flex items-center justify-between'
						>
							<div className='flex items-center'>
								<div className={index === 0 ? 'font-bold mr-4' : 'mr-4'}>
									{index + 1}. {PlayerNameParsed}
								</div>
								{index === 0 || index === 1 || index === 2 ? (
									<FontAwesomeIcon
										icon={faTrophy}
										className={`h-6 w-6 ${
											index === 0
												? 'text-yellow-500'
												: index === 1
												? 'text-gray-400'
												: 'text-orange-400'
										}`}
									/>
								) : null}
							</div>
							<div className='flex items-center'>
								{userStat.points} Points {userStat.wins}
								<img
									src={winIcon}
									className='h-5 w-5 ml-4 mr-2'
									alt='Win Icon'
								/>
								{Math.floor(userStat.points / 4)} {/* Display number of wins */}
								{userStat.wins} {/* Number of wins */}
								<img
									src={pokeballIcon}
									className='h-5 w-5 ml-4 mr-2'
									alt='Pokeball Icon'
								/>
								{Math.floor(userStat.points / 4)}{' '}
								{/* Number of uniquely caught Pokemon */}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
