import './App.css';
import NavBar from './components/header/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './routes/home/Home';
import MovieDetails from './components/main_content/details/MoviesDetails';
import Login from './components/login/Login';
import TrendingMovies from './routes/trending/TrendingMovies';
import TrendingTv from './routes/trending/TrendingTv';
import SearchAll from './routes/search/SearchResults';

function App() {
  const user = true

  return (
    <div className='App'>
      <Router>
        <NavBar user={user} />
        <Routes>
          <Route path='login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/' element={<Home />} />
          <Route path='details/:id/:mediatype' element={user ? <MovieDetails /> : <Navigate to='/login' />} />
          <Route path='movies' element={user ? <TrendingMovies /> : <Navigate to='/login' />} />
          <Route path='tv' element={user ? <TrendingTv /> : <Navigate to='/login' />} />
          <Route path='search' element={user ? <SearchAll /> : <Navigate to='/login' />} />
          <Route path='/*' element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
