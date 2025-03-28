import { useNavigate, Route, BrowserRouter as Router, Routes, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserLayout from './Layout/UserLayout';
import NotFoundPage from './Pages/NotFound';
import { useEffect } from 'react';
import History from './Pages/History';
import RecipeDisplay from './Pages/RecipeDisplay';
import './index.css'

const ProtectedRoute = ({ children }) => {
	const { isSignedIn } = useAuth();
	const navigate = useNavigate();
  
	useEffect(() => {
	  if (!isSignedIn) {
		navigate("/login", { replace: true });
	  }
	}, [isSignedIn, navigate]);
  
	return isSignedIn ? children : null;
  };
  
  const AuthLayout = () => {
	const { isSignedIn } = useAuth();
	const navigate = useNavigate();
  
	useEffect(() => {
	  if (isSignedIn) {
		navigate("/", { replace: true });
	  }
	}, [isSignedIn, navigate]);
  
	return isSignedIn ? null : <Outlet />;
  };

const App = () => {
	return (
		<Router>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Register />} />
				</Route>

				<Route path="/" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
					<Route index element={<Home />} />
					<Route path='history' element={<History />} />
					<Route path='/recipe/:recipeId' element={ <RecipeDisplay /> } />
				</Route>
				<Route path='*' element={ <NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
