// import React from 'react';
// import { useState, useEffect } from 'react';
// import pokeBall from '../assets/pokeball-icon.png';

// const CatchPokemonButton = ({ addInMyTeam }) => {
// 	const [caughtIt, setCaughtIt] = useState('Catch It!!');
// 	const [showComponent, setShowComponent] = useState(false);

// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			setShowComponent(true);
// 		}, 9000);

// 		return () => clearTimeout(timer);
// 	}, []);

// 	if (!showComponent) return null;

// 	const handleClick = () => {
// 		setCaughtIt('Caught It!!');
// 		addInMyTeam();
// 	};

// 	return (
// 		<div>
// 			<button
// 				onClick={handleClick}
// 				className='btn btn-primary flex items-center space-x-2 font-mono btn-xs sm:btn-sm md:btn-md lg:btn-lg'
// 			>
// 				<span className='whitespace-nowrap'>{caughtIt}</span>
// 				<img src={pokeBall} alt='' className='w-6 h-6' />
// 			</button>
// 		</div>
// 	);
// };

// export default CatchPokemonButton;
