import { useEffect, useState } from 'react';
import winnerImages from '../assets/winner.jpg';
import defeat from '../assets/defeat.jpg';

const FightResult = ({ winner }) => {
	const [showComponent, setShowComponent] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowComponent(true);
		}, 10000);
		return () => clearTimeout(timer);
	}, []);

	if (!showComponent) return null;

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
			<h1 className='text-center my-4 sm:my-8 md:my-12 font-bold sm:text-2xl md:text-3xl'>
				{winner}
			</h1>
		</div>
	);
};

export default FightResult;
