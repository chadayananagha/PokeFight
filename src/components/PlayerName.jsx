import { useLocation } from 'react-router-dom';

const PlayerName = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const playerName = searchParams.get('playerName');
	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-outline'>
				A wild Pokémon has appeared, {playerName}!
			</h1>
			<p className='text-base sm:text-lg md:text-xl mb-4'>
				After the Fight you can catch the Pokémon with the help of your
				Pokeballs
			</p>
		</div>
	);
};

export default PlayerName;
