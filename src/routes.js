import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { UsersPanel } from './pages/UsersPanel';
import { RecoilRoot } from 'recoil';

export default function AppRouter() {
	return (
		<RecoilRoot>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/users" element={<UsersPanel />} />
				</Routes>
			</Router>
		</RecoilRoot>
	);
}
