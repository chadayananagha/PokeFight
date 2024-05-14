import { useEffect, useState } from 'react';
import winnerImages from '../assets/winner.jpg';
import defeat from '../assets/defeat.jpg';
import pokeBall from '../assets/pokeball-icon.png';
import { useNavigate } from 'react-router-dom';

const FightResult = ({ winner, addInMyTeam, opponentPokemon }) => {
	const [showComponent, setShowComponent] = useState(false);
	const [caughtIt, setCaughtIt] = useState('Catch It!!');
	const [buttonColor, setButtonColor] = useState('primary');
	const navigate = useNavigate();
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowComponent(true);
		}, 6000);
		return () => clearTimeout(timer);
	}, []);

	if (!showComponent) return null;

	const handleClick = () => {
		setCaughtIt('Caught It!!');
		addInMyTeam();
		setButtonColor('bg-green-500');
		setTimeout(() => {
			navigate(`/pokemon/pokemondetails/${opponentPokemon._id}`);
		}, 1000);
	};

	return (
		<div>
			{winner === `Champion's feast, victory's beast!` && (
				<div className='flex items-stretch gap-2 justify-evenly flex-wrap '>
					<img className='rounded-full' src={winnerImages} alt='' width={100} />{' '}
					<h1 className='text-center my-4 sm:my-8 md:my-12 font-bold sm:text-2xl md:text-3xl'>
						{winner}
					</h1>
					<button
						onClick={handleClick}
						className='btn self-end mb-8 btn-primary space-x-2 font-mono btn-xs sm:btn-sm md:btn-md lg:btn-lg'
					>
						<span className='whitespace-nowrap'>{caughtIt}</span>
						<img src={pokeBall} alt='' className='w-6 h-6' />
					</button>
				</div>
			)}
			{winner === `Whoopsie daisy! Looks like victory's on vacation!` && (
				<div className='flex-col flex items-stretch self-end mt-4'>
					<img
						className='mix-blend-multiply self-center'
						src={defeat}
						alt=''
						width={100}
					/>
					<h1 className='text-center my-4 sm:my-8 md:my-12 font-bold sm:text-2xl md:text-3xl'>
						{winner}
					</h1>
				</div>
			)}

			{winner === `It's a Draw!!` && (
				<div className='flex-col flex items-stretch self-end gap-2'>
					<h1 className='text-center my-4 sm:my-8 md:my-12 font-bold sm:text-2xl md:text-3xl'>
						{winner}
					</h1>
				</div>
			)}
		</div>
	);
};

export default FightResult;
