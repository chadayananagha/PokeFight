import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Fight from './pages/Fight';
import Welcome from './pages/Welcome';
import Leaderboard from './pages/Leaderboard';
import Pokemon from './pages/Pokemon';
import { useState } from 'react';
import PokemonDetails from './components/PokemonDetails';

function App() {
	const [selectOnePoke, setSelectOnePoke] = useState('');
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='/' element={<Welcome />} />
					<Route
						path='/welcome'
						element={<Welcome onSelect={setSelectOnePoke} />}
					/>
					<Route
						path='/pokemon/pokemondetails/:id'
						element={<PokemonDetails />}
					/>

					<Route
						path='/fight'
						element={<Fight selectOnePoke={selectOnePoke} />}
					/>

					<Route
						path='/pokemon'
						element={<Pokemon selectOnePoke={selectOnePoke} />}
					/>
					<Route path='/leaderboard' element={<Leaderboard />} />
				</Route>
			</Routes>
		</>
	);
}
export default App;
