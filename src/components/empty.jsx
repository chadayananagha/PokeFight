const AnimatedImage = ({ selectedPokeForFight }) => {
	// Define the keyframes animation
	const slideAnimation = {
		'@keyframes slide': {
			from: {
				transform: 'translateX(-100%)', // Start from the left
			},
			to: {
				transform: 'translateX(0%)', // End at its original position
			},
		},
	};

	return (
		<figure>
			<img
				className='w-[100px] aspect-square object-cover'
				src={selectedPokeForFight.image_url}
				alt={selectedPokeForFight.name}
				style={{
					animationName: 'slide', // Apply the animation
					animationDuration: '2s', // Set the duration of the animation
					animationIterationCount: 'infinite', // Make the animation repeat infinitely
					animationTimingFunction: 'linear', // Set the timing function for the animation
				}}
			/>
			{/* Inject the keyframes animation into a style tag */}
			<style>{slideAnimation['@keyframes slide']}</style>
		</figure>
	);
};
