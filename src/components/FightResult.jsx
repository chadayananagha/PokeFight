import { useEffect, useState } from 'react';
import winnerImages from '../assets/winner.jpg';
import defeat from '../assets/defeat.jpg';
import pokeBall from '../assets/pokeball-icon.png';

const FightResult = ({ winner, addInMyTeam }) => {
	const [showComponent, setShowComponent] = useState(false);
	const [caughtIt, setCaughtIt] = useState('Catch It!!');
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowComponent(true);
		}, 10000);
		return () => clearTimeout(timer);
	}, []);

	if (!showComponent) return null;

	const handleClick = () => {
		setCaughtIt('Caught It!!');
		addInMyTeam();
	};

	return (
		<div>
			{winner === `Champion's feast, victory's beast!` && (
				<div className='flex self-end gap-2'>
					<img className='rounded-full' src={winnerImages} alt='' width={100} />
				</div>
			)}
			{winner === `Whoopsie daisy! Looks like victory's on vacation!` && (
				<div className='flex self-end gap-2'>
					<img className='mix-blend-multiply' src={defeat} alt='' width={100} />
				</div>
			)}
			<div className='flex justify-between'>
				<h1 className='text-center my-4 sm:my-8 md:my-12 font-bold sm:text-2xl md:text-3xl'>
					{winner}
				</h1>
				{winner === `Champion's feast, victory's beast!` && (
					<button
						onClick={handleClick}
						className='btn btn-primary space-x-2 font-mono btn-xs sm:btn-sm md:btn-md lg:btn-lg gap-2'
					>
						<span className='whitespace-nowrap'>{caughtIt}</span>
						<img src={pokeBall} alt='' className='w-6 h-6' />
					</button>
				)}
			</div>
		</div>
	);
};

export default FightResult;
