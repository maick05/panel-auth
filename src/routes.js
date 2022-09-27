import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { UsersPanel } from './pages/Users/UsersPanel';
import { EditUser } from './pages/Users/EditUser';
import { MenuTop } from './components/MenuTop';
import { RecoilRoot } from 'recoil';
// import { Container } from 'semantic-ui-react';
import { ScopesPanel } from './pages/Scopes/ScopesPanel';
import { ProjectsPanel } from './pages/Projects/ProjectsPanel';

export default function AppRouter() {
	return (
		<RecoilRoot>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
				</Routes>
				<MenuTop />

				<Routes>
					<Route path="/users" element={<UsersPanel />} />
					<Route path="/users/details/:id" element={<EditUser />} />
					<Route path="/scopes" element={<ScopesPanel />} />
					<Route path="/projects" element={<ProjectsPanel />} />
				</Routes>
			</Router>
		</RecoilRoot>
	);
}
