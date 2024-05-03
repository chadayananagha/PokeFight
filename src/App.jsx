import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Fight from './pages/Fight';
import Welcome from './pages/Welcome';
import Leaderboard from './pages/Leaderboard';
import Pokemon from './pages/Pokemon';
import { useState } from 'react';
function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='/' element={<Welcome />} />
					<Route path='/welcome' element={<Welcome />} />
					<Route path='/fight' element={<Fight />} />
					<Route path='/pokemon' element={<Pokemon />} />
					<Route path='/leaderboard' element={<Leaderboard />} />
				</Route>
			</Routes>
		</>
	);
}
export default App;
