import { Navigate, Route, BrowserRouter as Router, Routes, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserLayout from './Layout/UserLayout';

function ProtectedRoute({ children }) {
	const { isSignedIn } = useAuth();

	return isSignedIn ? children : <Navigate to="/login" replace />;
}

function AuthLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Register />} />
				</Route>

				<Route path="/" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
