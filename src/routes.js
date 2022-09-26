import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { UsersPanel } from './pages/Users/UsersPanel';
import { EditUser } from './pages/Users/EditUser';
import { RecoilRoot } from 'recoil';

export default function AppRouter() {
	return (
		<RecoilRoot>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/users" element={<UsersPanel />} />
					<Route path="/users/details/:id" element={<EditUser />} />
				</Routes>
			</Router>
		</RecoilRoot>
	);
}
