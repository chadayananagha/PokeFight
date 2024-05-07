import React from 'react';
import leaderboard from '../assets/leaderboard.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

const Leaderboard = () => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center'>
			<div className='bg-warning rounded-md p-8 shadow-lg dark:text-gray-500'>
				<h1 className='text-3xl font-outline font-bold mb-4 flex items-center justify-center'>
					<img src={leaderboard} className='h-8 w-8 mr-2' alt='Leaderboard' />
					Leaderboard
				</h1>
				<div className='grid grid-cols-1 gap-4 font-mono'>
					{/* Display rankings from 1 to 10 */}
					{Array.from({ length: 10 }, (_, index) => (
						<div
							key={index}
							className='bg-white p-4 rounded-md shadow-md flex items-center justify-between'
						>
							<div className='flex items-center'>
								<div className={index === 0 ? 'font-bold mr-4' : 'mr-4'}>
									{index + 1}. Player {index + 1}
								</div>
								{(index === 0 || index === 1 || index === 2) && (
									<FontAwesomeIcon
										icon={faCrown}
										className={`h-6 w-6 ${
											index === 0
												? 'text-yellow-500'
												: index === 1
												? 'text-gray-400'
												: 'text-orange-400'
										}`}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
